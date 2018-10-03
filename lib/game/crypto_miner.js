import Coin from './coin';
import Music from './music';
import images from './images';
import Magnet from './magnet';

class CryptoMiner {
  constructor(ctx, canvas) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.defaultCoins = [images.penny, images.tron, images.bitcoin];
    this.round = 1;
    this.money = 0;
    this.time = 1800;
    this.collected = [];
    this.names = [];
    this.coins = this.defaultCoins.map((coin, i) => new Coin(coin, i, this));
    this.x2;
    this.y2;
    this.l;
    this.gameInterval;
    this.magnet = new Magnet(ctx, canvas, this);
    this.music = new Music('./assets/audio/slowmotion.mp3');
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
          this.coins.push(new Coin(this.defaultCoins[i], i, this));
        } else {
          const newCoin = this.defaultCoins[Math.round(Math.random() * 2)];
          this.coins.push(new Coin(newCoin, i, this));
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
    this.magnet.handleKeypress(key);
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
    startButton.attr('style', 'display: block;');
  }

  gameOver() {
    clearInterval(this.gameInterval);
    $j('#pc').attr('style', 'display: none;');
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    $j('#pause-button').attr('style', 'display: none;')
    const roundsLasted = this.round > 1 ? this.round + ' rounds' : '1 round';
    const moneyCollected = Math.round(this.money * 100) / 100;
    $j('#game-over').attr('style', 'display: flex;')
      .find('p').html(`You lasted ${roundsLasted}<br> and collected $${moneyCollected}!`);
    this.ctx.cryptoMiner = new CryptoMiner(this.ctx, this.canvas);
    this.ctx.cryptoMiner.setScoreboard(true);
    this.music.pause();
    $j('canvas').attr('style', "background: url('./assets/images/sparkling_stars.gif') no-repeat; background-size: cover;");
  }
}

export default CryptoMiner;