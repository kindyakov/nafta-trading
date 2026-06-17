import Accordion from 'accordion-js';

export const initAccordions = () => {
  const accordionContainer = document.querySelector('.accordion-placeholder');

  if (!accordionContainer) {
    return;
  }

  new Accordion(accordionContainer, {
    activeClass: 'is-active',
    duration: 300
  });
};
