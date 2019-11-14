$(document).keydown(function (e) {
  //if right arrow key(39) is pressed down
  if (e.which == '39') {
    //move the object to position left +250 and ensure it finishes animating when another key is pressed
    $(".userIcon").finish().animate({
      left: "+250"
      //move fast
    }, "fast");
  }
});

$(document).keydown(function (e) {
  //if left arrow key(37) is pressed down
  if (e.which == '37') {
    //move the object to position left +60 (original position) and ensure it finishes animating when another key is pressed
    $(".userIcon").finish().animate({
      left: "+45"
    }, "fast");
  }
});

// const fallingObstacles = function () {
//   const obstacles = $();
//   const amountOfObstacles = 3;
//   for (i = 0; i < amountOfObstacles; ++i)
  
// }



// let timer = setInterval(function () {
//   if (animation complete) clearInterval(timer);
//   else increase style.left by 2 px
// }, 20); // change by 2px every 20ms, about 50 frames per second

let start = Date.now(); // remember start time
let timer = setInterval(function () {
  // how much time passed from the start?
  let timePassed = Date.now() - start;
  if (timePassed >= 3000) {
    clearInterval(timer); // finish the animation after 2 seconds
    return;
  }
  // draw the animation at the moment timePassed
  draw(timePassed);
}, 20);
// as timePassed goes from 0 to 2000
// left gets values from 0px to 400px
function draw(timePassed) {
  obstacle.style.top = timePassed / 5 + 'px';
}