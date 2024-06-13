
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
  displayHomeTimeline();
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

// Event listener for the tweet submit button
$('#tweet-submit').on('click', function() {
  const message = $('#tweet-input').val();
  if (message.trim() !== '') {
    writeTweet(message);
    $('#tweet-input').val(''); // Clear the input field
    displayHomeTimeline(); // Refresh the timeline
  }
});

// Initial call to display tweets if any exist
$(document).ready(function() {
  displayHomeTimeline();
});

// Utility function for letting students add "write a tweet" functionality
// (NOTE: Not used by the rest of this file.)
const writeTweet = (message) => {
  const visitor = window.visitor || 'visitor'; // You can set a global visitor or use 'visitor' as default

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
