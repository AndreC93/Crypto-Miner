import Coin from './coin';
import defaultListener from './default_listener';
import CryptoMiner from './crypto_miner';
import Highscores from './highscores';

export default function game() {
  defaultListener();

  const canvas = $j('#game-frame').nodes[0];
  const startButton = $j('#start-button');
  const pauseButton = $j('#pause-button');
  const gameOverButton = $j('#game-over');
  const muteButton = $j('#mute');
  let lastDownTarget;
  
  const moreMenu = $j('#more-menu');
  $j('#show-more').on('click', () => moreMenu.attr('style', 'display: block;'));
  moreMenu.find('a').on('click', () => moreMenu.attr('style', 'display: none;'));

  // const highscoresList = $j('#highscores');
  // const highscoreToggle = () => {
  //   if (highscoresList.attr('style') === 'display: block;') {
  //     highscoresList.attr('style', 'display: none;')
  //   } else {
  //     highscoresList.attr('style', 'display: block;')
  //   }
  // };
  // $j('#highscore-button').on('click', highscoreToggle);

  const highscores = new Highscores();
  
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    ctx.cryptoMiner = new CryptoMiner(ctx, canvas);
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