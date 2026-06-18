import AOS from 'aos';

export const initAOS = () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) return;

  AOS.init({
    duration: 750,
    easing: 'ease-out-cubic',
    offset: 90,
    once: true,
  });
};
