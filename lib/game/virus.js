class Virus {
  constructor(image, i, game) {
    this.image = image;
    this.name = image.name;
    this.x = Math.random() * 500 + 50;
    this.y = Math.random() * 260 + 90;
    this.value = image.value;
    this.slowdown = image.slowdown;
    this.collected = false;
    this.index = i;
    this.here = true;
    this.game = game;
    this.stagger = this.index % 2 ? (this.index % 3 + 1) * 1.5 : (this.index % 3 + 1) * -1.5;
  }

  collect() {
    this.x = this.game.x2 - this.stagger;
    this.y = this.game.y2 - this.stagger * .8;
    if (this.y < 98 && this.here && this.x > 235 && this.x < 345) {
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

export default Virus;