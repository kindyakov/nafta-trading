export const initAboutImages = () => {
  const images = document.querySelectorAll('.js-about-image');

  if (!images.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (reduceMotion.matches) return;

  images.forEach((image) => {
    const position = {
      currentX: 0,
      currentY: 0,
      targetX: 0,
      targetY: 0,
      frameId: null,
    };

    const render = () => {
      position.currentX += (position.targetX - position.currentX) * 0.18;
      position.currentY += (position.targetY - position.currentY) * 0.18;

      image.style.setProperty('--about-image-x', `${position.currentX}px`);
      image.style.setProperty('--about-image-y', `${position.currentY}px`);

      const hasMovement = Math.abs(position.targetX - position.currentX) > 0.1 || Math.abs(position.targetY - position.currentY) > 0.1;

      if (hasMovement) {
        position.frameId = requestAnimationFrame(render);
      } else {
        position.frameId = null;
      }
    };

    const startRender = () => {
      if (position.frameId) return;

      position.frameId = requestAnimationFrame(render);
    };

    image.addEventListener('pointermove', (event) => {
      const rect = image.getBoundingClientRect();
      const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
      const offsetY = (event.clientY - rect.top) / rect.height - 0.5;

      position.targetX = offsetX * 18;
      position.targetY = offsetY * 18;
      startRender();
    });

    image.addEventListener('pointerleave', () => {
      position.targetX = 0;
      position.targetY = 0;
      startRender();
    });
  });
};
