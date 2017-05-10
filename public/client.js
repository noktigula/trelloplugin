/* global TrelloPowerUp */

// Trello Power-ups make extensive use of promises
// and we can access Bluebird Promises as follows
var Promise = TrelloPowerUp.Promise;

var global_t;

var PANDA_ICON = 'https://cdn.glitch.com/0cedee99-1534-4a43-88ec-f3eafd12aa3b%2Fpanda.png?1490808908505';
var TACO_ICON = 'https://cdn.glitch.com/20639433-3197-46bd-a2d1-2afa7367288a%2Ftaco.png?1489428197039';


/*
    🛠 Helper Functions 🛠
  These are just a few functions to
  make the initialization code easier
  to understand.
*/

// 🖍 Return a random color from the array below.
var randomBadgeColor = function() {
  return ['green', 'yellow', 'red', 'none'][Math.floor(Math.random() * 4)];
};

// 🔢 Return a random number.
var randomNumber = function() {
  return parseInt(Math.random()*100)
}

// 🔥 Helper to make requests to the HN API. We'll pass it the number of posts we 
// want and it will return a promise for a request for all of the posts. 
const hackerNewsApiHelper = function(count){
  return fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
  .then(function(topStories){ return topStories.json() }) // Convert the response to JSON
  .then(function(topStories){
    return Promise.all(
      // Make requests for the full details of the top 10 stories
      topStories.slice(0,count).map(function(storyId){
        return fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
        .then(function(response){ return response.json(); }); // Convert all of the responses to JSON.
      })
    )
  });
};

// 🤖 Determines whether an attachment is for reddit.com.
const isRedditAttachment = function(attachment){
  return attachment.url.includes('reddit.com')
}


/*
    📞 Callback Functions 📞
  These are callback functions that
  we will have called when a user clicks
  on some pieces of our Power-Up's U  I.
*/
var boardButtonCallback = function(t){
  return t.popup({
    title: 'Popup List Example',
    items: [{
      text: 'Open Overlay',
      callback: function(t){
        return t.overlay({
          url: './overlay.html',
        })
        .then(function(){
          return t.closePopup();
        });
      }
    }, {
      text: 'Open Board Bar',
      callback: function(t){
        return t.boardBar({
          url: './board-bar.html',
          height: 305
        })
        .then(function(){
          return t.closePopup();
        });
      }
    }]
  });
};

var asyncCardButtonCallback = function(t){
  return hackerNewsApiHelper(10)
  .then(function(topStoriesJson){
    return topStoriesJson.map(function(topStory){
      return {
        text: topStory.title,
        url: topStory.url,
        callback: function(t){
          // When a story is selected, we'll add it as an attachment on the card.
          return t.attach({ url: topStory.url, name: topStory.title })
          .then(function() {
            // Once attached, we want to close the popup.
            return t.closePopup();
          })
        }
      }
    })
  })
  .then(function(itemsToSearch){
    return t.popup({
      title: 'HN Top Stories',
      items: itemsToSearch,
      search: {
        count: 5,
        placeholder: `Search HN's Top Posts`,
        empty: 'No posts found!'
      }
    });  
  });
}

const itemCallback = function(shortCode, name){
  return function(t){
    return t.attach({ url: 'https://www.google.com/' + shortCode, name: name})
    .then(function() { return t.closePopup(); });
  }
}

var cardButtonCallback = function(t){
  
  let items = [
    {
      text: 'Acadia',
      url: 'http://www.nps.gov/acad',
      callback: itemCallback('acad', 'Acadia')
    }, {
      text: 'Yellowstone',
      url: 'http://www.nps.gov/yell',
      callback: itemCallback('yell', 'Yellowstone')
    }, {
      text: 'Yosemite',
      url: 'http://www.nps.gov/yose',
      callback: itemCallback('yose', 'Yosemite')
    }, {
      text: 'Chattanooga and Chickamauga',
      url: 'http://www.nps.gov/chch',
      callback: itemCallback('chch', 'Chattanooga and Chickamauga')
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
  
  'attachment-thumbnail': function(t, options){
    return {
      url: options.url,
      title: '👉 ' + 'Hard Work Happening Here, Boss' + ' 👈' ,
      image: {
        url: PANDA_ICON,
        logo: true
      },
      openText: 'Open Sesame'
    };
  },
  
  'attachment-sections': function(t, options){
    // Grab all of the attachments for reddit.
    var claimed = options.entries.filter(isRedditAttachment);
    if(claimed.length > 0){
      return [{
        claimed: claimed,
        icon: PANDA_ICON,
        title: 'Important Work',
        content: {
          type: 'iframe',
          url: t.signUrl('./attachment-section.html'),
          height: 306
        }
      }];
    }
    return [];
  },
  
  'board-buttons': function(t, options){
    return [{
      icon: PANDA_ICON,
      text: 'Popup',
      callback: boardButtonCallback
    }, {
      icon: PANDA_ICON,
      text: 'URL',
      url: 'https://trello.com/inspiration',
      target: 'Inspiring Boards' // optional target for above url
    }, {
      icon: PANDA_ICON,
      text: 'Search HN',
      callback: asyncCardButtonCallback,      
    }]
  },  
  
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
  
  'card-badges': function(t, options){
    return [{
      text: 'Magic Number ' + randomNumber(),
      icon: TACO_ICON,
      color: randomBadgeColor(),
      refresh: 10 // in seconds
    }, {
      text: 'Static',
      icon: TACO_ICON,
      color: null
    }];
  },
                           
  'card-detail-badges': function(t, options) {
    return [{
      title: 'My Badge',
      text: 'You Can Click Me!',
      callback: function(t) {
        return t.popup({
          title: 'Look At All The Styles!',
          url: './card-detail-badge.html',
          height: 400
        });
      }
    }];
  },
  
  
});