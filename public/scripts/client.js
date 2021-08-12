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
      <span><img src='${data.user.avatars}'>${data.user.name} </span>
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

  $('#Tweet-form').on('submit', (evt) => {
    evt.preventDefault();
    $.ajax({
      url: '/tweets/',
      method: 'POST',
      data: $('#tweet-text').serialize()
    })
    console.log($('#tweet-text').serialize())
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


