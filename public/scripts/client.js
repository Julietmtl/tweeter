/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  const renderTweets = function (tweets) {
    // loops through tweets

    for (let tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweets-container').append($tweet)
    }
  }

  const createTweetElement = function (data) {
    const time = timeago.format(data.created_at)
    const $tweet =
      `<header>
        <span><img src='${data.user.avatars}'></span>
        <span class="name">${data.user.name} </span>
        <span class="username">${data.user.handle}</span>
        </header>
            <p class="tweet-post">${data.content.text}</p>
            <footer>
              <span class="days-ago"> ${time} </span>
              <div class="tweet-icons">
                <span><i class="fas fa-flag"></i></span>
                <span><i class="fas fa-retweet"></i></span>
                <span><i class="fas fa-heart"></i></span>
              </div>
            </footer>`
    return $tweet
  }

  //form cannot be longer than 140 characters and cannot be empty
  // The user should be given an error that their tweet content is too long or that it is not present (ideally separate messages for each scenario)
  // The form should not be cleared
  // The form should not submit

  $('#Tweet-form').on('submit', (evt) => {
    let tweetLength = $('#tweet-text').val().length
    if (tweetLength === 0) {
      evt.preventDefault()
      alert("Please create a tweet.")
    } else if ($('#tweet-text').val().length > 140) {
      evt.preventDefault()
      alert("Please keep within 140 characters.");
    } else {
      evt.preventDefault();
      $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: $('#tweet-text').serialize()
      })
      console.log($('#tweet-text').serialize())
    }
  })

  //loads the tweets
  const loadTweets = function () {
    $.ajax({
      method: 'GET',
      url: '/tweets/',
      dataType: 'JSON'
    }) //callback function to get the response back and iterate through the objects
      .then(function (response) {
        renderTweets(response)
      })
  }
  loadTweets();

});


