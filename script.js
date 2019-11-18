let gameOver = true;
let moveLeft = false;
let moveRight = false;

// turning them into abbreviated variables so it's easier to write later on
let rH = $('.rocketHeight')
let rW = $('.rocketWidth')
let aH1 = $('.asteroidHeightOne')
let aH2 = $('.asteroidHeightTwo')
let aH3 = $('.asteroidHeightThree')
let aH4 = $('.asteroidHeightFour')
let aW1 = $('.asteroidWidthOne')
let aW2 = $('.asteroidWidthTwo')
let aW3 = $('.asteroidWidthThree')
let aW4 = $('.asteroidWidthFour')

// Getting the document ready
$(function () {
  // Sweet Alert to start the game
  Swal.fire({
    title: 'WELCOME!',
    html: "<p>While you are out on a <em> super secret and important </em> space mission, your friend challenges you to see how far you can travel through the asteroid belt without getting hit!!</p> <p> Use <strong> left </strong> and <strong> right </strong> arrows to dodge the asteroids.</p> <p> If you're using a touch screen: <strong> tap </strong> on the left or right side of the screen to move.</p>",
    confirmButtonColor: '#9b2323',
    confirmButtonText: "START",
    allowOutsideClick: false
  }).then(function (result) {
    if (result.value) {
      gameOver = false;
      document.getElementById("audio").play();
    }

    // [MOVE LEFT AND RIGHT WITH ARROW KEYS]
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

    // [MOVE LEFT AND RIGHT USING TOUCH]
    $(document).on('touchstart', function (e) {
      let gameWidth = $(".gameArea").width();
      let touchX = e.touches[0].clientX;
      if (gameOver === false) {
        if (touchX > gameWidth / 2 && moveLeft === false) {
          moveRight = requestAnimationFrame(right);
        } else if (moveRight === false) {
          moveLeft = requestAnimationFrame(left);
        }
      }
    });

    $(document).on('touchend', function (e) {
      let gameWidth = $(".gameArea").width();
      let touchesX = e.changedTouches[0].clientX;
      if (gameOver === false) {
        if (touchesX > gameWidth / 2) {
          cancelAnimationFrame(moveRight);
          moveRight = false;
        } else {
          cancelAnimationFrame(moveLeft);
          moveLeft = false;
        }
      }
    });

    // [LEFT AND RIGHT ANIMATION AND SPEED]
    let left = function () {
      //if the rocketArea is going left but over 0px, then it can keep moving left - 5px from its current position
      if (gameOver === false && parseInt($(".rocketArea").css("left")) > 10) {
        $(".rocketArea").css("left", parseInt($(".rocketArea").css("left")) - 5);
        moveLeft = requestAnimationFrame(left);

      } // left movement will speed up after certain km reached
      if (totalKm >= 160) {
        $(".rocketArea").css("left", parseInt($(".rocketArea").css("left")) - 4);
      } else if (totalKm >= 80) {
        $(".rocketArea").css("left", parseInt($(".rocketArea").css("left")) - 2);
      }
    };

    let right = function () {
      //if the rocketArea is going right but under 350px, then it can keep moving right + 5px from its current position
      if (gameOver === false && parseInt($(".rocketArea").css("left")) < parseInt($(".gameArea").css("width")) - 25) {
        $(".rocketArea").css("left", parseInt($(".rocketArea").css("left")) + 5);
        moveRight = requestAnimationFrame(right);
      } // right movement will speed up after certain km reached
      if (totalKm >= 160) {
        $(".rocketArea").css("left", parseInt($(".rocketArea").css("left")) + 4);
      } else if (totalKm >= 80) {
        $(".rocketArea").css("left", parseInt($(".rocketArea").css("left")) + 2);
      }
    };

    // [SCORE/KM COUNTER]
    // Mine is set at 8km per second - Space Shuttles must reach a speed of around 28,000km per hour to remain in orbit which is around 8km per second :)
    // https://www.nasa.gov/centers/kennedy/about/information/shuttle_faq.html
    let totalKm = 0;
    let timer = setInterval(countScore, 80);

    function countScore() {
      totalKm++;
      document.getElementById("scoreCounter").innerHTML = totalKm - 1;
      if (gameOver === true) {
        clearInterval(timer);
      }
    }
    countScore();

    // [FUNCTION THAT STOPS THE ANIMATIONS]
    function gameEnds() {
      gameOver = true;
      cancelAnimationFrame(keepFalling);
      cancelAnimationFrame(moveRight);
      cancelAnimationFrame(moveLeft);
    }

    // [ANIMATION REPEATING, COLLISION DETECTION, AND GAME OVER SWEET ALERT]
    keepFalling = requestAnimationFrame(repeat);

    function repeat() {
      if (gameOver === false) {
        // if rocket height/width hits any of the meteor heights/widths then game over
        if (collision(rH, aH1) || collision(rH, aH2) || collision(rH, aH3) || collision(rH, aH4) || collision(rH, aW1) || collision(rH, aW2) || collision(rH, aW3) || collision(rH, aW4) || collision(rW, aH1) || collision(rW, aH2) || collision(rW, aH3) || collision(rW, aH4) || collision(rW, aW1) || collision(rW, aW2) || collision(rW, aW3) || collision(rW, aW4)) {
          document.getElementById("audio").pause();
          document.getElementById("audioCrash").play();
          Swal.fire({
            title: 'OH NO YOU CRASHED!',
            text: 'You managed to travel ' + totalKm + ' km. Do you want to try again to see if you can go further?',
            confirmButtonColor: '#9b2323',
            confirmButtonText: 'PLAY AGAIN',
            allowOutsideClick: false,
          }).then(function (result) {
            if (result.value) {
              location.reload(true);
            }
          })
          gameEnds();
        }
        requestAnimationFrame(repeat);
      }
      starFalling($('.starOne'));
      starFalling($('.starTwo'));
      starFalling($('.starThree'));
      starFalling($('.starFour'));

      asteroidFalling($('.asteroidAreaOne'));
      asteroidFalling($('.asteroidAreaTwo'));
      asteroidFalling($('.asteroidAreaThree'));
      asteroidFalling($('.asteroidAreaFour'));
    };

    // [ASTEROID ANIMATIONS]
    // speeds up every 10 seconds
    function asteroidFalling(asteroid) {
      let topOfArea = parseInt(asteroid.css('top'));
      if (topOfArea > parseInt($('.gameArea').css('height'))) {
        topOfArea = -150;
        let randomPosition = parseInt(Math.random() * 360);
        asteroid.css('left', randomPosition);
      }
      asteroid.css('top', topOfArea + 4);

      if (totalKm >= 400) {
        asteroid.css('top', topOfArea + 10);
      } else if (totalKm >= 320) {
        asteroid.css('top', topOfArea + 8);
      } else if (totalKm >= 240) {
        asteroid.css('top', topOfArea + 7);
      } else if (totalKm >= 160) {
        asteroid.css('top', topOfArea + 6);
      } else if (totalKm >= 80) {
        asteroid.css('top', topOfArea + 5);
      }
    }

    // [STAR ANIMATIONS]
    // speeds up every 10 seconds
    function starFalling(star) {
      let topOfAreaStar = parseInt(star.css('top'));
      if (topOfAreaStar > parseInt($('.gameArea').css('height'))) {
        topOfAreaStar = -100;
        let randomPositionStar = parseInt(Math.random() * 350);
        star.css('left', randomPositionStar);
      }
      star.css('top', topOfAreaStar + 10);

      if (totalKm >= 400) {
        star.css('top', topOfAreaStar + 20);
      } else if (totalKm >= 320) {
        star.css('top', topOfAreaStar + 16);
      } else if (totalKm >= 240) {
        star.css('top', topOfAreaStar + 13);
      } else if (totalKm >= 80) {
        star.css('top', topOfAreaStar + 11);
      }
    }

    // [COLLISION FUNCTION CODE] from https://gist.github.com/jaxxreal/7527349 :)
    // if div1 hits div2 then perform all these actions
    function collision($div1, $div2) {
      let x1 = $div1.offset().left;
      let y1 = $div1.offset().top;
      let h1 = $div1.outerHeight(true);
      let w1 = $div1.outerWidth(true);
      let b1 = y1 + h1;
      let r1 = x1 + w1;
      let x2 = $div2.offset().left;
      let y2 = $div2.offset().top;
      let h2 = $div2.outerHeight(true);
      let w2 = $div2.outerWidth(true);
      let b2 = y2 + h2;
      let r2 = x2 + w2;

      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
      return true;
    }
  });
});

// Music: Eric Skiff - Song Name - Chibi Ninja - Available at http://EricSkiff.com/music
// Game over sound effect: https://bassgorilla.com/video-game-sound-effects/
// shoutout to https://developer.mozilla.org/en-US/docs/Web/JavaScript helped me with majority of my code ha ha ha