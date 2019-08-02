const loadSlider = config => {
  const { tns } = require('../node_modules/tiny-slider/src/tiny-slider.js');
  const slider = tns(config);
  return slider;
};

export default loadSlider;
