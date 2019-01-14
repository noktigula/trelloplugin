/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

var BLACK_TIMER_ICON = 'https://cdn.glitch.com/93f19877-502c-49d7-86ca-fa817403bca7%2Ficons8-timer-black.png?1547464335418';
var WHITE_TIMER_ICON = 'https://cdn.glitch.com/93f19877-502c-49d7-86ca-fa817403bca7%2Ficons8-timer-white.png?1547464335805';

console.log('client.js started');

TrelloPowerUp.initialize({
  // Start adding handlers for your capabilities here!
	'card-buttons': function(t, options){
    console.log('card-buttons called!');
    return [{
      icon: BLACK_TIMER_ICON,
      text: 'Estimate time',
      callback: function(t){
        return t.popup({
          title: "Estimation",
          url: '../../estimate.html'
        });
      }
    }];
	},
});
