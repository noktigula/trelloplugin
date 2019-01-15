var t = TrelloPowerUp.iframe();

function setProgress(value) {
    t.set('card', 'shared', 'progress', value)
        .then(function() {
            t.closePopup();
        });
}

function updateProgress(value) {
    t.get('card', 'shared', 'progress', 0)
        .then(function (progress) {
            t.set('card', 'shared', 'progress', progress+value)
                .then(function () {
                    t.closePopup();
                })
        })
}

document.getElementById('plusfour').addEventListener('click', function(event){
    updateProgress(4);
});

document.getElementById('pluseight').addEventListener('click', function(event) {
    updateProgress(8);
});

window.progress.addEventListener('submit', function(event){
    return setProgress(document.getElementById('updateProgress').value);
});

t.render(function(){
    t.get('card', 'shared', 'progress')
        .then(function(progress){
            if (progress) {
                document.getElementById('updateProgress').value = progress;
            }
        })
        .then(function() {
            t.sizeTo('#progress').done();
        })
});
