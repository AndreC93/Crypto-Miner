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

export default Music;