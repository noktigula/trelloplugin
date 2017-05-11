/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

var HYPERDEV_ICON = 'https://d30y9cdsu7xlg0.cloudfront.net/png/80449-200.png';
var GRAY_ICON = 'https://d30y9cdsu7xlg0.cloudfront.net/png/80449-200.png';
var WHITE_ICON = 'https://d30y9cdsu7xlg0.cloudfront.net/png/80449-200.png';

var getBadges = function(t){
  // We make a request to the data stored on the
  // card responsible for tracking time. But you could
  // just as easily make an async request to your servie
  // if you want to track time there.
  return Promise.all([
    t.get('card', 'shared', 'estimate', 0),
    t.get('card', 'shared', 'time', 0),
  ]).spread(function(estimate, time){
    var badge = `E:${estimate} T:${time}`;
    return [{
      title: 'Estimate and Time',
      text: badge,
      icon: HYPERDEV_ICON,
      color: null
    }];
  });
};

var badgeCallback = function(t) {
  return t.popup({
    title: 'Settings',
    url: './track-time.html',
    height: 184
  });
}

var getDetailBadges = function(t) {
  return Promise.all([
    t.get('card', 'shared', 'estimate', 0),
    t.get('card', 'shared', 'time', 0),
    t.get('card', 'shared', 'version', 'Not versioned'),
    t.get('card', 'shared', 'lastModified', 0)
  ]).spread(function(estimate, time, version, lastModified){
    
    console.log(lastModified)
    lastModified = ((lastModified == 0) ? 'N/A' : Date(lastModified))
    
    return [{
      title: 'Estimate',
      text: estimate,
      icon: HYPERDEV_ICON,
      color: null,
    }, {
      title: 'Time',
      text: time,
      icon: HYPERDEV_ICON,
      color: null
    },{
      title: 'Version',
      text: version,
      icon: HYPERDEV_ICON,
      color: null
    },{
      title: 'Last Modified',
      text: lastModified,
      icon: HYPERDEV_ICON, 
      color: null
    }];
  });
};

var cardButtonCallback = function(t){
  return t.popup({
    title: 'Add Estimate Or Time',
    url: './track-time.html'
  });
};

TrelloPowerUp.initialize({
  'card-badges': function(t, options){
    return getBadges(t);
  },
  'card-buttons': function(t, options) {
    return [{
      icon: GRAY_ICON,
      text: 'Track Time',
      callback: cardButtonCallback
    }];
  },
  'card-detail-badges': function(t, options) {
    return getDetailBadges(t);
  },

});
