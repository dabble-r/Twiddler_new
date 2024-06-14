$(document).ready(() => {
  const $body = $('body');
//$('#back-button').html('');


// Function to display home timeline
const displayHomeTimeline = () => {
  $('#random-tweet-details').empty();
  streams.home.forEach(tweet => {
    const $tweet = $('<div></div>').addClass('tweet');
    const $username = $('<span></span>')
      .addClass('username')
      .text(`@${tweet.user}`)
      .css('color', 'blue')
      .css('cursor', 'pointer');
    const tweetText = `: ${tweet.message}`;
    $tweet.append($username).append(tweetText);

    const $timestamp = $('<div></div>').addClass('timestamp');
    const timestampText = moment(tweet.created_at).fromNow();
    $timestamp.text(timestampText);

    $tweet.append($timestamp);
    $('#random-tweet-details').prepend($tweet);
  });
};

// Function to display user timeline
const displayUserTimeline = (username) => {
  $('#user-tweet-details').empty();
  streams.users[username].forEach(tweet => {
    const $tweet = $('<div></div>').addClass('tweet');
    const tweetText = `@${tweet.user}: ${tweet.message}`;
    $tweet.text(tweetText);
    
    const $timestamp = $('<div></div>').addClass('timestamp');
    const timestampText = moment(tweet.created_at).fromNow();
    $timestamp.text(timestampText);

    $tweet.append($timestamp);
    $('#user-tweet-details').prepend($tweet);
  });
};


// Event listener for the new tweet button
$('#new-tweet-button').on('click', function() {
  // Generate 10 new random tweets
  for (let i = 0; i < 10; i++) {
    generateRandomTweet();
    
}
  // Display the home timeline
  $('#hashtag-timeline').hide();
  displayHomeTimeline();
  
  

});

// Event delegation for username clicks to display user timeline
$('#random-tweet-details').on('click', '.username', function() {
  const username = $(this).text().substring(1); // Remove the @ symbol
  displayUserTimeline(username);
  $('#random-tweet-details').hide();
  $('#hashtag-timeline').hide();
  $('#user-timeline').show();
});

    //console.log(streams.home)
    
    const hashtagNames = function() {
      let re = /#[\w\-.]+/g;
      //object to nest hashtag name/count
      //object to nest usernametimestamp
      //outputs array of random user names
      let names = streams.home.forEach(obj => {
        let namesArr = []
        if (obj.message.match(re)) {
          if (namesArr.indexOf(obj.user) == -1) {
            namesArr.push(obj.user);
          }
        }
        return namesArr;
      })
      return names
    }
    console.log(hashtagNames());
    //outputs obj of 
         
    
/*
    //event listener user click on hashtag
    //user clicks, display timeline of all like hashtags
    // Event delegation for username clicks to display user timeline
    $('#hashtag-details').on('click','.hashtag', function() {
      const hashtag = $(this).text();
      
      $('#random-tweet-details').hide();
      $('#user-timeline').hide();
      $('#hashtag-timeline').show();
    
    })
 */

// Event listener for the back button to return to home timeline
$('#back-button-user').on('click', function() {
  $('#user-timeline').hide();
  $('#hashtag-timeline').hide();
  $('#random-tweet-details').show();
});

//event listener for the back button hashtag return to random tweets timeline
$('#back-button-hashtag').on('click', function() {
  $('#user-timeline').hide();
  $('#hashtag-timeline').hide();
  $('#random-tweet-details').show();
})

// Event listener for the dropdown button_to tweet
$('#to-tweet').on('click', function() {
  const message = $('#tweet-input').val();
  const alert = 'Looks like there\'s no tweet!';
  if (message.trim() !== '') {
    writeTweet(message);
    $('#tweet-input').val(''); // Clear the input field
    displayHomeTimeline(); // Refresh the timeline
  } else if (message.trim() == '') { // if no tweet found
     displayHomeTimeline();           //display timeline
     window.alert(alert);             //show alert message
  }
});


//user clicks not to tweet button
$('#not-to-tweet').on('click', function() {
  const message = $('#tweet-input').val();
  const username = $('#username-input').val();
  if (message.trim() !== '' && username.trim() !== '') {
       writeTweet(`'${message}' was a failed tweet.`);
       streams.home.pop();
       displayHomeTimeline();
    } 
    window.alert('Don\'t be shy!');
    displayHomeTimeline();
  }); 



// Utility function for letting students add "write a tweet" functionality
// (NOTE: Not used by the rest of this file.)
const writeTweet = (message) => {
 // window.visitor = 'visitor';
 
  const visitor = $('#username-input').val() || 'visitor'; // You can set a global visitor or use 'visitor' as default

  if (!visitor){
    throw new Error('Set the global visitor property!');
  }

  const tweet = {
    user: visitor,
    message: message,
    created_at: new Date(),
  };
  addTweet(tweet);
  };


// Functionality to save hashtags, instancs of hashtages, usernmames, and timestamps to a data structure
// 
/*
const allTweets = streams.home; 
const hashtags = function(arr) {
    //regex starts at # and stops at whitespace
   
    //map points to streams.hashtags object
    //intialized as empty object
    arr = allTweets;
    let cache = streams.hashtags;
    let re = /#[\w\-.]+/g;

    arr.forEach(elem => {
      
      let username = elem.user;
      let timestamp = moment(elem.created_at).fromNow();
      let hashtag = elem.message.match(re);

      if (hashtag) {
        hashtag.toString();
        //obj does not hashtag property
              
          if (!cache[hashtag]) {
          //create hashtag property and assign to an object
          //obj[hashtag] = {};
          //for that hashtag, assign 'username' property to username
          //for that hashtag, assign 'timestamp' property to timestamp
            cache[hashtag] = {};
            cache[hashtag]['username'] = [username];
            cache[hashtag]['timestamp'] = [timestamp];
            cache[hashtag]['count'] = 1;
           // cache['timestamp'] = [timestamp];
        } else if (cache[hashtag]) {
            cache[hashtag]['count']++;
            cache[hashtag]['timestamp'].push(timestamp);
            if (!cache[hashtag]['username'].includes(username)) {
                cache[hashtag]['username'].push(username);
            }
        }
       }
      })
      return cache;
    }
    //to view data structure of return cache of all hashtags and details
    //cache returned as nested object
    //hashtags accessed there
    //console.log(hashtags())

    
    const displayHashtagsTimeline = function() {
      $('#hashtag-details').empty();

      const hashtagDetails = hashtags();
      //array of only hashtags in the nested object--verified
       const onlyHashtags = Object.keys(hashtagDetails);
       //array of only usernames
       const onlyNames = obj => {
        let names = [];
          for (let key in obj) {
            if (key == 'username') {
                names = names.concat(Object.values(key)); 
            }
          }
          return names;
       }
         console.log(onlyNames(hashtagDetails));
         

       onlyHashtags.forEach(tag => {
        const $hashtags = $('<div></div>')
           .addClass('hashtag')
           .css('color', 'blue')
           .css('cursor', 'pointer');

        const hashtagText = tag;
        $hashtags.append(hashtagText);
        $('#hashtag-details').prepend($hashtags);
       });

      
   };
   
   displayHashtagsTimeline()
    */

  
});