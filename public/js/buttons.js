var BLACK_TIMER_ICON = 'https://cdn.glitch.com/93f19877-502c-49d7-86ca-fa817403bca7%2Ficons8-timer-black.png?1547464335418';
var WHITE_TIMER_ICON = 'https://cdn.glitch.com/93f19877-502c-49d7-86ca-fa817403bca7%2Ficons8-timer-white.png?1547464335805';

var WIP_ICON = 'https://cdn.glitch.com/93f19877-502c-49d7-86ca-fa817403bca7%2Ficons8-construction-96.png?1547475713477';
var CHECKMARK_ICON = 'https://cdn.glitch.com/93f19877-502c-49d7-86ca-fa817403bca7%2Ficons8-checkmark-96.png?1547475713391';

const PROGRESS = Object.freeze({
  NOT_STARTED: Symbol(0),
  STARTED: Symbol(1),
  STOPPED: Symbol(2)
});

function createEstimationButton(trello) {
  return trello.get('card', 'shared', 'estimate')
  .then(function(estimation) {
    return {
      icon: BLACK_TIMER_ICON,
      text: estimation ? 'Estimation: ' + estimation : 'Estimate time',
      callback: function(t){
        return t.popup({
          title: "Estimation",
          url: '../estimate.html'
        });
      }
    }
  });
}

function createProgressButton(trello) {
  return trello.get('card', 'shared', 'progressStatus')
  .then(function(progressStatus) {
    return {
      icon: progressStatus && progressStatus.status === PROGRESS.STARTED ? CHECKMARK_ICON : WIP_ICON,
      text: progressStatus && progressStatus.status === PROGRESS.STARTED ? 'Stop progress' : 'Start progress',
      callback: function(trello) {
        
      }
    }
  })
}

function buttons(t, options) {
  console.log('card-buttons called!');
  return [
      createEstimationButton(t),
      createProgressButton(t)
    ];
}
  