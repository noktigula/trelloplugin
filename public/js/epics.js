var t = TrelloPowerUp.iframe();

window.epics.addEventListener('submit', function(event){
  // Stop the browser trying to submit the form itself.
  event.preventDefault();
  
  t.get('card', 'shared', 'epic')
  .then(function(epicOldValue) {
    var epicValue = "";
    if (document.querySelector('input[name="epic_type"]:checked')) {
      epicValue = document.querySelector('input[name="epic_type"]:checked').value;
    }
    
    if (epicValue == epicOldValue) {
      return;
    }

    return t.set('card', 'shared', 'epic', epicValue)
    .then(function(){
      t.get('board', 'shared', 'epics')
      .then(function(epicsText) {
        console.log('epicsText:');
        console.log(epicsText);
        var epics = epicsText == undefined || epicsText == '' ? [] : JSON.parse(epicsText);
        if (epicOldValue == '_self_') { // Item was demoted to standalone from Epic
          if (! Array.isArray(epics) ) {
            epics = [];
          } else {
            for (var i = epics.length-1; i>-1; i--) {
              if (epics[i].id == t.getContext().card) {
                epics.splice(i,1);
              }
            }
          }
        } else if (epicValue == '_self_') { // Item was promoted from standalone to Epic
          if (!Array.isArray(epics)) {
            epics = [];
          }
          epics.push({id: t.getContext().card});
        }

        console.log('Setting epics');
        console.log(epics);
        t.set('board', 'shared', 'epics', JSON.stringify(epics))
        .then(function() {
          t.closePopup();
        });
      });
    });
  });
});

t.render(function(){
  //TODO: Load Epics select here
  //t.remove('board', 'shared', 'epics');
  t.get('board', 'shared', 'epics')
  .then(function(epics){
    console.log(epics);
    window.epic_id
  })

  t.get('card', 'shared', 'epic')
  .then(function(epic){
    if (epic == '_self_') {
      window.epic.checked = true;
    } else if (epic == '' || epic == undefined) {
      window.standalone.checked = true;
    } else {
      window.other_epic.checked = true;
      //TODO: Show proper value in select here
    }
  }).then(function(){

  })
});
