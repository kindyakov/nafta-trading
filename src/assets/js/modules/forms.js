import IMask from 'imask';
import JustValidate from 'just-validate';
import Toastify from 'toastify-js';

const PHONE_MASK_OPTIONS = {
  mask: '+{7} (000) 000-00-00',
};

const showToast = (text, type = 'success') => {
  Toastify({
    text,
    duration: 3500,
    gravity: 'top',
    position: 'right',
    style: {
      background: type === 'success' ? '#909eff' : '#d43c3c',
      borderRadius: '8px',
      boxShadow: 'none',
    },
  }).showToast();
};

const bindFileInput = (fileInput, fileName) => {
  fileInput.addEventListener('change', () => {
    const [selectedFile] = fileInput.files || [];
    fileName.textContent = selectedFile ? selectedFile.name : 'Файл не выбран';
  });
};

const ensureFormId = (form, index) => {
  if (form.id) return form.id;

  form.id = `contact-form-${index + 1}`;
  return form.id;
};

const getFieldSelector = (formId, name) => `#${formId} [name="${name}"]`;

const initPhoneMask = (form) => {
  const phoneInput = form.querySelector('[name="phone"]');

  if (!phoneInput) return null;

  return IMask(phoneInput, PHONE_MASK_OPTIONS);
};

const getSubmitUrl = () => window.naftaTradingAjax?.url;

const submitForm = async (form) => {
  const submitUrl = getSubmitUrl();

  if (!submitUrl) return;

  const response = await fetch(submitUrl, {
    method: 'POST',
    body: new FormData(form),
  });

  if (!response.ok) {
    throw new Error('Request failed');
  }
};

export const initForms = () => {
  const forms = Array.from(document.querySelectorAll('.js-contact-form'));

  if (!forms.length) return;

  forms.forEach((form, index) => {
    const formId = ensureFormId(form, index);
    const phoneMask = initPhoneMask(form);
    const fileInput = form.querySelector('[name="file"]');
    const fileName = form.querySelector('[data-file-name]');
    const submitButton = form.querySelector('[type="submit"]');

    if (fileInput && fileName) {
      bindFileInput(fileInput, fileName);
    }

    const validator = new JustValidate(form, {
      errorFieldCssClass: 'just-validate-error-field',
      errorLabelCssClass: 'just-validate-error-label',
      lockForm: false,
      focusInvalidField: true,
      errorLabelStyle: {
        color: '#d43c3c',
      },
    });

    validator
      .addField(getFieldSelector(formId, 'name'), [
        {
          rule: 'required',
          errorMessage: 'Введите имя',
        },
        {
          rule: 'minLength',
          value: 2,
          errorMessage: 'Минимум 2 символа',
        },
      ])
      .addField(getFieldSelector(formId, 'phone'), [
        {
          rule: 'required',
          errorMessage: 'Введите телефон',
        },
        {
          validator: () => phoneMask?.unmaskedValue.length === 11,
          errorMessage: 'Некорректный номер телефона',
        },
      ])
      .addField(getFieldSelector(formId, 'email'), [
        {
          rule: 'required',
          errorMessage: 'Введите email',
        },
        {
          rule: 'email',
          errorMessage: 'Некорректный email',
        },
      ])
      .addField(getFieldSelector(formId, 'company'), [
        {
          rule: 'minLength',
          value: 2,
          errorMessage: 'Минимум 2 символа',
        },
      ])
      .addField(getFieldSelector(formId, 'message'), [
        {
          rule: 'minLength',
          value: 10,
          errorMessage: 'Минимум 10 символов',
        },
      ])
      .addField(getFieldSelector(formId, 'privacy'), [
        {
          rule: 'required',
          errorMessage: 'Нужно согласие на обработку данных',
        },
      ])
      .onSuccess(async (event) => {
        event.preventDefault();

        form.classList.add('is-loading');
        submitButton?.classList.add('is-busy');
        submitButton?.setAttribute('disabled', '');

        try {
          await submitForm(form);

          form.reset();

          if (phoneMask) {
            phoneMask.value = '';
          }

          if (fileName) {
            fileName.textContent = 'Файл не выбран';
          }

          showToast('Заявка отправлена. Мы свяжемся с вами в ближайшее время.');
        } catch (error) {
          showToast('Не удалось отправить заявку. Попробуйте ещё раз.', 'error');
        } finally {
          form.classList.remove('is-loading');
          submitButton?.classList.remove('is-busy');
          submitButton?.removeAttribute('disabled');
        }
      });
  });
};
