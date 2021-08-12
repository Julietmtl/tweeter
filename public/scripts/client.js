/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  //hide error messages
  $('#err1').hide();
  $('#err2').hide();

  const renderTweets = function (tweets) {
    // loops through tweets

    for (let tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweets-container').prepend($tweet)
    }
  }

  const createTweetElement = function (data) {
    const encoded = `<p class="tweet-post">${escape(data.content.text)}</p>`
    const time = timeago.format(data.created_at)
    const $tweet =
      `<header>
        <span><img src='${data.user.avatars}'></span>
        <span class="name">${data.user.name} </span>
        <span class="username">${data.user.handle}</span>
        </header>
            ${encoded}
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
    //Errors are hidden when client tries to submit another tweet
    $('#err1').slideUp(500);
    $('#err2').slideUp(500);
    let tweetLength = $('#tweet-text').val().length
    if (tweetLength === 0) {
      evt.preventDefault()
      $('#err1').slideDown(500);
    } else if ($('#tweet-text').val().length > 140) {
      evt.preventDefault();
      $('#err2').slideDown(500);
    } else {
      evt.preventDefault();
      $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: $('#tweet-text').serialize()
      }).then(function () {
        $('#tweet-text').val('');
        loadTweets();
      })
    }
  })

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //loads the tweets
  const loadTweets = function () {
    $.ajax({
      method: 'GET',
      url: '/tweets/',
      dataType: 'JSON'
    }) //callback function to get the response back and iterate through the objects
      .then(function (response) {
        $('#tweets-container').empty()
        renderTweets(response)
      })
  }
  loadTweets();

});


