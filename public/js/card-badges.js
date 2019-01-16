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

function epicBadge(trello, options) {
    return Promise.all([
        trello.get('card', 'shared', 'epic'),
        trello.get('board', 'shared', 'epics')
    ])
    .then(function(values) {
        if (values[0] == '_self_') {
            return {
                title: 'EPIC',
                icon: EPIC_ICON,
                color: 'red',
                text: 'EPIC'
            }
        } else if (values[0] != undefined && values[0] != '') {
            var epics = values[1] == undefined || values[1] == '' ? [] : JSON.parse(values[1]);
            if (Array.isArray(epics)) {
                for (var i  = 0; i < epics.length; i++) {
                    if (epics[i].id == values[0]) {
                        return {
                            title: 'EPIC',
                            icon: EPIC_ICON,
                            color: 'yellow',
                            text: 'Part of: ' + epics[i].name
                        }
                    }
                }
            }
        }
    });
}

function cardBadges(trello, options) {
    return Promise.all([
        estimationBadge(trello),
        progressBadge(trello),
        epicBadge(trello)
    ]).then(function (values) {
        return values;
    })
}

