$(document).ready(function () {
  $('#tweet-text').on('input', function () {
    let currentLength = $(this).val().length;
    let counter = $(this).parent().next(['button-and-counter']).find('.counter');
    //creating the text for the counter
    counter.text(140 - currentLength);
    if (counter.text() < 0) {
      //create class so we can style it in new-tweet.css
      counter.addClass('counter-negative');
    } else {
      //remove the class if it is not overlimit
      counter.removeClass('counter-negative');
    }
  })
});



