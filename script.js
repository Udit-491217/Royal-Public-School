const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav-links');

menuBtn?.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.next-btn');
  const prevButton = document.querySelector('.prev-btn');
  const dotsNav = document.querySelector('.carousel-dots');

  const slideWidth = slides[0].getBoundingClientRect().width + 20; // card width + margin

  // Arrange slides next to one another
  slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  });

  // Create dots dynamically
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.setAttribute('role', 'tab');
    dotsNav.appendChild(dot);
  });

  const dots = Array.from(dotsNav.children);
  let currentIndex = 0;

  const moveToSlide = (index) => {
    track.style.transform = `translateX(-${slideWidth * index}px)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    currentIndex = index;
  };

  // Next button
  nextButton.addEventListener('click', () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    moveToSlide(nextIndex);
  });

  // Prev button
  prevButton.addEventListener('click', () => {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    moveToSlide(prevIndex);
  });

  // Dots navigation
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      moveToSlide(idx);
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const faders = document.querySelectorAll('.fade-in');

  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});
document.addEventListener('DOMContentLoaded', () => {
  // --- Fade-in on scroll already handled above ---

  // Events slider
  const track = document.querySelector('.events-track');
  const slides = Array.from(track.children);
  const leftBtn = document.querySelector('.left-arrow');
  const rightBtn = document.querySelector('.right-arrow');
  const slideWidth = slides[0].getBoundingClientRect().width;

  let currentIndex = 0;

  // Arrange slides next to each other
  slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  });

  function moveToSlide(index) {
    if (index < 0) index = slides.length - 1;
    else if (index >= slides.length) index = 0;
    currentIndex = index;
    track.style.transform = 'translateX(-' + slideWidth * index + 'px)';
  }

  leftBtn.addEventListener('click', () => {
    moveToSlide(currentIndex - 1);
  });

  rightBtn.addEventListener('click', () => {
    moveToSlide(currentIndex + 1);
  });
});
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const open = answer.style.display === 'block';

    document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');

    answer.style.display = open ? 'none' : 'block';
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("admissionTitle");
  const note = document.getElementById("admissionNote");
  const cta = document.getElementById("admissionCTA");

  const month = new Date().getMonth(); 
  // Jan = 0, Feb = 1, March = 2, April = 3

  const isAdmissionSeason = month >= 2 && month <= 3; // March–April

  if (isAdmissionSeason) {
    title.textContent = "Admissions Open";
    note.textContent =
      "Admissions are currently open for the ongoing academic session.";
    cta.textContent = "Apply for Admission";
  } else {
    title.textContent = "Admissions";
    note.textContent =
      "Admissions generally begin in March for the new academic session. Enquiries are welcome throughout the year.";
    cta.textContent = "Enquire Now";
  }
});

