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
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/game/coin.js":
/*!**************************!*\
  !*** ./lib/game/coin.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Coin {
  constructor(image, i, game) {
    this.image = image;
    this.name = image.name;
    this.x = Math.random() * 500 + 50;
    this.y = Math.random() * 260 + 90;
    this.value = this.calcValue(image);
    this.slowdown = image.slowdown;
    this.collected = false;
    this.index = i;
    this.here = true;
    this.game = game;
    this.stagger = this.index % 2 ? (this.index % 3 + 1) * 1.5 : (this.index % 3 + 1) * -1.5;
  }

  calcValue(image) {
    return Math.round(Math.random() * image.multiplier) + image.baseValue;
  }

  collect() {
    this.x = this.game.x2 - this.stagger;
    this.y = this.game.y2 - this.stagger * .8;
    if (this.here && this.y < 95 && this.x > 235 && this.x < 345) {
      this.here = false;
      return this.game.coins[this.index] = undefined;
    }
  }

  handleCollection(point) {
    if (point[0] + 4 > this.x && point[0] < this.x + 24 &&
      point[1] + 4 > this.y && point[1] < this.y + 24) {
      this.collect();
      this.collected = true;
      return true;
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Coin);

/***/ }),

/***/ "./lib/game/crypto_miner.js":
/*!**********************************!*\
  !*** ./lib/game/crypto_miner.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _coin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./coin */ "./lib/game/coin.js");
/* harmony import */ var _music__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./music */ "./lib/game/music.js");
/* harmony import */ var _images__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./images */ "./lib/game/images.js");
/* harmony import */ var _magnet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./magnet */ "./lib/game/magnet.js");





