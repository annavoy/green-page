(() => {
  const refs = {
    openMenuBtn: document.querySelector('[data-menu-open]'),
    closeMenuBtn: document.querySelector('[data-menu-close]'),
    modal: document.querySelector('[data-menu]'),
    menuLinks: document.querySelectorAll('.menu-link'),
    shopButton: document.querySelector('.menu-btn-shop'),
    reviewList: document.querySelector('[data-review-list]'),
    reviewPrevBtn: document.querySelector('[data-review-prev]'),
    reviewNextBtn: document.querySelector('[data-review-next]'),
  };

  if (refs.openMenuBtn && refs.closeMenuBtn && refs.modal) {
    refs.openMenuBtn.addEventListener('click', () => {
      refs.modal.classList.add('is-open');
    });

    refs.closeMenuBtn.addEventListener('click', () => {
      refs.modal.classList.remove('is-open');
    });

    refs.menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        refs.modal.classList.remove('is-open');
      });
    });
  }

  if (refs.shopButton && refs.modal) {
    refs.shopButton.addEventListener('click', () => {
      refs.modal.classList.remove('is-open');
    });
  }

  if (refs.reviewList && refs.reviewPrevBtn && refs.reviewNextBtn) {
    const mobileMq = window.matchMedia('(max-width: 767px)');
    let autoplayId = null;

    const getSlideWidth = () => refs.reviewList.clientWidth;

    const scrollBySlide = direction => {
      refs.reviewList.scrollBy({
        left: getSlideWidth() * direction,
        behavior: 'smooth',
      });
    };

    const startAutoplay = () => {
      if (!mobileMq.matches || autoplayId) return;
      autoplayId = setInterval(() => {
        const maxScrollLeft =
          refs.reviewList.scrollWidth - refs.reviewList.clientWidth;
        const nearEnd = refs.reviewList.scrollLeft >= maxScrollLeft - 5;
        if (nearEnd) {
          refs.reviewList.scrollTo({ left: 0, behavior: 'smooth' });
          return;
        }
        scrollBySlide(1);
      }, 4000);
    };

    const stopAutoplay = () => {
      if (!autoplayId) return;
      clearInterval(autoplayId);
      autoplayId = null;
    };

    refs.reviewPrevBtn.addEventListener('click', () => {
      scrollBySlide(-1);
    });

    refs.reviewNextBtn.addEventListener('click', () => {
      scrollBySlide(1);
    });

    refs.reviewList.addEventListener('touchstart', stopAutoplay, {
      passive: true,
    });
    refs.reviewList.addEventListener('mouseenter', stopAutoplay);
    refs.reviewList.addEventListener('mouseleave', startAutoplay);

    const handleMobileChange = event => {
      if (event.matches) {
        startAutoplay();
        return;
      }
      stopAutoplay();
    };

    if (mobileMq.addEventListener) {
      mobileMq.addEventListener('change', handleMobileChange);
    } else {
      mobileMq.addListener(handleMobileChange);
    }

    startAutoplay();
  }
})();