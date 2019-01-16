/* global TrelloPowerUp */
var Promise = TrelloPowerUp.Promise;

function sum(x, y) {
    return parseFloat(x) + parseFloat(y);
}

TrelloPowerUp.initialize({
  // Start adding handlers for your capabilities here!
  'card-buttons': buttons,

  /* Show on card */
  'card-badges': cardBadges,

  'card-detail-badges': cardDetailBadges,

  'board-buttons': function (t, options) {
      return t.cards('all')
          .then(function (cards) {
              var promises = [];
              cards.forEach(element => {
                  promises.push(
                      Promise.all([
                              t.get(element.id, 'shared', 'estimate')
                                  .then(function (estimate) {
                                      return estimate ? estimate : 0;
                                  }),
                              t.get(element.id, 'shared', 'progress')
                                  .then(function (progress) {
                                      return progress ? progress : 0;
                                  })
                          ]
                      ).then(function (values) {
                          return values
                      }));
              });

              return Promise.all(promises)
                  .then(estimations => {
                      console.log('getting estimates');
                      var totalEstimate = estimations.map(x => x[0]).reduce(sum, 0);
                      console.log('getting progress');
                      var totalProgress = estimations.map(x => x[1]).reduce(sum, 0);
                      return [{
                          icon: 'https://cdn.glitch.com/93f19877-502c-49d7-86ca-fa817403bca7%2Fstorypoints-icon.png?1547471374757',
                          text: 'Total estimation: ' + totalEstimate,
                          condition: 'always'
                      },
                          {
                              icon: WIP_ICON,
                              text: 'Total progress: ' + totalProgress,
                              condition: 'always'
                          }//,
                          /*{
                              icon: WIP_ICON,
                              text: 'Burndown chart',
                              condition: 'always',
                              callback: function (trello) {
                                  console.log('Chart button clicked');
                                  trello.modal({
                                      url: '../burndown.html',
                                      fullscreen: true,
                                      title: 'Burndown chart',
                                      args: {
                                          'estimates': estimations.map(x => x[0]),
                                          'progress': estimations.map(x => x[1])
                                      }
                                  });
                              }
                          }*/];
                  });
          });
  }
});
