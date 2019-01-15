/* global TrelloPowerUp */
var Promise = TrelloPowerUp.Promise;

TrelloPowerUp.initialize({
  // Start adding handlers for your capabilities here!
  'card-buttons': buttons,

  /* Show on card */
  'card-badges': cardBadges,

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
              var promises = [];
              cards.forEach(element => {
                  promises.push(
                      t.get(element.id, 'shared', 'estimate')
                          .then(function (estimate) {
                              return estimate;
                          })
                  );
              });

              return Promise.all(promises)
                  .then(estimations => {
                      var total = estimations.reduce((x, y) => parseFloat(x) + parseFloat(y), 0);
                      return [{
                          icon: 'https://cdn.glitch.com/93f19877-502c-49d7-86ca-fa817403bca7%2Fstorypoints-icon.png?1547471374757',
                          color: 'blue',
                          text: total,
                          condition: 'always'
                      }];
                  });
          });
  }
});
