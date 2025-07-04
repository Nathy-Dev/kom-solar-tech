document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initTestimonialSlider();
  initContactForm();
  initNewsletterForm();
  highlightActiveNavLink();
});

// === Mobile Menu Toggle ===
function initMobileMenu() {
  const toggleBtn = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (!toggleBtn || !mobileNav) return;

  // Create overlay for blur effect
  let overlay = document.getElementById('mobile-nav-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'mobile-nav-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(255,255,255,0.001)';
    overlay.style.backdropFilter = 'blur(6px)';
    overlay.style.zIndex = '998';
    overlay.style.display = 'none';
    document.body.appendChild(overlay);
  }

  function openMenu() {
    mobileNav.classList.remove('hidden');
    toggleBtn.innerHTML = '<i class="ri-close-line"></i>';
    document.body.classList.add('no-scroll');
    overlay.style.display = 'block';
    // Place overlay below nav and toggle
    overlay.style.zIndex = '998';
    mobileNav.style.zIndex = '999';
    toggleBtn.style.zIndex = '1000';
  }

  function closeMenu() {
    mobileNav.classList.add('hidden');
    toggleBtn.innerHTML = '<i class="ri-menu-line"></i>';
    document.body.classList.remove('no-scroll');
    overlay.style.display = 'none';
  }

  toggleBtn.addEventListener('click', () => {
    const isHidden = mobileNav.classList.toggle('hidden');
    if (!isHidden) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  // Close nav when clicking outside (on overlay)
  overlay.addEventListener('click', closeMenu);

  // Optional: close nav on ESC key
  document.addEventListener('keydown', (e) => {
    if (!mobileNav.classList.contains('hidden') && e.key === 'Escape') {
      closeMenu();
    }
  });
}

// === Testimonial Slider ===
function initTestimonialSlider() {
  const slider = document.getElementById('testimonial-slider');
  const dots = document.querySelectorAll('#testimonial-dots .dot');
  const prev = document.getElementById('testimonial-prev');
  const next = document.getElementById('testimonial-next');

  if (!slider || dots.length === 0 || !prev || !next) return;

  let index = 0;
  const total = dots.length;

  const updateSlider = () => {
    slider.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
  };

  // Dot click event
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      index = parseInt(dot.dataset.index);
      updateSlider();
    });
  });

  // Navigation arrows
  prev.addEventListener('click', () => {
    index = (index === 0) ? total - 1 : index - 1;
    updateSlider();
  });

  next.addEventListener('click', () => {
    index = (index === total - 1) ? 0 : index + 1;
    updateSlider();
  });

  // Auto-slide every 7 seconds
  setInterval(() => {
    index = (index + 1) % total;
    updateSlider();
  }, 7000);
}

// === Contact Form ===
function initContactForm() {
  const form = document.getElementById('quick-contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !phone || !message) {
      alert('Please fill in all fields.');
      return;
    }

    // Simulated submission
    alert(`Thank you, ${name}! Your message has been received.`);
    form.reset();
  });
}

// === Newsletter Form ===
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  const consentCheckbox = document.getElementById('consent');

  if (!form || !consentCheckbox) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput ? emailInput.value.trim() : '';

    if (!consentCheckbox.checked) {
      alert("Please agree to receive marketing emails to subscribe.");
      return;
    }

    alert(`Thanks for subscribing with ${email}!`);
    form.reset();
    consentCheckbox.checked = false;
  });
}

// === Nav Link Active Highlight ===
function highlightActiveNavLink() {
  // Select all nav links (desktop and mobile)
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
  const currentPath = window.location.pathname.replace(/\/index\.html$/, '/');

  navLinks.forEach(link => {
    // Create a URL object to resolve relative paths
    const linkUrl = new URL(link.href, window.location.origin);
    let linkPath = linkUrl.pathname.replace(/\/index\.html$/, '/');
    // Compare normalized paths
    if (linkPath === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Project filter
      const filterContainer = document.querySelector('#project-filters');
      const projectGrid = document.querySelector('#project-grid');
      const projectCards = projectGrid.querySelectorAll('.project-card');

      filterContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
          // Deactivate existing active button
          filterContainer.querySelector('.active').classList.remove('active');
          // Activate new button
          e.target.classList.add('active');

          const filterValue = e.target.getAttribute('data-filter');

          projectCards.forEach((card) => {
            if (
              card.getAttribute('data-category') === filterValue ||
              filterValue === 'all'
            ) {
              card.classList.remove('hide');
            } else {
              card.classList.add('hide');
            }
          });
        }
      });

 // Animated counter for impact stats
      function animateCount(el, target, duration = 1800) {
        let start = 0;
        let startTimestamp = null;
        const isFloat =
          target.toString().includes('.') ||
          target.toString().includes('MW') ||
          target.toString().includes('Tonnes');
        const cleanTarget = parseFloat(
          target.toString().replace(/[^\d.]/g, '')
        );
        const suffix = target
          .toString()
          .replace(/[\d.+]/g, '')
          .trim();
        function step(timestamp) {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          let value = isFloat
            ? (cleanTarget * progress).toFixed(1)
            : Math.floor(cleanTarget * progress);
          if (progress < 1) {
            el.textContent = value + (suffix ? ' ' + suffix : '');
            requestAnimationFrame(step);
          } else {
            el.textContent = target;
          }
        }
        requestAnimationFrame(step);
      }

      function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
  // Returns true if any part of the element is in the viewport
  return rect.top < windowHeight && rect.bottom > 0;
}

      let hasCounted = false;
      function triggerCounters() {
        if (hasCounted) return;
        const section = document.getElementById('why-us');
        if (section && isElementInViewport(section)) {
          hasCounted = true;
          const counters = section.querySelectorAll('.feature-card h3');
          const targets = ['1.2+ MW', '350+', '15+', '800+ Tonnes'];
          counters.forEach((el, i) => {
            animateCount(el, targets[i]);
          });
        }
      }
      window.addEventListener('scroll', triggerCounters);
      window.addEventListener('resize', triggerCounters);
      setTimeout(triggerCounters, 500);