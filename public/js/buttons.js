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

function isProgressStarted(progressStatus) {
   progressStatus && progressStatus.status === PROGRESS.STARTED 
}

function updateProgress(trello, progressStatus) {
  return {
      
        if (isProgressStarted(progressStatus)) {
          var np = Object.assign({}, {
            status: PROGRESS.STOPPED,
            timeSpent: new Date.getTime() - progressStatus.startTime
          }, progressStatus);
          
          trello.set('card', 'shared', 'progressStatus', np);
        } else {
          trello.set('card', 'shared', 'progressStatus', {
            status: PROGRESS.STARTED,
            startTime: new Date.getTime()
          });
        }
      }
    }
}

function createProgressButton(trello) {
  return trello.get('card', 'shared', 'progressStatus')
  .then(function(progressStatus) {
     
  })
}

function createEpicButton(trello) {
  return trello.get('card', 'shared', 'epic')
  .then(function(epic) {
    return {
      icon: '',
      text: epic == '_self_' ? 'Is Epic' : epic == '' ? 'No Epic assigned' : 'Epic: ' + epic,
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
  