class CryptoMiner {
  constructor(ctx, canvas) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.defaultCoins = [_images__WEBPACK_IMPORTED_MODULE_2__["default"].penny, _images__WEBPACK_IMPORTED_MODULE_2__["default"].tron, _images__WEBPACK_IMPORTED_MODULE_2__["default"].bitcoin];
    this.round = 1;
    this.money = 0;
    this.time = 1800;
    this.collected = [];
    this.names = [];
    this.coins = this.defaultCoins.map((coin, i) => new _coin__WEBPACK_IMPORTED_MODULE_0__["default"](coin, i, this));
    this.x2;
    this.y2;
    this.l;
    this.gameInterval;
    this.magnet = new _magnet__WEBPACK_IMPORTED_MODULE_3__["default"](ctx, canvas, this);
    this.music = new _music__WEBPACK_IMPORTED_MODULE_1__["default"]('./assets/audio/slowmotion.mp3');
    this.pause = false;
  }

  play() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.magnet.drawmagnet();
    this.playMusic();
    this.setScoreboard();
    this.checkGameover();
  }
  
  playMusic() {
    if (this.ctx.playMusic) {
      this.music.play();
    } else {
      this.music.pause();
    }
  }

  checkGameover() {
    if (this.time <= 0) {
      this.gameOver();
    } else {
      this.drawCoins(this.coins);
      this.advanceRound();
    }
  }

  setScoreboard(reset) {
    if (reset) {
      $j('#round').empty();
      $j('#money').empty();
      $j('#time').empty();
    } else {
      $j('#round').html(`Round: ${this.round}`);
      $j('#money').html(`Money: ${Math.round(this.money * 100) / 100}`);
      $j('#time').html(`Time: ${Math.round((this.time--) / 60)}`);
    }
  }

  advanceRound() {
    if (this.coins.every(coin => coin === undefined) && this.magnet.rotate) {
      this.round += 1;
      this.time += 960;
      this.coins = [];
      this.flashMessage(`Round ${this.round}!`);
      for (let i = 0; i <= this.round + 2; i++) {
        if (this.defaultCoins[i]) {
          this.coins.push(new _coin__WEBPACK_IMPORTED_MODULE_0__["default"](this.defaultCoins[i], i, this));
        } else {
          if (i % 7 === 0) {
            const newCoin = this.defaultCoins[2];
            this.coins.push(new _coin__WEBPACK_IMPORTED_MODULE_0__["default"](newCoin, i, this));
          } else {
            const newCoin = this.defaultCoins[i % 3];
            this.coins.push(new _coin__WEBPACK_IMPORTED_MODULE_0__["default"](newCoin, i, this));
          }
        }
      }
    }
  }

  flashMessage(message) {
    const flash = $j('.flash-message');
    if (Array.isArray(message)) {
      message.forEach((mess, i) => {
        flash.html(mess);
        flash.attr('style', 'opacity: 1; top: 0px');
        setTimeout(
          () => flash.attr('style', 'opacity: 0; top: 20px;'),
          1000 + i * 500
        );
      })
    } else {
      flash.html(message);
      flash.attr('style', 'opacity: 1; top: 0px');
      setTimeout(
        () => {
          flash.attr('style', 'opacity: 0; top: 20px;');
        },
        1000
      )
    }
  }

  handleKeypress(key) {
    if (!this.pause) this.magnet.handleKeypress(key);
  }

  drawCoins() {
    for (let i = 0; i < this.coins.length; i++) {
      const coin = this.coins[i];
      if (coin === undefined) continue;
      if (coin.collected) {
        coin.collect();
        this.ctx.drawImage(coin.image, coin.x, coin.y, 40, 40)
        continue;
      }

      for (let j = 0; j < this.magnet.points.length; j++) {
        const point = this.magnet.points[j];
        if (coin.handleCollection(point)) {
          this.collected.push(coin.value);
          this.names.push(coin.name);
          this.magnet.slowdown(coin.slowdown);
          break;
        }
      }
      this.ctx.drawImage(coin.image, coin.x, coin.y, 40, 40)
    }
  }

  startGame() {
    const startButton = $j('#start-button');
    startButton.html('Start');
    $j('#game-over').attr('style', 'display: none; position: absolute;')
      .find('p').html('');
    $j('#score-input').attr('style', 'display: none;');
    startButton.attr('style', 'display: block;');
  }

  gameOver() {
    clearInterval(this.gameInterval);
    this.clearCanvas();
    this.showScoreInput();
    this.showScore();
  }
  
  showScore() {
    const roundsLasted = this.round > 1 ? this.round + ' rounds' : '1 round';
    const moneyCollected = Math.round(this.money * 100) / 100;
    $j('#game-over').attr('style', 'display: flex;')
    .find('p').html(`You lasted ${roundsLasted}<br> and collected $${moneyCollected}!`);
  }
  
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    $j('#pc').attr('style', 'display: none;');
    $j('#pause-button').attr('style', 'display: none;')
    this.music.pause();
    this.ctx.cryptoMiner.setScoreboard(true);
    $j('canvas').attr('style', "background: url('./assets/images/sparkling_stars.gif') no-repeat; background-size: cover;");
  }
  
  showScoreInput() {
    $j('#score-input').attr('style', 'display: block;');
    $j('input').val();
    $j('#enter-score').attr('style', 'display: block;');
  }

  resetSelf() {
    this.ctx.cryptoMiner = new CryptoMiner(this.ctx, this.canvas);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (CryptoMiner);

/***/ }),

/***/ "./lib/game/default_listener.js":
/*!**************************************!*\
  !*** ./lib/game/default_listener.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const defaultListener = () => {
  window.addEventListener('keydown', (e) => {
    if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  }, false);
};

/* harmony default export */ __webpack_exports__["default"] = (defaultListener);

/***/ }),

/***/ "./lib/game/game.js":
/*!**************************!*\
  !*** ./lib/game/game.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return game; });
/* harmony import */ var _coin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./coin */ "./lib/game/coin.js");
/* harmony import */ var _default_listener__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./default_listener */ "./lib/game/default_listener.js");
/* harmony import */ var _crypto_miner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./crypto_miner */ "./lib/game/crypto_miner.js");
/* harmony import */ var _highscores__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./highscores */ "./lib/game/highscores.js");





