var t = TrelloPowerUp.iframe();

function setProgress(value) {
    t.set('card', 'shared', 'progress', value)
     .then(function() {
        t.closePopup();
    });
}

function updateProgress(value) {
    return t.get('card', 'shared', 'progress', 0)
        .then(function (progress) {
            t.set('card', 'shared', 'progress', progress+value)
                .then(function () {
                    t.closePopup();
                })
        })
}

window.progress.addEventListener('submit', function(event){
    // Stop the browser trying to submit the form itself.
    console.log('progress event listener');
    console.log(event);
    console.log(event.type);
    event.preventDefault();
    switch(event.type) {
        case 'save': return setProgress(window.updateProgress.value);
        case 'plusfour': return updateProgress(4);
        case 'pluseight': return updateProgress(8);
    }

    return
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


