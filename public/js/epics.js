var t = TrelloPowerUp.iframe();

window.epics.addEventListener('submit', function(event){
  // Stop the browser trying to submit the form itself.
  event.preventDefault();
  
  return t.set('card', 'shared', 'epic', window.epicType.value)
  .then(function(){
    t.closePopup();
  });
});

t.render(function(){
  t.get('card', 'shared', 'epic')
  .then(function(epic){
    if (estimate) {
      window.estimateTime.value = estimate;
    }
  }).then(function(){
    t.sizeTo('#estimate').done();
  })
});