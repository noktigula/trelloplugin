var BLACK_TIMER_ICON = 'https://cdn.glitch.com/93f19877-502c-49d7-86ca-fa817403bca7%2Ficons8-timer-black.png?1547464335418';
var WHITE_TIMER_ICON = 'https://cdn.glitch.com/93f19877-502c-49d7-86ca-fa817403bca7%2Ficons8-timer-white.png?1547464335805';

var WIP_ICON = 'https://cdn.glitch.com/93f19877-502c-49d7-86ca-fa817403bca7%2Ficons8-construction-96.png?1547475713477';
var CHECKMARK_ICON = 'https://cdn.glitch.com/93f19877-502c-49d7-86ca-fa817403bca7%2Ficons8-checkmark-96.png?1547475713391';

var FOLDER_ICON = 'https://cdn.glitch.com/93f19877-502c-49d7-86ca-fa817403bca7%2Ficons8-folder-48.png?1547477063203';

const PROGRESS = Object.freeze({
  NOT_STARTED: 0,
  STARTED: 1,
  STOPPED: 2
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
  return progressStatus && progressStatus.status === PROGRESS.STARTED 
}

function startProgress(trello) {
  var ps = {
    status: PROGRESS.STARTED,
    startTime: Date.now()
  };
  trello.set('card', 'shared', 'progressStatus', ps);
}

function stopProgress(trello, status) {
  var spent = status.startTime ? status.startTime : 0;
  var np = Object.assign({}, status, {
    status: PROGRESS.STOPPED,
    timeSpent: spent + (Date.now() - status.startTime)
  });

  trello.set('card', 'shared', 'progressStatus', np);
}

function updateProgress(trello, progressStatus) {
  isProgressStarted(progressStatus) 
    ? stopProgress(trello, progressStatus)
    : startProgress(trello);
}

function createProgressButton(trello) {
  return trello.get('card', 'shared', 'progressStatus')
  .then(function(progressStatus) {
    return {
      icon: isProgressStarted(progressStatus) ? CHECKMARK_ICON : WIP_ICON,
      text: isProgressStarted(progressStatus) ? 'Stop progress' : 'Start progress',
      callback: function(trello) { updateProgress(trello, progressStatus); }
    }
  })
}

function createEpicButton(trello) {
  return trello.get('card', 'shared', 'epic')
  .then(function(epic) {
    return {
      icon: FOLDER_ICON,
      text: epic == '_self_' ? 'Is Epic' : epic == '' || epic == undefined ? 'No Epic assigned' : 'Epic: ' + epic,
      callback: function(trello) {
        return trello.popup({
          title: "This task is...",
          url: '../epics.html'
        });
      }
    }
  })
}
        
function buttons(t, options) {
  return Promise.all([
    createEstimationButton(t),
    createProgressButton(t),
    createEpicButton(t)
  ])
  .then(function(values) {
    return values;
  });
}
  