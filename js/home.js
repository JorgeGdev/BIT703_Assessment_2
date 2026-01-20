/* home.js
   Home page with AOS (Animate On Scroll) library
   Animates all sections on scroll
   Includes countdown timer for limited offers
*/

/* Countdown Timer Storage Key */
const COUNTDOWN_KEY = 'aag_countdown_end';
const COUNTDOWN_DURATION = 24 * 60 * 60 * 1000; /* 24 hours in milliseconds */

(function initHome() {
  initSwiperCarousel();
  initFloatingAnchor("#floatingAnchor");
  initAOSAnimations();
  initCountdownTimer();
})();

/**
 * Initialize AOS (Animate On Scroll) library
 */
function initAOSAnimations() {
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out-cubic',
    once: false,
    mirror: true,
    offset: 100,
  });
  console.log('✅ AOS initialized!');
}

function initSwiperCarousel() {
  const swiperEl = document.querySelector('.featured-swiper');
  if (!swiperEl) return;

  const swiper = new Swiper('.featured-swiper', {
    /* Efecto 3D espectacular */
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    
    /* Coverflow effect settings - ajustado para slides más pequeñas */
    coverflowEffect: {
      rotate: 30,
      stretch: 0,
      depth: 150,
      modifier: 1,
      slideShadows: true,
    },

    /* Responsive breakpoints */
    breakpoints: {
      320: {
        coverflowEffect: {
          rotate: 20,
          depth: 100,
        },
      },
      768: {
        coverflowEffect: {
          rotate: 30,
          depth: 150,
        },
      },
      1024: {
        coverflowEffect: {
          rotate: 35,
          depth: 200,
        },
      },
    },

    /* Navigation */
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    /* Pagination */
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },

    /* Autoplay */
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    /* Speed and easing */
    speed: 700,
    
    /* Loop */
    loop: true,
    
    /* Keyboard control */
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    /* Accessibility */
    a11y: {
      prevSlideMessage: 'Previous product',
      nextSlideMessage: 'Next product',
    },
  });
}

function initFloatingAnchor(selector) {
  const btn = document.querySelector(selector);
  if (!btn) return;

  let lastScrollY = 0;
  let ticking = false;

  function updateVisibility() {
    const scrollY = window.scrollY;
    const shouldShow = scrollY > 400;
    
    /* Smooth show/hide with class */
    if (shouldShow) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
    
    lastScrollY = scrollY;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateVisibility();
        ticking = false;
      });
      ticking = true;
    }
  }

  btn.addEventListener("click", () => {
    /* Add click animation */
    btn.style.transform = 'scale(0.9)';
    setTimeout(() => {
      btn.style.transform = '';
    }, 150);
    
    scrollToTop();
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  updateVisibility();
}

/* ========================================
   COUNTDOWN TIMER
   Creates urgency with a persistent timer
   ======================================== */

/**
 * Initialize countdown timer with localStorage persistence
 */
function initCountdownTimer() {
  const hoursEl = document.getElementById('countHours');
  const minutesEl = document.getElementById('countMinutes');
  const secondsEl = document.getElementById('countSeconds');
  const timerContainer = document.getElementById('countdownTimer');
  
  if (!hoursEl || !minutesEl || !secondsEl) return;
  
  /* Get or set the countdown end time */
  let endTime = getCountdownEndTime();
  
  /* Update timer every second */
  function updateTimer() {
    const now = Date.now();
    const remaining = endTime - now;
    
    if (remaining <= 0) {
      /* Timer expired - reset for new 24h period */
      endTime = resetCountdown();
      showExpiredMessage();
      return;
    }
    
    /* Calculate hours, minutes, seconds */
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
    
    /* Update display with leading zeros */
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
    
    /* Add urgency effect when less than 1 hour */
    if (remaining < 60 * 60 * 1000) {
      timerContainer.classList.add('animate-pulse');
    }
  }
  
  /* Get end time from localStorage or create new one */
  function getCountdownEndTime() {
    try {
      const stored = localStorage.getItem(COUNTDOWN_KEY);
      if (stored) {
        const endTime = parseInt(stored, 10);
        if (endTime > Date.now()) {
          return endTime;
        }
      }
    } catch (e) {
      console.warn('localStorage not available');
    }
    
    /* Create new countdown */
    return resetCountdown();
  }
  
  /* Reset countdown to new 24h period */
  function resetCountdown() {
    const newEndTime = Date.now() + COUNTDOWN_DURATION;
    try {
      localStorage.setItem(COUNTDOWN_KEY, String(newEndTime));
    } catch (e) {
      console.warn('Could not save countdown');
    }
    return newEndTime;
  }
  
  /* Show brief expired message then reset */
  function showExpiredMessage() {
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    
    /* Brief pause then restart */
    setTimeout(() => {
      timerContainer.classList.remove('animate-pulse');
      updateTimer();
    }, 2000);
  }
  
  /* Initial update */
  updateTimer();
  
  /* Update every second */
  setInterval(updateTimer, 1000);
  
  console.log('✅ Countdown timer initialized!');
}
