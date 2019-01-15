// @flow
function estimationDetailsBadge(trello, options) {
    return estimationBadge(trello)
    .then(function(badge) {
         return Object.assign({}, badge, {
             callback: function(t) {
                 return t.popup({
                     title: "Estimation",
                     url: '../estimate.html'
                 });
             }
         })
    });
}

function progressDetailsBadge(trello) {
    return progressBadge(trello)
    .then(function(badge) {
       return Object.assign({}, badge, {
           callback: function(t) {
               return t.popup({
                   title: 'Progress',
                   url: '../progress.html'
               })
           }
       })
    });
}

function cardDetailBadges(trello, options) {
    return Promise.all([
        estimationDetailsBadge(trello),
        progressDetailsBadge(trello)
    ])
    .then(function (values) {
        return values;
    })
}