function game() {
  Object(_default_listener__WEBPACK_IMPORTED_MODULE_1__["default"])();

  const canvas = $j('#game-frame').nodes[0];
  const startButton = $j('#start-button');
  const pauseButton = $j('#pause-button');
  const gameOverButton = $j('#game-over');
  const muteButton = $j('#mute');
  let lastDownTarget;
  
  const moreMenu = $j('#more-menu');
  $j('#show-more').on('click', () => moreMenu.attr('style', 'display: block;'));
  moreMenu.find('a').on('click', () => moreMenu.attr('style', 'display: none;'));

  const highscores = new _highscores__WEBPACK_IMPORTED_MODULE_3__["default"]();
  
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    ctx.cryptoMiner = new _crypto_miner__WEBPACK_IMPORTED_MODULE_2__["default"](ctx, canvas);
    ctx.cryptoMiner.startGame();
    ctx.playMusic = true;

    const pauseGame = () => {
      startButton.attr('style', 'display: block; left: 173px;').html('Unpause');
      pauseButton.attr('style', 'display: none;');
      ctx.cryptoMiner.music.pause();
      ctx.cryptoMiner.pause = true;
      clearInterval(ctx.cryptoMiner.gameInterval);
    }

    const handleKeydown = (e) => {
      ctx.cryptoMiner.handleKeypress(e.key);
    };
    
    const focusOnGame = [canvas, startButton.nodes[0], pauseButton.nodes[0], gameOverButton.nodes[0], muteButton.nodes[0], muteButton.children().nodes[0]];
    document.addEventListener('keydown', (e) => {
      if (focusOnGame.includes(lastDownTarget)) {
        handleKeydown(e);
      }
    }, false);

    document.addEventListener('mousedown', (e) => {
      lastDownTarget = e.target;
      if (!focusOnGame.includes(lastDownTarget) && startButton.attr('style') !== 'display: block;') pauseGame();
    }, false);

    const startGame = () => {
      $j('#panel').attr('style', 'display: block;');
      $j('#pc').attr('style', 'display: block;');
      ctx.fillStyle = '#010014';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fill();
      pauseButton.attr('style', 'display: block;')
      $j('canvas').attr('style', "background: url('./assets/images/moving_stars.gif') no-repeat; background-size: cover;");
      startButton.attr('style', 'display: none;');
      ctx.cryptoMiner.pause = false;
      ctx.cryptoMiner.gameInterval = setInterval(() => ctx.cryptoMiner.play(), 17);
    };
    
    startButton.on('click', startGame);

    pauseButton.on('click', pauseGame);

    document.addEventListener('keypress', (e) => {
      if (e.key === 'p' && ctx.cryptoMiner.gameInterval) {
        if (ctx.cryptoMiner.pause) {
          startGame();
        } else {
          pauseGame();
        }
      } else if (e.key === 'm') {
        ctx.playMusic = !ctx.playMusic;
      }
    });

    $j('#mute').on('click', () => {
      ctx.playMusic = !ctx.playMusic;
    });

    const saveScore = (money, round) => {
      const newScore = {};
      newScore.name = document.getElementById("input").value.toUpperCase();
      if (newScore.name.length === 0) newScore.name = '???'
      newScore.money = Math.round(money * 100) / 100;
      newScore.round = round;
      firebase.database().ref('scores/').push(newScore);
    };

    $j('#game-over').find('b').on('click', () => {
      ctx.cryptoMiner.resetSelf();
      ctx.cryptoMiner.startGame();
    });
    $j('#score-input').on('submit', (e) => {
      e.preventDefault();
      saveScore(ctx.cryptoMiner.money, ctx.cryptoMiner.round);
      ctx.cryptoMiner.resetSelf();
      ctx.cryptoMiner.startGame();
    });
    $j('#game-over').find('b').on('mouseover', () => {
      $j('#game-over').find('b').html('RESTART');
    });
    $j('#game-over').find('b').on('mouseout', () => {
      $j('#game-over').find('b').html('GAME OVER');
    });
  }
}

