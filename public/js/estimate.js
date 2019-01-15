var t = TrelloPowerUp.iframe();

var ESTIMATION_CHANGED = "estimationChanged";

window.estimate.addEventListener('submit', function(event){
  // Stop the browser trying to submit the form itself.
  event.preventDefault();
  return t.set('card', 'shared', 'estimate', window.estimateTime.value)
  .then(function(){
    fireEstChangeEvent();
    t.closePopup();
  });
});

window.addEventListener(ESTIMATION_CHANGED, function() { 
  console.log("Hello World!"); 
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

function fireEstChangeEvent() {
    var event = document.createEvent("HTMLEvents");
    event.initEvent(ESTIMATION_CHANGED, true, true);
    event.eventName = ESTIMATION_CHANGED;
    window.dispatchEvent(event);  
}



