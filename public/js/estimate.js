var t = TrelloPowerUp.iframe();

window.estimate.addEventListener('submit', function(event){
  // Stop the browser trying to submit the form itself.
  event.preventDefault();
  return t.set('card', 'shared', 'estimate', window.estimateTime.value)
  .then(function(){
    t.set('board', 'shared', 'random-estimate', Math.random()) // To cause refresh of board buttons
    .then(function(){
      t.closePopup();
    });
  });
});

t.render(function(){
  t.get('card', 'shared', 'estimate')
  .then(function(estimate){
    if (estimate) {
      window.estimateTime.value = estimate;
    }
  }).then(function(){
    t.sizeTo('#estimate').done();
  })
});



