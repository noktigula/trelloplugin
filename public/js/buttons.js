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
  return trello.get('card', 'shared', 'progress')
  .then(function(progress) {
    return {
      icon: WIP_ICON,
      text: progress ? 'Update progress' : 'Update progress: ' + progress,
      callback: function(trello) {
        trello.popup({
            title: 'Update progress',
            url: '../progress.html'
        })
      }
    }
  })
}

function createEpicButton(trello) {
  return trello.get('card', 'shared', 'epic')
  .then(function(epic) {
    return trello.get('board', 'shared', 'epics')
    .then(function(epicsText) {
      var epicName = "";
      var epics = epicsText == undefined || epicsText == '' ? [] : JSON.parse(epicsText);
      if (Array.isArray(epics)) {
        for (var i = 0; i < epics.length; i++) {
          if (epics[i].id == epic) {
            epic = epics[i].name;
          }
        }
      }
      return {
        icon: FOLDER_ICON,
        text: epic == '_self_' ? 'Is Epic' : epic == '' || epic == undefined ? 'No Epic assigned' : 'Epic: ' + epic,
        callback: function(trello) {
          return trello.popup({
            title: "This task is...",
            url: '../epics.html',
            height: 185,
            args: {epic: epic},
          });
        }
      }
    });
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
