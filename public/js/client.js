/* global TrelloPowerUp */
var Promise = TrelloPowerUp.Promise;

//var trello = TrelloPowerUp.iframe();

console.log('client.js started');

TrelloPowerUp.initialize({
  // Start adding handlers for your capabilities here!
	'card-buttons': buttons,

  /* Show on card */
  'card-badges': function(t, options) {
      return t.get('card', 'shared', 'estimate')
      .then(function(estimate) {
        return [
          /* Estimation */
          {
            icon: 'https://cdn.glitch.com/93f19877-502c-49d7-86ca-fa817403bca7%2Fstorypoints-icon.png?1547471374757',
            color: estimate ? 'blue' : 'red',
            text: estimate ? estimate : 'No Estimation!' 
          }
        ];
      })
  },
  'card-detail-badges': function(t, options) {
    return t.get('card', 'shared', 'estimate')
    .then(function(estimate) {
      return [
          /* Estimation */
          {
            title: 'Estimate',
            color: estimate ? 'blue' : 'red',
            text: estimate ? estimate : 'No Estimation!',
            callback: function(t) {
              return t.popup({
                title: "Estimation",
                url: '../estimate.html'
              });
            }      
          }
      ]
    })
  },
  'board-buttons': function (t, options) {
        return t.cards('all')
        .then(function (cards) {
            console.log(cards.array);
            var total = 0;
            var promises = [];
            promises.push(
              cards.forEach(element => {
                  t.get(element.id, 'shared', 'estimate')
                  .then(function(estimate) {
                      total += parseFloat(estimate);
                    console.log(total); 
                  });
              })
          );
  
          Promise.all(promises).then(() => 
            return [{
                icon: 'https://cdn.glitch.com/93f19877-502c-49d7-86ca-fa817403bca7%2Fstorypoints-icon.png?1547471374757',
                text: 'Total Est: ' + total,
                condition: 'always'
            }];   
          );
        });
  }  
});
