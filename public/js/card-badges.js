// @flow
function estimationBadge(trello) {
    return trello.get('card', 'shared', 'estimate')
    .then(function(estimate) {
        return {
            title: 'Estimation',
            icon: 'https://cdn.glitch.com/93f19877-502c-49d7-86ca-fa817403bca7%2Fstorypoints-icon.png?1547471374757',
            color: estimate ? 'blue' : 'red',
            text: estimate ? estimate : 'No Estimation!'
        }
    })
}

function progressBadge(trello, options) {
    return Promise.all([
        trello.get('card', 'shared', 'progress'),
        trello.get('card', 'shared', 'estimate')
    ])
    .then(function(values) {
        let color = 'green';
        if (!values[0]) {
            color = 'blue'
        } else if (values[0] > (values[1] * 2)) {
            color = 'red';
        } else if (values[0] > values[1]) {
            color = 'yellow';
        }

        return {
            title: 'Progress',
            icon: WIP_ICON,
            color: color,
            text: values[0] ? 'Spent: ' + values[0] : 'No progress'
        }
    });
}

function cardBadges(trello, options) {
    return Promise.all([
        estimationBadge(trello),
        progressBadge(trello)
    ]).then(function (values) {
        return values;
    })
}

