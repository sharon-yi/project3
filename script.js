$(function () {
  let gameOver = false;
  let moveLeft = false;
  let moveRight = false;

  //MOVING LEFT AND RIGHT STARTS
  $(document).on('keydown', function (e) {
    if (gameOver === false) {
      let key = e.keyCode;
      if (key === 37 && moveLeft === false) {
        moveLeft = requestAnimationFrame(left);
      } else if (key === 39 && moveRight === false) {
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
  //MOVING LEFT AND RIGHT ENDS



  let left = function () {
    //if the rocketArea is going left but over 0px, then it can keep moving left - 5px from its current position
    if (gameOver === false && parseInt($(".rocketArea").css("left")) > 0) {
      $(".rocketArea").css("left", parseInt($(".rocketArea").css("left")) - 5);
      moveLeft = requestAnimationFrame(left);
    }
  };

  let right = function () {
    //if the rocketArea is going right but under 350px, then it can keep moving right + 5px from its current position
    if (gameOver === false && parseInt($(".rocketArea").css("left")) < 320) {
      $(".rocketArea").css("left", parseInt($(".rocketArea").css("left")) + 5);
      moveRight = requestAnimationFrame(right);
    }
  };


  //a request animation frame idek
  let keepFalling = requestAnimationFrame(repeat);

  function repeat() {
    if (gameOver === false) {

      if (collision($('.rocketArea'), $('.meteorOne')) || collision($('.rocketArea'), $('.meteorTwo')) || collision($('.rocketArea'), $('.meteorThree')) || collision($('.rocketArea'), $('.meteorFour'))) {
        alert('you lose!');
        location.reload(true);
      }

      meteorFalling($('.meteorOne'));
      meteorFalling($('.meteorTwo'));
      meteorFalling($('.meteorThree'));
      meteorFalling($('.meteorFour'));


      requestAnimationFrame(repeat);
    }
  }


  function meteorFalling(meteor) {
    let topOfArea = parseInt(meteor.css('top'));
    if (topOfArea > parseInt($('.gameArea').css('height'))) {
      topOfArea = -100;
      let randomPosition = parseInt(Math.random() * 320);
      meteor.css('left', randomPosition);
    }
    meteor.css('top', topOfArea + 2);
  }







  // COLLISION CODE from https://gist.github.com/jaxxreal/7527349

  function collision($div1, $div2) {
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
  }


});