/***/ }),

/***/ "./lib/game/highscores.js":
/*!********************************!*\
  !*** ./lib/game/highscores.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Highscores {
  constructor() {
    this.highscoresHTML = $j('#highscores');
    this.highScoresFromDB = [];
    this.highscoreToggle = this.highscoreToggle.bind(this);
    this.addListenerOnButton();
    this.getScores = this.fetchScores();
    this.makeHighscoresList();
    this.updateScore = this.updateScore.bind(this);
    this.addListenerOnFetch();
    setTimeout(this.updateScore, 3000);
  }

  highscoreToggle() {
    if (this.highscoresHTML.attr('style') === 'display: block;') {
      this.highscoresHTML.attr('style', 'display: none;')
    } else {
      this.highscoresHTML.attr('style', 'display: block;')
    }
  }

  addListenerOnButton() {
    $j('#highscore-button').on('click', this.highscoreToggle);
  }

  fetchScores() {
    return firebase.database().ref('scores/')
      .orderByChild("round").limitToLast(5);
  }

  makeHighscoresList(newScore) {
    if (!this.highscoresHTML) return;
    this.highscoresHTML.html('<h3>High Scores</h3 >');

    if (newScore) this.highScoresFromDB.push(newScore);

    this.sortByRoundAndMoney();
    
    for (let i = 0; i < 5; i++) {
      const score = this.highScoresFromDB[i];
      if (!score) break;
      this.highscoresHTML.html(
        this.highscoresHTML.html() + 
        `<li><div class='score' ><h4><i class="fas fa-star shiny"></i>${i + 1}. ` + 
        score[1]
      );
    }
  };

  sortByRoundAndMoney() {
    this.highScoresFromDB = this.sortByMoney(this.sortByRound());
    this.keepOnlyFiveHighscores();
  }

  sortByRound() {
    const sortedByRound = {};
    const scores = this.highScoresFromDB;
    if (!scores.length) return false;

    for (let i = 0; i < scores.length; i++) {
      const score = scores[i];
      if (!sortedByRound[score[0]]) sortedByRound[score[0]] = [];
      sortedByRound[score[0]].push(score);
    }
    
    return sortedByRound;
  }

  sortByMoney(sortedByRounds) {
    let sorted = [];
    if (!sortedByRounds) return [];
    const rounds = Object.keys(sortedByRounds).sort().reverse();

    for (let i = 0; i < rounds.length; i++) {
      if (sorted.length >= 5) break;
      sortedByRounds[rounds[i]].sort( (score1, score2) => score2[2] - score1[2] );
      sorted = sorted.concat(sortedByRounds[rounds[i]]);
    }
    
    return sorted;
  }

  keepOnlyFiveHighscores() {
    this.highScoresFromDB = this.highScoresFromDB.filter( (score, i) => i < 5);
  }
  
  addListenerOnFetch() {
    this.getScores.on('child_added', (snapshot) => {
      const childScore = snapshot.val();
      const htmlScore = `${childScore.name.slice(0, 10)}</h4><h5>Rounds: ${childScore.round} Money: $${childScore.money}</h5></div></li>`;
      if (this.highScoresFromDB.length < 5) {
        this.highScoresFromDB.push([childScore.round, htmlScore, childScore.money]);
        if (this.highScoresFromDB.length === 5) {
          this.highScoresFromDB = this.highScoresFromDB.reverse();
          this.makeHighscoresList();
        }
      } else {
        this.makeHighscoresList([childScore.round, htmlScore, childScore.money]);
      }
    });
  }

  updateScore() {
    if (this.highScoresFromDB.length < 5) {
      this.getScores = this.fetchScores();

      setTimeout(this.updateScore, 3000);
    } else {
      setTimeout(this.updateScore, 60000);
    }
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Highscores);

/***/ }),

