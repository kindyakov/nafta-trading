import Swiper from 'swiper';

export const initSlider = () => {
  const sliderElement = document.querySelector('.swiper-placeholder');

  if (!sliderElement) {
    return;
  }

  new Swiper(sliderElement, {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true
  });
};
