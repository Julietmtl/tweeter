$(document).ready(function() {
  console.log('ready');
 $('#tweet-text').on('input', function() {
   let currentLength = $(this).val().length;
   let counter = $(this).parent().next(['button-and-counter']).find('.counter');
   counter.text(140 - currentLength);
   if (counter.text() < 0) {
    counter.addClass('counter-negative');
   } else {
     counter.removeClass('counter-negative');
   }
 })
});



