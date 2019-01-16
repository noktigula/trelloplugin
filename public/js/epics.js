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
    console.log('old value: ' + epicOldValue + '; new value: ' + epicValue);

    if (epicValue == 'epic') { // We are making card a part of an epic, we need to store epic id from the select then
      console.log('Setting a card to new epic: ' + window.epic_id.value);
      epicValue = window.epic_id.value;
    }

    if (epicValue == epicOldValue) {
      t.closePopup();
      return;
    }

    return t.set('card', 'shared', 'epic', epicValue)
    .then(function(){
      t.get('board', 'shared', 'epics')
      .then(function(epicsText) {
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
          t.set('board', 'shared', 'epics', JSON.stringify(epics))
          .then(function() {
            t.closePopup();
          });
        } else if (epicValue == '_self_') { // Item was promoted from standalone to Epic
          if (!Array.isArray(epics)) {
            epics = [];
          }
          t.card('id', 'name')
          .then(function(card) {
            epics.push({id: card.id, name: card.name});
            t.set('board', 'shared', 'epics', JSON.stringify(epics))
            .then(function() {
              t.closePopup();
            });
          })
        } else {
          t.closePopup();
        }
      });
    });
  });
});

t.render(function(){

  t.get('card', 'shared', 'epic')
  .then(function(epic){
    if (epic == '_self_') {
      window.epic.checked = true;
    } else if (epic == '' || epic == undefined) {
      window.standalone.checked = true;
    } else {
      window.other_epic.checked = true;
    }
    t.get('board', 'shared', 'epics')
    .then(function(epicsText){
      console.log(epicsText);
      var epics = epicsText == undefined || epicsText == '' ? [] : JSON.parse(epicsText);
      if (Array.isArray(epics)) { // as it should be
          for (var i = 0; i < epics.length; i++) {
            // TODO: Do not add an epic to the select on itself
            console.log('Getting card with id ' + epics[i].id);
            var option = document.createElement('option');
            option.text = epics[i].name;
            option.value = epics[i].id;
            window.epic_id.appendChild(option);
            if (epics[i].id == epic) {
              option.selected = true;
            }
          }
      } else {
        console.warn('board->shared->epics is not an array!');
      }
    })
  }).then(function(){
  })
});
