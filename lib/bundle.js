/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

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
  startButton = $j('#start-button');
  pauseButton = $j('#pause-button');
  gameOverButton = $j('#game-over');

  const focusOnGame = [canvas, startButton.nodes[0], pauseButton.nodes[0], gameOverButton.nodes[0]];
  document.addEventListener('keydown', function (e) {
    if (focusOnGame.includes(lastDownTarget)) {
      handleKeydown(e);
    }
  }, false);

  const handleKeydown = (e) => {
    if (e.key === 'ArrowDown') {
      rotate = false;
      if (dx < 0 || dy < 0) {
        dx = -dx;
        dy = -dy;
      }
    } else if (e.key === 'ArrowUp' && dx > 0 && !rotate) {
      dx = -dx;
      dy = -dy;
    }
  };

  canvas.addEventListener('keydown', handleKeydown);
  moreMenu = $j('#more-menu');
  $j('#show-more').on('click', () => moreMenu.attr('style', 'display: block;'));
  moreMenu.find('a').on('click', () => moreMenu.attr('style', 'display: none;'));

  if (canvas.getContext) {
    ctx = canvas.getContext('2d');

    magnet = new Image();
    magnet.src = '../images/magnet.png';
    magnet.addEventListener('load', startGame, false);
    
    bitcoin = new Image();
    bitcoin.value = Math.round(Math.random() * 100) + 100;
    bitcoin.slowdown = 4.5;
    bitcoin.name = 'bitcoin';
    bitcoin.src = '../images/bitcoin.png';
    
    tron = new Image();
    tron.slowdown = 2.5;
    tron.name = 'tron';
    tron.value = Math.round(Math.random() * 100) + 20;
    tron.src = '../images/tron.png';
    
    penny = new Image();
    penny.value = 0.01
    penny.slowdown = 1;
    penny.name = 'penny';
    penny.src = '../images/penny.png';

    startButton.on('click', () => {
      $j('#panel').attr('style', 'display: block;');
      $j('#pc').attr('style', 'display: block;');
      if (startButton.html() === 'Start') time = 1800;
      ctx.fillStyle = '#010014';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fill();
      pauseButton.attr('style', 'display: block;')
      $j('canvas').attr('style', "background: url('../images/moving_stars.gif') no-repeat; background-size: cover;");
      startButton.attr('style', 'display: none;');
      gameInterval = setInterval(play, 17);
    })
    
    pauseButton.on('click', () => {
      startButton.attr('style', 'display: block; left: 173px;').html('Unpause');
      pauseButton.attr('style', 'display: none;');
      clearInterval(gameInterval);
    });

    $j('#game-over').find('b').on('click', () => startGame())
    
    function startGame() {
      startButton.html('Start');
      $j('#game-over').attr('style', 'display: none; position: absolute;')
        .find('p').html('');
      round = 1;
      money = 0;
      points = [];
      rotate = true;
      forward = true;
      rotationDiff = 0;
      angle = 1;
      rotation = 130;
      x = 0;
      y = 0;
      translateX = canvas.width / 2;
      dy = 6;
      dx = 6;
      firstMove = true;
      maxReach = 225;
      collected = [];
      names = [];
      coins = defaultCoins.map( coin => new Coin(coin));
      startButton.attr('style', 'display: block;');
    }

    class Coin {
      constructor(image) {
        this.image = image;
        this.name = image.name;
        this.x = Math.random() * 500 + 50;
        this.y = Math.random() * 260 + 90;
        this.value = image.value;
        this.slowdown = image.slowdown;
      }
    }
    defaultCoins = [penny, tron, bitcoin];
    coinSet = [penny, tron, bitcoin];
    
    function play() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawmagnet();
      $j('#round').html(`Round: ${round}`);
      $j('#money').html(`Money: ${Math.round(money * 100)/100}`);
      $j('#time').html(`Time: ${Math.round((time--)/60)}`);
      if(time <= 0) {
        gameOver();
      }
      drawCoins(coins);
      advanceRound();
    }
    
    function advanceRound() {
      if(coins.length === 0 && rotate) {
        round += 1;
        time += 900;
        flashMessage(`Round ${round}!`);
        for(let i = 0; i <= round + 2; i++) {
          if (coinSet[i]) {
            coins.push(new Coin(coinSet[i]));
          } else {
            newCoin = defaultCoins[Math.round(Math.random() * 2)];
            coins.push(new Coin(newCoin));
          }
        }
      }
    }
    
    function drawmagnet() {
      if (rotate) {
        drawRotatingMagnet();
      } else {
        drawMovingMagnet();
      }
    }

    function flashMessage(message) {
      flash = $j('.flash-message');
      debugger
      if (Array.isArray(message)) {
        message.forEach( (mess, i) => {
          flash.html(mess);
          flash.attr('style', 'opacity: 1; top: -10px');
          setTimeout(
            () => flash.attr('style', 'opacity: 0; top: 0;'),
            1000 + i * 500
          );
        })
      } else {
        flash.html(message);
        flash.attr('style', 'opacity: 1; top: -10px');
        setTimeout(
          () => flash.attr('style', 'opacity: 0; top: 0;'),
          1000
        )
      }
    }
    
    function drawMovingMagnet() {
      if (y <= 0 && dy < 0) {
        rotate = true;
        while(collected.length > 0) {
          if (names.length > 1) {
            setTimeout(() => 
            {
              flashMessage(names.map(name => ('+' + name)));
              names = [];
            }, 300);
          } else {
            flashMessage('+' + names.pop());
          }
          money += collected.pop();
        }
        dx = 6;
        dy = 6;
        return;
      }

      const degrees = rotation - rotationDiff;
      if (degrees <= 90 && degrees >= 0) {
        maxReach = Math.abs(degrees - 45) + 210;
      } else if (degrees > 90) {
        maxReach = 250 - (degrees - 90) * 2;
      } else {
        maxReach = 250 + degrees * 2;
      }
      
      drawString();
      l = Math.sqrt(x * x + y * y);
      x2 = (translateX + l * Math.cos(angle + 0.785398));
      y2 = (50 + l * Math.sin(angle + 0.785398));
      points = [];
      for (let startRad = 0; startRad < 2 * Math.PI; startRad += Math.PI/10) {
        let x3 = x2 + 33 * Math.cos(startRad);
        let y3 = y2 + 33 * Math.sin(startRad);
        points.push([x3, y3]);
      }
      points.forEach( coord => {
        ctx.fillStyle = 'green';
        ctx.fillRect(coord[0] + Math.random() * 5, coord[1] + Math.random() * 5, 3, 3);
      });

      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      if (x + dx > maxReach || y + dy > maxReach) {
        dx = -dx;
        dy = -dy;
      } 
      ctx.translate(translateX, 50);
      ctx.rotate(angle);
      
      x += dx
      y += dy;

      ctx.drawImage(magnet, x, y);
      ctx.restore();
    }

    function drawRotatingMagnet() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      angle = (rotation - rotationDiff) * Math.PI / 180;
      ctx.translate(translateX, y + 50)
      ctx.rotate(angle);
      ctx.drawImage(magnet, 0, 0);
      ctx.restore();
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
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.translate(translateX, 50)
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.strokeStyle = 'white'
      ctx.moveTo(0, 0);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.restore();
    }

    function drawCoins() {
      for (let i = 0; i < coins.length; i++) {
        const coin = coins[i];
        
        for(let j = 0; j < points.length; j++) {
          const point = points[j];

          if (point[0] > coin.x && point[0] < coin.x + 20 && point[1] > coin.y && point[1] < coin.y + 20) {
            coins.splice(i, 1);
            i--;
            collected.push(coin.value);
            names.push(coin.name);
            if (dx > 0 && dy > 0) {
              dx = -dx / coin.slowdown;
              dy = -dy / coin.slowdown;
            }
            break;
          }
        }
        ctx.drawImage(coin.image, coin.x, coin.y, 20, 20)
      }
    }

    function gameOver() {
      clearInterval(gameInterval);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const roundsLasted = round > 1 ? round + ' rounds' : '1 round';
      const moneyCollected = Math.round(money * 100)/100; 
      $j('#game-over').attr('style', 'display: flex;')
        .find('p').html(`You lasted ${roundsLasted}<br> and collected $${moneyCollected}!`);
    }
    
  }
})


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map