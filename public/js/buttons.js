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
  console.log('estimation button called');
  return trello.get('card', 'shared', 'estimate')
  .then(function(estimation) {
    console.log('estimate promise resolved');
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
  console.log('checking progress');
  console.log(progressStatus);
  console.log(progressStatus.status);
  console.log(progressStatus && progressStatus.status === PROGRESS.STARTED );
  return progressStatus && progressStatus.status === PROGRESS.STARTED 
}

function updateProgress(trello, progressStatus) {
  console.log('updating progress: original = ');
  console.log(progressStatus);
    if (isProgressStarted(progressStatus)) {
      console.log('progressStarted, need to stop');
      var np = Object.assign({}, {
        status: PROGRESS.STOPPED,
        timeSpent: Date.now() - progressStatus.startTime
      }, progressStatus);
      
      console.log(np);
      trello.set('card', 'shared', 'progressStatus', np);
      
    } else {
      console.log('starting progress');
      var ps = {
        status: PROGRESS.STARTED,
        startTime: Date.now()
      };
      console.log(ps);
      trello.set('card', 'shared', 'progressStatus', ps).then(()=>{console.log('done twice!')});
      console.log('done!');
    }
}

function createProgressButton(trello) {
  console.log('createProgressButton called');
  return trello.get('card', 'shared', 'progressStatus')
  .then(function(progressStatus) {
    console.log('progressStatus resolved');
    return {
      icon: isProgressStarted(progressStatus) ? CHECKMARK_ICON : WIP_ICON,
      text: isProgressStarted(progressStatus) ? 'Stop progress' : 'Start progress',
      callback: function(trello) { updateProgress(trello, progressStatus); }
    }
  })
}

function createEpicButton(trello) {
  console.log('createEpicButton called');
  return trello.get('card', 'shared', 'epic')
  .then(function(epic) {
    console.log('Epic resolved to: ' + epic);
    return {
      icon: FOLDER_ICON,
      text: epic == '_self_' ? 'Is Epic' : epic == '' || epic == undefined ? 'No Epic assigned' : 'Epic: ' + epic,
      callback: function(trello) {
       // Stub 
      }
    }
  })
}
        
function buttons(t, options) {
  console.log('buttons called');
  return Promise.all([
    createEstimationButton(t),
    createProgressButton(t),
    createEpicButton(t)
  ])
  .then(function(values) {
    console.log('All promises were resolved!');
    console.log(values);
    return values;
  });
}
  