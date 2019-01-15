var t = TrelloPowerUp.iframe();

window.epics.addEventListener('submit', function(event){
  // Stop the browser trying to submit the form itself.
  event.preventDefault();

  var epicValue = "";
  if (document.querySelector('input[name="epic_type"]:checked')) {
    epicValue = document.querySelector('input[name="epic_type"]:checked').value;
  }
  
  return t.set('card', 'shared', 'epic', epicValue)
  .then(function(){
    t.closePopup();
  });
});

t.render(function(){
  //TODO: Load Epics select here
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