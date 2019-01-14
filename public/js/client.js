/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

var BLACK_TIMER_ICON = 'https://cdn.glitch.com/93f19877-502c-49d7-86ca-fa817403bca7%2Ficons8-timer-black.png?1547464335418';
var WHITE_TIMER_ICON = 'https://cdn.glitch.com/93f19877-502c-49d7-86ca-fa817403bca7%2Ficons8-timer-white.png?1547464335805';

var trello = TrelloPowerUp.iframe();

console.log('client.js started');

TrelloPowerUp.initialize({
  // Start adding handlers for your capabilities here!
	'card-buttons': function(t, options){
    t.get('card', 'shared', 'estimate')
    .then(function(estimate) {
      console.log('estimation found' + estimate);
      if (!estimate) {
        return;
      }
      
      console.log('searching for button');
      var aTags = document.getElementsByTagName('a');
      for (var i = 0; i < aTags.length; i++) {
        console.log('Checking element ' + aTags[i]);
        if (aTags[i].title && aTags[i].title === 'Estimate time') {
          aTags[i].title = 'Estimated' + estimate;
          break;
        }
      }
    });
    return [{
        icon: BLACK_TIMER_ICON,
        text: 'Estimate time',
        callback: function(t){
          return t.popup({
            title: "Estimation",
            url: '../estimate.html'
          });
        }
      }];
	},
  'card-badges': function(t, options) {
      return t.get('card', 'shared', 'estimate')
      .then(function(estimate) {
        return [{
          icon: 'https://cdn.glitch.com/93f19877-502c-49d7-86ca-fa817403bca7%2Fstorypoints-icon.png?1547471374757',
          color: estimate ? 'blue' : 'red',
          text: estimate ? estimate : 'No Estimation!' 
        }];
      })
  },
  'card-detail-badges': function(t, options) {
    return [{
      title: 'Estimate',
      color: 'red',
      text: 'Large',
      callback: function(t) {
        return t.popup({
          title: "Estimation",
          url: '../estimate.html'
        });
      }      
    }]
  }  
});
