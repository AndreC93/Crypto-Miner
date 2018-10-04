const defaultListener = () => {
  window.addEventListener('keydown', (e) => {
    if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  }, false);
};

export default defaultListener;