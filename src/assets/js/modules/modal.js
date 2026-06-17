import A11yDialog from 'a11y-dialog';

export const initModal = () => {
  const container = document.querySelector('[data-a11y-dialog]');

  if (!container) {
    return;
  }

  const dialog = new A11yDialog(container);

  dialog.on('show', (event) => {
    // Optional callbacks on show
  });
};
