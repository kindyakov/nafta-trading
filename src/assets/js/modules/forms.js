import IMask from 'imask';
import JustValidate from 'just-validate';

export const initForms = () => {
  const form = document.querySelector('.form-placeholder');

  if (!form) {
    return;
  }

  // Mask tel inputs
  const phoneInputs = form.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach((input) => {
    IMask(input, {
      mask: '+{7} (000) 000-00-00'
    });
  });

  // Validation placeholder
  const validator = new JustValidate(form);
};
