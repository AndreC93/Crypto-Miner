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


export default {
  magnet,
  bitcoin,
  tron,
  penny,
};