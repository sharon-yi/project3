  let gameOver = true; // setting my gameover to be true 
  let moveLeft = false;
  let moveRight = false;
  let rh = $('.rocketHeight')
  let rw = $('.rocketWidth')
  let ma1 = $('.asteroidAreaOne')
  let ma2 = $('.asteroidAreaTwo')
  let ma3 = $('.asteroidAreaThree')
  let ma4 = $('.asteroidAreaFour')
  let mh1 = $('.asteroidHeightOne')
  let mh2 = $('.asteroidHeightTwo')
  let mh3 = $('.asteroidHeightThree')
  let mh4 = $('.asteroidHeightFour')
  let mw1 = $('.asteroidWidthOne')
  let mw2 = $('.asteroidWidthTwo')
  let mw3 = $('.asteroidWidthThree')
  let mw4 = $('.asteroidWidthFour')

  $(function () { // getting document ready

    Swal.fire({ //alert for game start 
      title: 'WELCOME!',
      text: 'While you and your friend are out on a super secret and important space mission, your friend challenges you to see how far you can travel through the asteroid belt without getting hit! Use left and right arrows to dodge the asteroids',
      confirmButtonColor: '#9b2323',
      confirmButtonText: "LET'S GO",
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        gameOver = false;
        document.getElementById("audio").play();
      }

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

      //SCORE COUNTER
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

      //TOUCH EVENTS

      $(document).on('touchstart', function (e) {
        let gameWidth = $(".gameArea").width();
        let touchX = e.touches[0].clientX;
        if (touchX > gameWidth / 2 && moveLeft === false) {
          moveRight = requestAnimationFrame(right);
        } else if (moveRight === false) {
          moveLeft = requestAnimationFrame(left);
        }
      });

      $(document).on('touchend', function (e) {
        let gameWidth = $(".gameArea").width();

        let touchesX = e.changedTouches[0].clientX;
        if (touchesX > gameWidth / 2) {
          cancelAnimationFrame(moveRight);
          moveRight = false;
        } else {
          cancelAnimationFrame(moveLeft);
          moveLeft = false;
        }
      });



      let left = function () {
        //if the rocketArea is going left but over 0px, then it can keep moving left - 5px from its current position
        if (gameOver === false && parseInt($(".rocketArea").css("left")) > 10) {
          $(".rocketArea").css("left", parseInt($(".rocketArea").css("left")) - 5);
          moveLeft = requestAnimationFrame(left);
        }
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
        }
        if (totalKm >= 160) {
          $(".rocketArea").css("left", parseInt($(".rocketArea").css("left")) + 4);
        } else if (totalKm >= 80) {
          $(".rocketArea").css("left", parseInt($(".rocketArea").css("left")) + 2);
        }
      };





      function gameEnds() {
        gameOver = true;
        cancelAnimationFrame(keepFalling);
        cancelAnimationFrame(moveRight);
        cancelAnimationFrame(moveLeft);
      }

      //a request animation frame idek

      keepFalling = requestAnimationFrame(repeat);

      function repeat() {
        if (gameOver === false) {
          if (collision(rh, mh1) || collision(rh, mh2) || collision(rh, mh3) || collision(rh, mh4) || collision(rh, mw1) || collision(rh, mw2) || collision(rh, mw3) || collision(rh, mw4) || collision(rw, mh1) || collision(rw, mh2) || collision(rw, mh3) || collision(rw, mh4) || collision(rw, mw1) || collision(rw, mw2) || collision(rw, mw3) || collision(rw, mw4)) {
            Swal.fire({
              title: 'OH NO YOU CRASHED!',
              icon: 'warning',
              iconHtml: '💥',
              text: 'You managed to travel ' + totalKm + ' km before you crashed! Want to try again?',
              confirmButtonColor: '#9b2323',
              confirmButtonText: 'PLAY AGAIN',
              allowOutsideClick: false,
            }).then((result) => {
              if (result.value) {
                location.reload(true);
              }
            })
            gameEnds();
          }
          requestAnimationFrame(repeat);
        }
        starFalling($('.star1'));
        starFalling($('.star2'));
        starFalling($('.star3'));
        starFalling($('.star4'));

        asteroidFalling($('.asteroidAreaOne'));
        asteroidFalling($('.asteroidAreaTwo'));
        asteroidFalling($('.asteroidAreaThree'));
        asteroidFalling($('.asteroidAreaFour'));
      };

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

      function starFalling(star) {
        let topOfAreaStar = parseInt(star.css('top'));
        if (topOfAreaStar > parseInt($('.gameArea').css('height'))) {
          topOfAreaStar = 0;
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
  // shoutout to https://developer.mozilla.org/en-US/docs/Web/JavaScript helped me with majority of my code
