$(function () {
  let gameOver = false;
  let moveLeft = false;
  let moveRight = false;

  let rh = $('.rocketHeight')
  let rw = $('.rocketWidth')
  let ma1 = $('.ma1')
  let ma2 = $('.ma2')
  let ma3 = $('.ma3')
  let ma4 = $('.ma4')
  let mh1 = $('.mh1')
  let mh2 = $('.mh2')
  let mh3 = $('.mh3')
  let mh4 = $('.mh4')
  let mw1 = $('.mw1')
  let mw2 = $('.mw2')
  let mw3 = $('.mw3')
  let mw4 = $('.mw4')


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
    if (gameOver === false && parseInt($(".rocketArea").css("left")) > 10) {
      $(".rocketArea").css("left", parseInt($(".rocketArea").css("left")) - 5);
      moveLeft = requestAnimationFrame(left);
    }
    if (totalSeconds >= 60) {
      $(".rocketArea").css("left", parseInt($(".rocketArea").css("left")) - 12);
    } else if (totalSeconds >= 30) {
      $(".rocketArea").css("left", parseInt($(".rocketArea").css("left")) - 6.5);
    } else if (totalSeconds >= 10) {
      $(".rocketArea").css("left", parseInt($(".rocketArea").css("left")) - 5.5);
    }
  };

  let right = function () {
    //if the rocketArea is going right but under 350px, then it can keep moving right + 5px from its current position
    if (gameOver === false && parseInt($(".rocketArea").css("left")) < 370) {
      $(".rocketArea").css("left", parseInt($(".rocketArea").css("left")) + 5);
      moveRight = requestAnimationFrame(right);
    }
    if (totalSeconds >= 60) {
      $(".rocketArea").css("left", parseInt($(".rocketArea").css("left")) + 12);
    } else if (totalSeconds >= 30) {
      $(".rocketArea").css("left", parseInt($(".rocketArea").css("left")) + 6.5);
    } else if (totalSeconds >= 10) {
      $(".rocketArea").css("left", parseInt($(".rocketArea").css("left")) + 5.5);
    }
  };

  function gameEnds() {
    gameOver = true;
    requestAnimationFrame(keepFalling) = false;
    cancelAnimationFrame(moveRight);
    cancelAnimationFrame(moveLeft);

  }
  //a request animation frame idek

  keepFalling = requestAnimationFrame(repeat);

  function repeat() {
    if (gameOver === false) {
      if (collision(rh, mh1) || collision(rh, mh2) || collision(rh, mh3) || collision(rh, mh4) || collision(rh, mw1) || collision(rh, mw2) || collision(rh, mw3) || collision(rh, mw4) || collision(rw, mh1) || collision(rw, mh2) || collision(rw, mh3) || collision(rw, mh4) || collision(rw, mw1) || collision(rw, mw2) || collision(rw, mw3) || collision(rw, mw4)) {
        Swal.fire({
          title: 'You lost!',
          text: "Try again to beat it wah",
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OKAY',
          allowOutsideClick: false
        }).then((result) => {
          if (result.value) {
            location.reload(true);
          }
        })
        gameEnds();
      }
    }
    starFalling($('.star1'));
    starFalling($('.star2'));
    starFalling($('.star3'));
    starFalling($('.star4'));

    meteorFalling($('.ma1'));
    meteorFalling($('.ma2'));
    meteorFalling($('.ma3'));
    meteorFalling($('.ma4'));

    requestAnimationFrame(repeat);
  };

  function meteorFalling(meteor) {
    let topOfArea = parseInt(meteor.css('top'));
    if (topOfArea > parseInt($('.gameArea').css('height'))) {
      topOfArea = -100;
      let randomPosition = parseInt(Math.random() * 360);
      meteor.css('left', randomPosition);
    }
    meteor.css('top', topOfArea + 4);

    if (totalSeconds >= 60) {
      meteor.css('top', topOfArea + 15);
    } else if (totalSeconds >= 40) {
      meteor.css('top', topOfArea + 10);
    } else if (totalSeconds >= 30) {
      meteor.css('top', topOfArea + 8);
    } else if (totalSeconds >= 20) {
      meteor.css('top', topOfArea + 6);
    } else if (totalSeconds >= 10) {
      meteor.css('top', topOfArea + 5);
    }
  }

  function starFalling(star) {
    let topOfAreaStar = parseInt(star.css('top'));
    if (topOfAreaStar > parseInt($('.gameArea').css('height'))) {
      topOfAreaStar = 0;
      let randomPositionStar = parseInt(Math.random() * 350);
      star.css('left', randomPositionStar);
    }
    star.css('top', topOfAreaStar + 10);

    if (totalSeconds >= 60) {
      star.css('top', topOfAreaStar + 20);
    } else if (totalSeconds >= 40) {
      star.css('top', topOfAreaStar + 16);
    } else if (totalSeconds >= 30) {
      star.css('top', topOfAreaStar + 13);
    } else if (totalSeconds >= 20) {
      star.css('top', topOfAreaStar + 11);
    }
  }

  let totalSeconds = 0;
  setInterval(setTime, 1000);

  function setTime() {
    ++totalSeconds;
    console.log(totalSeconds)
  }




  //FIGURE OUT THE SCORE COUNTERRRRRR

  // function counter() {
  //   var i = 0;
  //   var funcNameHere = function () {
  //     if (i == 100) clearInterval(this);
  //     else console.log('Currently at ' + (i++));
  //   };
  //   // This block will be executed 100 times.
  //   setInterval(funcNameHere, 7000);
  //   funcNameHere();


  //   var amount = document.getElementById('scoreCounter');
  //   var current = 0;

  //   setInterval(function () {
  //     current += 5;
  //   }, 1000);
  //   console.log(setInterval());



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