import { CountUp } from 'countup.js';

export const initCounters = () => {
  const counters = document.querySelectorAll('.js-count-up');

  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const targetValue = Number(counter.textContent.replace(/\s/g, ''));

        if (!Number.isFinite(targetValue)) {
          currentObserver.unobserve(counter);
          return;
        }

        const countUp = new CountUp(counter, targetValue, {
          duration: 2,
          separator: ' ',
        });

        if (!countUp.error) {
          countUp.start();
        }

        currentObserver.unobserve(counter);
      });
    },
    {
      threshold: 0.4,
    },
  );

  counters.forEach((counter) => observer.observe(counter));
};
