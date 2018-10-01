window.addEventListener('keydown', function (e) {
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
}, false);

let lastDownTarget;

document.addEventListener('mousedown', function (e) {
  lastDownTarget = e.target;
}, false);

document.addEventListener('DOMContentLoaded', () => {
  const canvas = $j('#game-frame').nodes[0];
  document.addEventListener('keydown', function (e) {
    if (lastDownTarget == canvas) {
      handleKeydown(e);
    }
  }, false);
  const handleKeydown = (e) => {
    if (e.key === 'ArrowDown') {
      rotate = false;
    } else if (e.key === 'ArrowUp') {
      rotate = true;
    }
  };
  canvas.addEventListener('keydown', handleKeydown);
  if (canvas.getContext) {
    context = canvas.getContext('2d');

    magnet = new Image();
    magnet.src = '../images/magnet.png';
    magnet.addEventListener('load', clawLoaded, false);
    
    
    function clawLoaded() {
      $j('#start-button').attr('style', 'display: block;').on('click', () => {
        context.fillStyle = '#010014';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fill();
        $j('canvas').attr('style', "background: url('../images/moving_stars.gif') no-repeat; background-size: cover;");
        $j('#start-button').attr('style', 'display: none;');
        $j('#pause-button').attr('style', 'display: block;').on('click', () => {
          $j('#start-button').attr('style', 'display: block; left: 173px;').html('Unpause');
          $j('#pause-button').attr('style', 'display: none;');
          clearInterval(gameInterval);
        });
        gameInterval = setInterval(game, 17);
      })
    }
    function game() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      // coins = [];
      drawClaw();
      // drawCoins(coins);
    }
    
    rotate = true;
    forward = true;
    rotationDiff = 0;
    let angle;
    const rotation = 130;
    x = 0;
    y = 0;
    translateX = canvas.width / 2 + magnet.width / 2;
    dy = 6;
    dx = 6;
    firstMove = true;
    maxReach = 225;

    function drawClaw() {
      if (rotate) {
        drawRotatingClaw();
      } else {
        drawMovingClaw();
      }
    }
    
    function drawMovingClaw() {
      const degrees = rotation - rotationDiff;
      if (degrees <= 90 && degrees >= 0) {
        maxReach = Math.abs(degrees - 45) + 200;
      } else if (degrees > 90) {
        maxReach = 245 - (degrees - 90) * 2;
      } else {
        maxReach = 245 + degrees * 2;
      }
      
      if (y <= 0 && dy < 0) {
        rotate = true;
        dx = -dx;
        dy = -dy;
        return;
      }
      drawString();
      l = Math.sqrt(x * x + y * y);
      console.log(angle, l + translateX, Math.cos(angle + 0.785398))
      x2 = (translateX + l * Math.cos(angle + 0.785398));
      y2 = (50 + l * Math.sin(angle + 0.785398));
      points = [];
      for (let startRad = 0; startRad < 2 * Math.PI; startRad += Math.PI/10) {
        let x3 = x2 + 33 * Math.cos(startRad);
        let y3 = y2 + 33 * Math.sin(startRad);
        points.push([x3, y3]);
      }
      console.log(points)
      points.forEach( coord => {
        context.fillStyle = 'green';
        context.fillRect(coord[0], coord[1], 3, 3);
      });
      // context.beginPath();
      // context.arc(x2, y2, 45, 0, 2 * Math.PI);
      // context.fill();

      context.save();
      context.setTransform(1, 0, 0, 1, 0, 0);
      if (x + dx > maxReach || y + dy > maxReach) {
        dx = -dx;
        dy = -dy;
      } 
      context.translate(translateX, 50);
      context.rotate(angle);
      
      x += dx
      y += dy;

      context.drawImage(magnet, x, y);
      context.restore();
    }

    function drawRotatingClaw() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.save();
      context.setTransform(1, 0, 0, 1, 0, 0)
      angle = (rotation - rotationDiff) * Math.PI / 180;
      context.translate(translateX, y + 50)
      context.rotate(angle);
      context.drawImage(magnet, 0, 0);
      context.restore();
      if (forward) {
        rotationDiff++;
        if (rotationDiff === 175) {
          forward = false;
          rotationDiff--;
        }
      } else {
        rotationDiff--;
        if(rotationDiff < 0) {
          forward = true;
          rotationDiff++;
        }
      }
    }


    function drawString() {
      context.save();
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.translate(translateX, 50)
      context.rotate(angle);
      context.beginPath();
      context.strokeStyle = 'white'
      context.moveTo(0, 0);
      context.lineTo(x, y);
      context.stroke();
      context.restore();
    }
    
  }
})
