var t = TrelloPowerUp.iframe();

window.estimate.addEventListener('submit', function(event){
  // Stop the browser trying to submit the form itself.
  event.preventDefault();
  return t.set('card', 'shared', 'estimate', window.estimateTime.value)
  .then(function(){
    t.closePopup();
  });
});

t.render(function(){
  t.sizeTo('#estimate').done();
});


