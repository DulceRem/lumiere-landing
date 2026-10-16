
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const cartCount = document.getElementById('cartCount');
const toast = document.getElementById('toast');

let cartItems = 0;
let toastTimeout;

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');

  menuToggle.classList.toggle('active', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  document.body.classList.toggle('menu-open', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú');
    document.body.classList.remove('menu-open');
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

document.querySelectorAll('.quick-add').forEach(button => {
  button.addEventListener('click', () => {
    cartItems++;
    cartCount.textContent = cartItems;

    showToast(`${button.dataset.product} añadido al carrito de demostración.`);
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll('.reveal').forEach(element => {
  revealObserver.observe(element);
});

const testimonialTrack = document.getElementById('testimonialTrack');
const testimonials = Array.from(testimonialTrack.children);
const previousButton = document.getElementById('prevReview');
const nextButton = document.getElementById('nextReview');

let reviewIndex = 0;

function updateTestimonials() {
  if (window.innerWidth <= 700) {
    testimonialTrack.style.transform = `translateX(-${reviewIndex * 100}%)`;
  } else {
    testimonialTrack.style.transform = 'translateX(0)';
  }

  previousButton.disabled = reviewIndex === 0;
  nextButton.disabled = reviewIndex === testimonials.length - 1;

  previousButton.style.opacity = previousButton.disabled ? '0.45' : '1';
  nextButton.style.opacity = nextButton.disabled ? '0.45' : '1';
}

previousButton.addEventListener('click', () => {
  if (reviewIndex > 0) {
    reviewIndex--;
    updateTestimonials();
  }
});

nextButton.addEventListener('click', () => {
  if (reviewIndex < testimonials.length - 1) {
    reviewIndex++;
    updateTestimonials();
  }
});

window.addEventListener('resize', updateTestimonials);

updateTestimonials();

const newsletterForm = document.getElementById('newsletterForm');
const formMessage = document.getElementById('formMessage');

newsletterForm.addEventListener('submit', event => {
  event.preventDefault();

  formMessage.textContent = '¡Gracias! Este formulario es una demostración y no envía datos.';
  newsletterForm.reset();
});

document.getElementById('currentYear').textContent = new Date().getFullYear();
