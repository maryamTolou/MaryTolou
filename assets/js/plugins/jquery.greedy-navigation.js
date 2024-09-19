/*
* Greedy Navigation
*
* http://codepen.io/lukejacksonn/pen/PwmwWV
*
*/

var $nav = $('#site-nav');
var $btn = $('#site-nav button');
var $vlinks = $('#site-nav .visible-links');
var $hlinks = $('#site-nav .hidden-links');

var breaks = [];

// function updateNav() {

//   var availableSpace = $btn.hasClass('hidden') ? $nav.width() : $nav.width() - $btn.width() - 30;

//   // The visible list is overflowing the nav
//   if($vlinks.width() > availableSpace) {

//     // Record the width of the list
//     breaks.push($vlinks.width());

//     // Move item to the hidden list
//     $vlinks.children('*:not(.masthead__menu-item--lg)').last().prependTo($hlinks);

//     // Show the dropdown btn
//     if($btn.hasClass('hidden')) {
//       $btn.removeClass('hidden');
//     }

//   // The visible list is not overflowing
//   } else {

//     // There is space for another item in the nav
//     if(availableSpace > breaks[breaks.length-1]) {

//       // Move the item to the visible list
//       $hlinks.children().first().appendTo($vlinks);
//       breaks.pop();
//     }

//     // Hide the dropdown btn if hidden list is empty
//     if(breaks.length < 1) {
//       $btn.addClass('hidden');
//       $hlinks.addClass('hidden');
//     }
//   }

//   // Keep counter updated
//   $btn.attr("count", breaks.length);

//   // Recur if the visible list is still overflowing the nav
//   if($vlinks.width() > availableSpace) {
//     updateNav();
//   }

// }

function updateNav() {
  var availableSpace = $btn.hasClass('hidden') ? $nav.width() : $nav.width() - $btn.width() - 30;

  // Check if the visible list is potentially overflowing the nav
  var totalWidth = 0;
  $vlinks.children().each(function() {
    totalWidth += $(this).outerWidth(true);
  });

  // If there isn't enough space for all items, move all to hidden
  if(totalWidth > availableSpace) {
    $vlinks.children().prependTo($hlinks);  // Move all visible links to hidden
    $btn.removeClass('hidden');
    $hlinks.removeClass('hidden');
  } else {
    if($hlinks.children().length > 0 && availableSpace > totalWidth + $hlinks.children().first().outerWidth(true)) {
      $hlinks.children().appendTo($vlinks);  // Move all back to visible if space allows
    }

    // If no items are hidden, hide the button
    if($hlinks.children().length === 0) {
      $btn.addClass('hidden');
      $hlinks.addClass('hidden');
    }
  }

  $btn.attr("count", $hlinks.children().length);  // Update button count
}

// Window listeners

$(window).resize(function() {
  updateNav();
});

$btn.on('click', function() {
  $hlinks.toggleClass('hidden');
  $(this).toggleClass('close');
});

updateNav();