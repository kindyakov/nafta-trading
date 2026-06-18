import Swiper from 'swiper';
import { A11y, EffectFlip, Keyboard, Navigation } from 'swiper/modules';

export const initSlider = () => {
  const sliderElement = document.querySelector('.swiper-placeholder');

  if (sliderElement) {
    new Swiper(sliderElement, {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
    });
  }

  const productsSliderElement = document.querySelector('.js-products-slider');

  if (productsSliderElement) {
    const productsSection = productsSliderElement.closest('.js-products-section');
    const categories = productsSection.querySelectorAll('.js-products-category');
    const currentProduct = productsSection.querySelector('.js-products-current');

    const setActiveProduct = (swiper) => {
      const activeSlide = swiper.slides[swiper.activeIndex];
      const productName = activeSlide.dataset.productName;

      categories.forEach((category) => {
        if (Number(category.dataset.productSlide) === swiper.activeIndex) {
          category.setAttribute('aria-current', 'true');
        } else {
          category.removeAttribute('aria-current');
        }
      });

      if (currentProduct && productName) {
        currentProduct.textContent = productName;
      }
    };

    const productsSlider = new Swiper(productsSliderElement, {
      modules: [A11y, EffectFlip, Keyboard],
      effect: 'flip',
      speed: 850,
      grabCursor: true,
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      flipEffect: {
        slideShadows: false,
      },
      on: {
        init: setActiveProduct,
        slideChange: setActiveProduct,
      },
    });

    categories.forEach((category) => {
      category.addEventListener('click', () => {
        productsSlider.slideTo(Number(category.dataset.productSlide));
      });
    });
  }

  const qualityPassportsSliderElement = document.querySelector('.js-quality-passports-slider');

  if (qualityPassportsSliderElement) {
    const qualityPassportsSection = qualityPassportsSliderElement.closest('.js-quality-passports-section');

    new Swiper(qualityPassportsSliderElement, {
      modules: [A11y, Keyboard, Navigation],
      slidesPerView: 2,
      spaceBetween: 20,
      speed: 700,
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      navigation: {
        prevEl: qualityPassportsSection.querySelector('.js-quality-passports-prev'),
        nextEl: qualityPassportsSection.querySelector('.js-quality-passports-next'),
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        760: {
          slidesPerView: 2,
        },
      },
    });
  }

  const reviewsSliderElement = document.querySelector('.js-reviews-slider');

  if (!reviewsSliderElement) return;

  const reviewsSection = reviewsSliderElement.closest('.js-reviews-section');

  new Swiper(reviewsSliderElement, {
    modules: [A11y, Keyboard, Navigation],
    slidesPerView: 2,
    spaceBetween: 20,
    speed: 700,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    navigation: {
      prevEl: reviewsSection.querySelector('.js-reviews-prev'),
      nextEl: reviewsSection.querySelector('.js-reviews-next'),
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      760: {
        slidesPerView: 2,
      },
    },
  });
};
