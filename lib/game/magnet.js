import images from './images';
import Music from './music';

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
    this.sound = new Music('./assets/audio/sliding.mp3', true);
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

    this.ctx.drawImage(images.magnet, this.x, this.y);
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
    this.game.l = Math.sqrt(this.x ** 2 + this.y ** 2) + images.magnet.height / 2 + 10;
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
    this.ctx.drawImage(images.magnet, 0, 0);
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
        this.sound.play();
        this.initialMove = false;
      }
      this.rotate = false;
      if (this.dx < 0) {
        this.dx = -this.dx;
        this.dy = -this.dy;
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

export default Magnet;