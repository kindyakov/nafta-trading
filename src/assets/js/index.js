import { useDynamicAdapt } from './modules/dynamicAdapt.js';
import { initHeader } from './modules/header.js';
import { initModal } from './modules/modal.js';
import { initSlider } from './modules/slider.js';
import { initAccordions } from './modules/accordion.js';
import { initAOS } from './modules/aos.js';
import { initForms } from './modules/forms.js';
import { initCounters } from './modules/counters.js';
import { initAboutImages } from './modules/aboutImages.js';
import { initWorkStages } from './modules/workStages.js';

document.addEventListener('DOMContentLoaded', () => {
  useDynamicAdapt();
  initHeader();
  initModal();
  initSlider();
  initAccordions();
  initAOS();
  initForms();
  initCounters();
  initAboutImages();
  initWorkStages();
});
