import A11yDialog from 'a11y-dialog';

export const initModal = () => {
  const container = document.querySelector('[data-a11y-dialog]');

  if (!container) {
    return;
  }

  const dialog = new A11yDialog(container);
  const closeElements = container.querySelectorAll('[data-a11y-dialog-hide]');
  const closeDuration = 260;
  let isAnimatedClose = false;

  const lockScroll = () => {
    document.body.classList.add('modal-open');
  };

  const unlockScroll = () => {
    document.body.classList.remove('modal-open');
  };

  const hideWithAnimation = () => {
    if (container.getAttribute('aria-hidden') === 'true' || isAnimatedClose) return;

    isAnimatedClose = true;
    container.classList.add('is-closing');

    window.setTimeout(() => {
      dialog.hide();
      container.classList.remove('is-closing');
      isAnimatedClose = false;
      unlockScroll();
    }, closeDuration);
  };

  dialog.on('show', lockScroll);
  dialog.on('hide', unlockScroll);

  closeElements.forEach((element) => {
    element.addEventListener('click', (event) => {
      event.preventDefault();
      hideWithAnimation();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;

    hideWithAnimation();
  });
};
