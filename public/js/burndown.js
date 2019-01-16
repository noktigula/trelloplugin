var t = TrelloPowerUp.iframe();

var ctx = document.getElementById("burndown_chart");

const SPRINT = 14;

function parseData(trello) {
    //TODO we need to have snapshot of progress in the end of each day
    console.log('parseData called');
    const estimates = trello.arg('estimate').reduce((x, y)=>parseFloat(x)+parseFloat(y), 0);
    const progress = trello.arg('progress').reduce((x, y)=>parseFloat(x)+parseFloat(y), 0);

    console.log(

    const today = Date.now();
    const sprintStart = new Date();
    sprintStart.setDate(sprintStart.getDate()-SPRINT);

    const labels = []
    for (let i = 0; i < SPRINT; i++) {
        labels.push(sprintStart.setDate(sprintStart.getDate()+i).toLocaleDateString("en-US"));
    }

    sprintStart.setDate(sprintStart.getDate()-SPRINT);

    const data = []
    for (let i = 1; i <= SPRINT; i++) {
        let x = i;

        let yE = estimates / i;
        let yP = progress / i;

        data.push([{x: x, y: yE}]);
    }

    return {
        type: 'line',
        data: {
            labels: labels,
            datasets:[{
                label: 'Estimations',
                data: data,
                backgroundColor: 'rgba(255, 255, 255, 255)',
                borderColor: 'rgba(0, 0, 0, 0)',
                borderWith: 1
            }],
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        max: estimates
                    }
                }]
            }
        }
    }
}

var myChart = new Chart(ctx, parseData(t));
