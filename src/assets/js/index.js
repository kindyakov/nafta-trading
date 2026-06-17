import { useDynamicAdapt } from './modules/dynamicAdapt.js';
import { initHeader } from './modules/header.js';
import { initModal } from './modules/modal.js';
import { initSlider } from './modules/slider.js';
import { initAccordions } from './modules/accordion.js';
import { initAOS } from './modules/aos.js';
import { initForms } from './modules/forms.js';

document.addEventListener('DOMContentLoaded', () => {
  useDynamicAdapt();
  initHeader();
  initModal();
  initSlider();
  initAccordions();
  initAOS();
  initForms();
});
