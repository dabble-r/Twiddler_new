$(document).ready(() => {
  const $body = $('body');
//$('#back-button').html('');


// Function to display home timeline
const displayHomeTimeline = () => {
  $('#random-tweet-details').empty();
  let re = /#[\w\-.]+/g;
  streams.home.forEach(tweet => {
    
   
   
   if (re.test(tweet.message)) {
    const $hashtag = $('<div></div>')
      .addClass('hashtag');
    
    let $hashtagText = $('<span></span')
      .attr('id', 'hashtag-details')
      .text(tweet.message.match(re))
      .css('color', 'blue')
      .css('cursor', 'pointer');
    
    $hashtag.append($hashtagText);

    const $tweet = $('<div></div>')
      .addClass('tweet');
    
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

    $tweet.append($hashtag);
    $('#random-tweet-details').prepend($tweet);
   }

   const $tweet = $('<div></div>')
     .addClass('tweet');
 
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

  // Function to display hashtag details
const displayHashtagDetails = function(hashtag) {
 // const dataTotals = hashtagDetails();
  const hashtagData = streams.hashtags[hashtag];
  //console.log(hashtagData);
  if (!hashtagData) return;

  const detailsContainer = $('#hashtag-details');
  detailsContainer.empty();

  let detailsHTML = `<h2>${hashtag}</h2>`;
  detailsHTML += `<p>Count: ${hashtagData.count}</p>`;

  Object.keys(hashtagData.details).forEach(username => {
      detailsHTML += `<h3>${username}</h3>`;
      detailsHTML += `<ul>`;
      hashtagData.details[username].forEach(timestamp => {
          detailsHTML += `<li>${timestamp}</li>`;
      });
      detailsHTML += `</ul>`;
  });

  detailsContainer.html(detailsHTML);
};

displayHashtagDetails()
/*
// Bind click event to hashtag elements
$('#hashtag-details').on('click', '.hashtag', function() {
  const hashtag = $(this).text();
  displayHashtagDetails(hashtag);
  $('#random-tweet-details').hide();
  $('#user-timeline').hide();
  $('#hashtag-details').show();
});
*/


// Event listener for the new tweet button
$('#new-tweet-button').on('click', function() {
  // Generate 10 new random tweets
  for (let i = 0; i < 10; i++) {
    generateRandomTweet();
   
}
  // Display the home timeline
  displayHomeTimeline();
  hashtagDetails();
  streams.hashtags = hashtagDetails();
  let hashtags = Object.keys(streams.hashtags);
});

// Event delegation for username clicks to display user timeline
$('#random-tweet-details').on('click', '.username', function() {
  const username = $(this).text().substring(1); // Remove the @ symbol
  displayUserTimeline(username);
  $('#random-tweet-details').hide();
  $('#hashtag-timeline').hide();
  $('#user-timeline').show();
});

    

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


// Functionality to save hashtags, instancs of hashtages, usernmames, and timestamps to a nested object data structure
const hashtagDetails = function() {
  let cache = {};
  let re = /#[\w\-.]+/g;

  streams.home.forEach(obj => {
      let username = obj.user;
      let timestamp = moment(obj.created_at).fromNow();
      let hashtags = obj.message.match(re); // Note the plural 'hashtags'

      // if obj in streams.home contains at least 1 hashtag
      if (hashtags) {
          hashtags.forEach(hashtag => {
              // if the cache obj prop hashtag does not have the same value hashtag
              if (!cache[hashtag]) {
                  // create hashtag prop and assign to an object with count and details
                  cache[hashtag] = {
                      count: 1,
                      details: {}
                  };
              } else {
                  cache[hashtag].count++;
              }
              if (!cache[hashtag].details[username]) {
                  cache[hashtag].details[username] = [];
              }
              // push the curr timestamp val to nested timestamp array
              cache[hashtag].details[username].push(timestamp);
          });
      }
  });
  /*
    //nested object
      //{ #hashtag: {
            count: num,
            details: {
              username: [timestamp, timestamp, ...timestamp]
            }
          }
        }
    */
  return cache;
};
    //invoke hashtagDetails function
     

// function to loop through hashtag nesteed object structure
// pulls out hashtag and usernames
// returns a one line string
// ` ${hashtag} was used ${count} times by users: ${username}, ${username}, ...${username}.`
// To access object details:
//    object keys are #hashtags
//        each hashtag key has a count prop
//        each hashtag ley has a details prop
//              each details prop has a username prop
// Function to display home timeline
/*
    const displayHashtagTimeline = () => {
      $('#hashtag-details').empty();
      let re = /#[\w\-.]+/g;

      streams.home.forEeach(tweet => {
        let $details = $('<div></div)').addClass('details');
        let $hashtag = $('<span></span>')
                .addClass('hashtag')
                .text(`${tweet.match(re)}`)
                .css('color', 'blue')
                .css('cursor', 'pointer');
      $details.append($hashtag);
      $('#hashtag-details').prepend($details);

      });
      /*
      streams.hashtags.forEach(tweet => {
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

     displayHashtagTimeline()
*/





  /*
  const hastag_Timetag_Username = streams.home.forEach(obj => {
          let hashtagArr = [];
          let timestamps = [];
          let usernames = [];
          let re = /#[\w\-.]+/g;
          let hashtag = obj.message.match(re);

          if (hashtag) {

          }
  });
*/
/*
  const onlyNames = function() {
    const objHashtags = hashtagDetails();
    let hashtags = Object.keys(objHashtags);
       for (let key in objHashtags) {

       }
  }
  */
  
    
      
    /*
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
  }) 
   
   displayHashtagsTimeline()
    */

  
});