/***/ "./lib/game/images.js":
/*!****************************!*\
  !*** ./lib/game/images.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const magnet = new Image();
magnet.src = './assets/images/magnet.png';

const bitcoin = new Image();
bitcoin.multiplier = 120;
bitcoin.baseValue = 80;
bitcoin.slowdown = 5;
bitcoin.name = 'bitcoin';
bitcoin.src = './assets/images/bitcoin.png';

const tron = new Image();
tron.multiplier = 40;
tron.baseValue = 30;
tron.slowdown = 2.3;
tron.name = 'tron';
tron.src = './assets/images/tron.png';

const penny = new Image();
penny.multiplier = 0;
penny.baseValue = 0.01;
penny.slowdown = 1.3;
penny.name = 'penny';
penny.src = './assets/images/penny.png';


/* harmony default export */ __webpack_exports__["default"] = ({
  magnet,
  bitcoin,
  tron,
  penny,
});

/***/ }),

/***/ "./lib/game/magnet.js":
/*!****************************!*\
  !*** ./lib/game/magnet.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _images__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./images */ "./lib/game/images.js");
/* harmony import */ var _music__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./music */ "./lib/game/music.js");



class Magnet {
  constructor(ctx, canvas, game) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.game = game;
    this.points = [];
    this.rotate = true;
    this.forward = true;
    this.rotationDiff = 0;
    this.angle = 1;
    this.rotation = 130;
    this.x = 0;
    this.y = 0;
    this.translateX = canvas.width / 2;
    this.dy = 6;
    this.dx = 6;
    this.maxReach = 225;
    this.sound = new _music__WEBPACK_IMPORTED_MODULE_1__["default"]('./assets/audio/sliding.mp3', true);
    this.initialMove = true;
  }

  drawmagnet() {
    if (this.rotate) {
      this.drawRotatingMagnet();
    } else {
      this.drawMovingMagnet();
    }
  }

  drawMovingMagnet() {
    if (this.returnedToStart()) return;
    this.calculateMaxReach();
    this.drawString();
    this.calculateCoorOnCanvas();
    this.generateMagneticPoints();

    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (this.x + this.dx > this.maxReach || this.y + this.dy > this.maxReach) {
      this.dx = -this.dx;
      this.dy = -this.dy;
    }
    this.ctx.translate(this.translateX, 50);
    this.ctx.rotate(this.angle);
    this.x += this.dx
    this.y += this.dy;

    this.ctx.drawImage(_images__WEBPACK_IMPORTED_MODULE_0__["default"].magnet, this.x, this.y);
    this.ctx.restore();
  }

  generateMagneticPoints() {
    this.points = [];
    for (let startRad = 0; startRad < 2 * Math.PI; startRad += Math.PI / 10) {
      const x3 = this.game.x2 + 33 * Math.cos(startRad);
      const y3 = this.game.y2 + 33 * Math.sin(startRad);
      this.points.push([x3, y3]);
    }
    this.points.forEach(coord => {
      this.ctx.fillStyle = 'green';
      this.ctx.fillRect(coord[0] + Math.random() * 5, coord[1] + Math.random() * 5, 3, 3);
    });
  }

  calculateCoorOnCanvas() {
    this.game.l = Math.sqrt(this.x ** 2 + this.y ** 2) + _images__WEBPACK_IMPORTED_MODULE_0__["default"].magnet.height / 2 + 10;
    this.game.x2 = (this.translateX + this.game.l * Math.cos(this.angle + 0.785398));
    this.game.y2 = (50 + this.game.l * Math.sin(this.angle + 0.785398));
  }

  calculateMaxReach() {
    const degrees = this.rotation - this.rotationDiff;
    if (degrees <= 90 && degrees >= 0) {
      this.maxReach = Math.abs(degrees - 45) + 210;
    } else if (degrees > 90) {
      this.maxReach = 250 - (degrees - 90) * 2;
    } else {
      this.maxReach = 250 + degrees * 2;
    }
  }

  returnedToStart() {
    if (this.y <= 0 && this.dy < 0) {
      this.rotate = true;
      this.handleCollectedCoins();
      this.dx = 6;
      this.dy = 6;
      this.initialMove = true;
      this.sound.pause();
      return true;
    }
  }

  handleCollectedCoins() {
    while (this.game.collected.length > 0) {
      if (this.game.names.length > 1) {
        setTimeout(() => {
          this.game.flashMessage(this.game.names.map(name => ('+' + name)));
          this.game.names = [];
        }, 300);
      } else {
        this.game.flashMessage('+' + this.game.names.pop());
      }
      this.game.money += this.game.collected.pop();
    }
  }

  drawRotatingMagnet() {
    if (this.dx !== 6 || this.dy !== 6) {
      this.dx = 6;
      this.dy = 6;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0)
    this.angle = (this.rotation - this.rotationDiff) * Math.PI / 180;
    this.ctx.translate(this.translateX, this.y + 50)
    this.ctx.rotate(this.angle);
    this.ctx.drawImage(_images__WEBPACK_IMPORTED_MODULE_0__["default"].magnet, 0, 0);
    this.ctx.restore();
    this.handleRotate();
  }

  handleRotate() {
    if (this.forward) {
      this.rotationDiff++;
      if (this.rotationDiff === 175) {
        this.forward = false;
        this.rotationDiff--;
      }
    } else {
      this.rotationDiff--;
      if (this.rotationDiff < 0) {
        this.forward = true;
        this.rotationDiff++;
      }
    }
  }

  handleKeypress(key) {
    if (key === 'ArrowDown') {
      if (this.initialMove) {
        if (this.ctx.playMusic) this.sound.play();
        this.initialMove = false;
      }
      this.rotate = false;
      if (this.dx < 0) {
        this.dx = -this.dx;
        this.dy = -this.dy;
        if (this.y < 15.5 || !this.game.collected.length) {
          this.dx = 6;
          this.dy = 6;
        }
      } 
    } else if (key === 'ArrowUp' && !this.rotate) {
      if (this.dx > 0) {
        this.dx = -this.dx;
        this.dy = -this.dy;
      } else if (this.dx > -2.5) {
        this.dx = this.dx * 1.05;
        this.dy = this.dy * 1.05;
      } else if (this.dx > -5) {
        this.dx = this.dx * 1.15;
        this.dy = this.dy * 1.15;
      }
    }
  }

  drawString() {
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.translate(this.translateX, 50)
    this.ctx.rotate(this.angle);
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'white'
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(this.x, this.y);
    this.ctx.stroke();
    this.ctx.restore();
  }

  slowdown(amt) {
    const newDx = this.dx / amt;
    const newDy = this.dy / amt;

    if (this.dx > 0) {
      this.dx = -newDx;
      this.dy = -newDy;
    } else {
      this.dx = newDx;
      this.dy = newDy;
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Magnet);

/***/ }),

/***/ "./lib/game/music.js":
/*!***************************!*\
  !*** ./lib/game/music.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Music {
  constructor(src, noLoop) {
    this.music = document.createElement("audio");
    this.music.src = src;
    this.music.setAttribute("preload", "auto");
    this.music.setAttribute("controls", "none");
    if (!noLoop) this.music.setAttribute("loop", "true");
    this.music.style.display = "none";
    document.body.appendChild(this.music);
  }

  play() {
    this.music.play();
  }

  pause() {
    this.music.pause();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Music);

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Users_Shirley_Desktop_Crypto_Miner_lib_game_game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/game/game.js */ "./lib/game/game.js");


document.addEventListener('DOMContentLoaded', () => {
  Object(_Users_Shirley_Desktop_Crypto_Miner_lib_game_game_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
})


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map