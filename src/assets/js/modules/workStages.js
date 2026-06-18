const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const initWorkStages = () => {
  const section = document.querySelector('.js-work-stages-section');

  if (!section) return;

  const line = section.querySelector('.js-work-stages-line');
  const lineFill = section.querySelector('.js-work-stages-line-fill');
  const marker = section.querySelector('.js-work-stages-marker');
  const items = section.querySelectorAll('.js-work-stages-item');

  if (!line || !lineFill || !marker) return;

  let frameId = 0;

  const updateLine = () => {
    frameId = 0;

    const viewportCenter = window.innerHeight * 0.5;
    const lineRect = line.getBoundingClientRect();
    const progress = clamp(viewportCenter - lineRect.top, 0, lineRect.height);

    lineFill.style.height = `${progress}px`;
    marker.style.top = `${progress}px`;

    let activeItem = null;

    items.forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.top + itemRect.height * 0.5 - lineRect.top;

      if (progress >= itemCenter) {
        activeItem = item;
      }
    });

    items.forEach((item) => {
      if (item === activeItem) {
        item.setAttribute('aria-current', 'true');
      } else {
        item.removeAttribute('aria-current');
      }
    });
  };

  const requestUpdate = () => {
    if (frameId) return;

    frameId = window.requestAnimationFrame(updateLine);
  };

  updateLine();

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
};
