/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

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

  renderTweets(data);

  // console.log($tweet);
  // $('#tweets-container').append($tweet);



});




