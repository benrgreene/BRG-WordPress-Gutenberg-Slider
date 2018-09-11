import './styles/block-style.css';

const sliderLibrary = require('brg-slider');

document.addEventListener('DOMContentLoaded', (event) => {
  // get all the sliders on the page.
  const allSliders = document.querySelectorAll('.gutenberg__slider');
  allSliders.forEach((slider, index) => {
    // add an ID for the slider library to use
    slider.id = 'slider-' + index;
    // get the direct children of the slider
    // and set them all to have the 'slide' class
    const directChildren = document.querySelectorAll(`#${slider.id} > *`);
    directChildren.forEach((el, i) => {
      if (el) {
        el.classList.add('slide');
      }
    });
    // instantiate the slider
    sliderLibrary.newSlider({
      'slider': `#${slider.id}`,
    });
  });
});