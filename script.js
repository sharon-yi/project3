$(function () {

  let gameOver = false;

  let moveLeft = false;
  let moveRight = false;




  $(document).keydown(function (e) {
    if (gameOver === false) {
      let key = e.keyCode;
      if (key == '37' && moveLeft === false) {
        moveLeft = requestAnimationFrame(left);
      } else if (key == '39' && moveRight === false) {
        moveRight = requestAnimationFrame(right);
      }
    }
  });

  $(document).on('keyup', function (e) {
    if (gameOver === false) {
      let key = e.keyCode;
      if (key === 37) {
        cancelAnimationFrame(moveLeft);
        moveLeft = false;
      } else if (key === 39) {
        cancelAnimationFrame(moveRight);
        moveRight = false;
      }
    }
  });




  let left = function () {
    if (gameOver === false && parseInt($(".rocketShip").css("left")) > 0) {
      $(".rocketShip").css("left", parseInt($(".rocketShip").css("left")) - 5);
      moveLeft = requestAnimationFrame(left);
    }
  };

  let right = function () {
    if (gameOver === false && parseInt($(".rocketShip").css("left")) > 0) {
      $(".rocketShip").css("left", parseInt($(".rocketShip").css("left")) + 5);
      moveRight = requestAnimationFrame(right);
    }
  };

});
