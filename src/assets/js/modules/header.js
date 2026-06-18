export const initHeader = () => {
  const header = document.querySelector('[data-header]');
  const burger = document.querySelector('[data-burger]');
  const menu = document.querySelector('[data-menu]');
  const closeButtons = document.querySelectorAll('[data-menu-close]');
  const logo = header.querySelector('.js-header-logo');

  if (!header) return;

  // Toggle mobile menu drawer
  if (burger && menu) {
    const openMenu = () => {
      burger.classList.add('is-active');
      menu.classList.add('is-active');
      document.body.classList.add('menu-open');
    };

    const closeMenu = () => {
      burger.classList.remove('is-active');
      menu.classList.remove('is-active');
      document.body.classList.remove('menu-open');
    };

    burger.addEventListener('click', () => {
      if (menu.classList.contains('is-active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    closeButtons.forEach((btn) => {
      btn.addEventListener('click', closeMenu);
    });

    // Close menu on ESC key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-active')) {
        closeMenu();
      }
    });
  }

  // Handle header scroll style toggling
  const handleScroll = () => {
    const isScrolled = window.scrollY > 20;

    if (isScrolled) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }

    if (!logo) return;

    const nextLogoSrc = isScrolled ? logo.dataset.logoDark : logo.dataset.logoLight;

    if (nextLogoSrc && logo.getAttribute('src') !== nextLogoSrc) {
      logo.setAttribute('src', nextLogoSrc);
    }
  };

  // Add scroll listener and run once immediately
  window.addEventListener('scroll', handleScroll);
  handleScroll();
};
