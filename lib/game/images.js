const magnet = new Image();
magnet.src = './assets/images/magnet.png';

const bitcoin = new Image();
bitcoin.value = Math.round(Math.random() * 100) + 100;
bitcoin.slowdown = 6;
bitcoin.name = 'bitcoin';
bitcoin.src = './assets/images/bitcoin.png';

const tron = new Image();
tron.slowdown = 3.5;
tron.name = 'tron';
tron.value = Math.round(Math.random() * 100) + 20;
tron.src = './assets/images/tron.png';

const penny = new Image();
penny.value = 0.01
penny.slowdown = 1.2;
penny.name = 'penny';
penny.src = './assets/images/penny.png';


export default {
  magnet,
  bitcoin,
  tron,
  penny,
};