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

//event listener user click on hashtag
//user clicks, display timeline of all like hashtags



// Event listener for the new tweet button
$('#new-tweet-button').on('click', function() {
  // Generate 10 new random tweets
  for (let i = 0; i < 10; i++) {
    generateRandomTweet();
    
    //console.log(hashtags(streams.home));
  }

  // Display the home timeline
  displayHomeTimeline();
  console.log(hashtags(streams.home));
});

// Event delegation for username clicks to display user timeline
$('#random-tweet-details').on('click', '.username', function() {
  const username = $(this).text().substring(1); // Remove the @ symbol
  displayUserTimeline(username);
  $('#random-tweet-details').hide();
  $('#user-timeline').show();
});

// Event listener for the back button to return to home timeline
$('#back-button').on('click', function() {
  $('#user-timeline').hide();
  $('#random-tweet-details').show();
});

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

//
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


/*
// Initial call to display tweets if any exist
$(document).ready(function() {
  displayHomeTimeline();
});
*/
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

// Automatic Functionality to save hashtags and usernmames to a data structure
// all hash
const hashtags = function(arr) {
    //regex starts at # and stops at whitespace
   
    //map points to streams.hashtags object
    //intialized as empty object
    let map = streams.hashtags;
    let re = /#[\w\-.]+/g;
    arr.forEach(elem => {
      let count = {};
      let username = elem.user;
      let timestamp = moment(elem.created_at).fromNow();
      let hashtag = elem.message.match(re);

      if (hashtag) {
        hashtag.toString();
        //obj does not hashtag property
        if (!map[hashtag]) {
          //create hashtag property and assign to an object
          //obj[hashtag] = {};
          //for that hashtag, assign 'username' property to username
          //for that hashtag, assign 'timestamp' property to timestamp
          map[hashtag] = {};
          map[hashtag]['username'] = [];
          map[hashtag]['username'].push(username);
          map[hashtag]['timestamp'] = [];
          map[hashtag]['timestamp'].push(timestamp);
          map[hashtag]['count'] = 1;
          
        } 
        if (map[hashtag]) {
          map[hashtag]['count']++;
        }
        // if the hashtag already exsits on the object as a property
        // if for that hastag, the 'username' already has the username 
        if (!map[hashtag]['username'].includes(username)) {
            map[hashtag]['username'].push(username);
            map[hashtag]['timestamp'].push(timestamp);
        } else if (map[hashtag]['username'].includes(username)) {
            map[hashtag]['timestamp'].push(timestamp);
          }
        }
        
      })
      //console.log(streams.home)
      
    return map;
    }
    

    
   
     


  
});