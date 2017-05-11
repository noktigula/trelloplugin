/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

var PANDA_ICON = 'https://cdn.glitch.com/0cedee99-1534-4a43-88ec-f3eafd12aa3b%2Fpanda.png?1490808908505';
var TACO_ICON = 'https://cdn.glitch.com/20639433-3197-46bd-a2d1-2afa7367288a%2Ftaco.png?1489428197039';

var cardButtonCallback = function(t){
  
  let items = [
    {
      text: 'Acadia',
      url: 'http://www.nps.gov/acad'
    }, {
      text: 'Yellowstone',
      url: 'http://www.nps.gov/yell'
    }, {
      text: 'Yosemite',
      url: 'http://www.nps.gov/yose'
    }, {
      text: 'Chattanooga and Chickamauga',
      url: 'http://www.nps.gov/chch'
    }
  ]

  return t.popup({
    title: 'Popup Search Example',
    items: items,
    search: {
      count: 3,
      placeholder: 'Search National Parks',
      empty: 'No parks found'
    }
  });  
};


/*
    🎉 Power-Up Initialization 🎉
  Here is where we will initialize all
  of the capabilities that we want the
  Power-Up to use.
*/
TrelloPowerUp.initialize({

  'card-buttons': function(t, options) {
    return [{
      icon: PANDA_ICON,
      text: 'Link To A Page',
      url: 'https://developers.trello.com',
      target: 'Trello\'s Developer Site',
    },{
      icon: PANDA_ICON,
      text: 'Search Parks',
      callback: cardButtonCallback,
    }];
  },
  
  'card-detail-badges': function(t, options) {
    
  }
  
});