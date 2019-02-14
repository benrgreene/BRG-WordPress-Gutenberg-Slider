import './styles/block-style.css';

const sliderLibrary = require('brg-slider');

document.addEventListener('DOMContentLoaded', (event) => {
  // get all the sliders on the page.
  const allSliders = document.querySelectorAll('.gutenberg__slider');
  allSliders.forEach((slider, index) => {
    // add an ID for the slider library to use
    slider.id = 'slider-' + index;
    // Let's get the data attribute for slider settings
    const haveDots   = slider.hasAttribute('data-dots') ? (slider.getAttribute('data-dots') == 'true') : true;
    const haveArrows = slider.hasAttribute('data-arrows') ? (slider.getAttribute('data-arrows') == 'true') : true;
    const timer      = slider.hasAttribute('data-timer') ? parseInt(slider.getAttribute('data-timer'), 10) * 1000 : false;
    const dotColor   = slider.hasAttribute('data-dot-color') ? slider.getAttribute('data-dot-color') : '#1188FF';
    const leftArrowContent  = slider.hasAttribute('data-left-arrow-content') ? slider.getAttribute('data-left-arrow-content') : null;
    const rightArrowContent = slider.hasAttribute('data-right-arrow-content') ? slider.getAttribute('data-right-arrow-content') : null;
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
      'hasArrows': haveArrows,
      'hasDots': haveDots,
      'timer': timer,
      'dotColor': dotColor,
      'rightArrowContent': rightArrowContent,
      'leftArrowContent': leftArrowContent
    });
  });
});