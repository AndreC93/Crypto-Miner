import Coin from './coin';
import defaultListener from './default_listener';
import CryptoMiner from './crypto_miner';

export default function game() {
  defaultListener();

  const canvas = $j('#game-frame').nodes[0];
  const startButton = $j('#start-button');
  const pauseButton = $j('#pause-button');
  const gameOverButton = $j('#game-over');
  let lastDownTarget;

  document.addEventListener('mousedown', (e) => {
    lastDownTarget = e.target;
  }, false);

  
  const moreMenu = $j('#more-menu');
  $j('#show-more').on('click', () => moreMenu.attr('style', 'display: block;'));
  moreMenu.find('a').on('click', () => moreMenu.attr('style', 'display: none;'));
  
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    ctx.cryptoMiner = new CryptoMiner(ctx, canvas);
    ctx.cryptoMiner.startGame();
    
    const handleKeydown = (e) => {
      ctx.cryptoMiner.handleKeypress(e.key);
    };
    
    const focusOnGame = [canvas, startButton.nodes[0], pauseButton.nodes[0], gameOverButton.nodes[0]];
    document.addEventListener('keydown', (e) => {
      if (focusOnGame.includes(lastDownTarget)) {
        handleKeydown(e);
      }
    }, false);
    
    startButton.on('click', () => {
      $j('#panel').attr('style', 'display: block;');
      $j('#pc').attr('style', 'display: block;');
      ctx.fillStyle = '#010014';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fill();
      pauseButton.attr('style', 'display: block;')
      $j('canvas').attr('style', "background: url('./assets/images/moving_stars.gif') no-repeat; background-size: cover;");
      startButton.attr('style', 'display: none;');
      ctx.cryptoMiner.gameInterval = setInterval(() => ctx.cryptoMiner.play(), 17);
    })

    pauseButton.on('click', () => {
      startButton.attr('style', 'display: block; left: 173px;').html('Unpause');
      pauseButton.attr('style', 'display: none;');
      clearInterval(ctx.cryptoMiner.gameInterval);
    });

    $j('#game-over').find('b').on('click', () => ctx.cryptoMiner.startGame())
    $j('#game-over').find('b').on('mouseover', () => {
      $j('#game-over').find('b').html('RESTART');
    });
    $j('#game-over').find('b').on('mouseout', () => {
      $j('#game-over').find('b').html('GAME OVER');
    });
  }
}