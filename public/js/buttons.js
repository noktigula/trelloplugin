var BLACK_TIMER_ICON = 'https://cdn.glitch.com/93f19877-502c-49d7-86ca-fa817403bca7%2Ficons8-timer-black.png?1547464335418';
var WHITE_TIMER_ICON = 'https://cdn.glitch.com/93f19877-502c-49d7-86ca-fa817403bca7%2Ficons8-timer-white.png?1547464335805';

export function buttons(t, options) {
  console.log('card-buttons called!');
  return t.get('card', 'shared', 'estimate')
  .then(function(estimate) {
    return [{
      icon: BLACK_TIMER_ICON,
      text: estimate ? 'Estimation: ' + estimate : 'Estimate time',
      callback: function(t){
        return t.popup({
          title: "Estimation",
          url: '../estimate.html'
        });
      }
    }];
  })
}
  