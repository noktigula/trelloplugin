/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

var BLACK_TIMER_ICON = 'https://cdn.glitch.com/93f19877-502c-49d7-86ca-fa817403bca7%2Ficons8-timer-black.png?1547464335418';
var WHITE_TIMER_ICON = 'https://cdn.glitch.com/93f19877-502c-49d7-86ca-fa817403bca7%2Ficons8-timer-white.png?1547464335805';

var trello = TrelloPowerUp.iframe();

console.log('client.js started');

TrelloPowerUp.initialize({
  // Start adding handlers for your capabilities here!
	'card-buttons': function(t, options){
    console.log('card-buttons called!');
    var estimate = t.get('card', 'shared', 'estimate')
    var text = estimate ? 'Estimated time: ' + estimate : 'Estimate time';
    return [{
      icon: BLACK_TIMER_ICON,
      text: text,
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
          icon: 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Frocket-ship-grey.png?1496162964717',
          color: estimate ? 'blue' : 'red',
          text: estimate ? estimate : 'No Estimation!' 
        }];
      }
    },  
});
