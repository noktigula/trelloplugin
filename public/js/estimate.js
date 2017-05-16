/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var estimateSelector = document.getElementById('estimate');

document.getElementById('save').addEventListener('click', function(){
  return t.set('card', 'shared', 'estimate', estimateSelector.value)
  .then(function(){
    t.closePopup();
  });
});

t.render(function(){
  return Promise.all([
    t.get('card', 'shared', 'estimate', 0),
    t.get('card', 'shared', 'time', 0),
    t.get('card', 'shared', 'version', 'No version')
  ])
  .spread(function(estimate, time, version){
    estimateSelector.value = estimate;
    timeSelector.value = time;
    version.value = version;
    
  })
  .then(function(){
    t.sizeTo('#content')
    .done();
  });
// });

// var estimateSelector = document.getElementById('estimate');
// var timeSelector = document.getElementById('time');
// var versionSelector = document.getElementById('version');

// t.render(function(){
//   return Promise.all([
//     t.get('card', 'shared', 'estimate', 0),
//     t.get('card', 'shared', 'time', 0),
//     t.get('card', 'shared', 'version', 'No version')
//   ])
//   .spread(function(estimate, time, version){
//     estimateSelector.value = estimate;
//     timeSelector.value = time;
//     version.value = version;
    
//   })
//   .then(function(){
//     t.sizeTo('#content')
//     .done();
//   });
// });

// document.getElementById('save').addEventListener('click', function(){
//   return t.set('card', 'shared', 'estimate', estimateSelector.value)
//   .then(function(){
//     return t.set('card', 'shared', 'time', timeSelector.value);
//   }).then(function(){
//     return t.set('card', 'shared', 'lastModified', new Date());
//   })
//   .then(function() {
//     return t.set('card', 'shared', 'version', versionSelector.value);
//   })
//   .then(function(){
//     t.closePopup();
//   });
// });
