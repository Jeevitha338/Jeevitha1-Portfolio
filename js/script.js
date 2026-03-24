/**
 * ========================================
 * PROFESSIONAL PORTFOLIO SCRIPTS
 * ========================================
 * Author: [Your Name]
 * Version: 1.0
 * Vanilla JavaScript - No Libraries Used
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Navigation Scroll Effect ---
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Mobile Menu Toggle ---
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links a');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });

  // --- Smooth Scrolling for Navigation Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Active Link on Scroll ---
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // --- Skill Progress Bar Animation ---
  const skillsSection = document.querySelector('#skills');
  const progressBars = document.querySelectorAll('.progress');
  
  const showProgress = () => {
    progressBars.forEach(progressBar => {
      const value = progressBar.getAttribute('data-progress');
      progressBar.style.width = `${value}%`;
    });
  };

  const hideProgress = () => {
    progressBars.forEach(progressBar => {
      progressBar.style.width = '0';
    });
  };

  // Intersection Observer for Skills
  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        showProgress();
      }
    });
  }, observerOptions);

  if (skillsSection) {
    observer.observe(skillsSection);
  }

  // --- Scroll to Top Button ---
  const scrollTopBtn = document.querySelector('.scroll-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // --- Contact Form Validation ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      
      // Name Validation
      if (name.value.trim() === '') {
        showError(name, 'Name is required');
        isValid = false;
      } else {
        hideError(name);
      }
      
      // Email Validation
      if (email.value.trim() === '') {
        showError(email, 'Email is required');
        isValid = false;
      } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
      } else {
        hideError(email);
      }
      
      // Message Validation
      if (message.value.trim() === '') {
        showError(message, 'Message is required');
        isValid = false;
      } else {
        hideError(message);
      }
      
      if (isValid) {
        // Here you would typically send the form data to a server
        // For this demo, we'll just show a success message
        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn.innerText;
        
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
          alert('Thank you! Your message has been sent successfully.');
          contactForm.reset();
          submitBtn.innerText = originalText;
          submitBtn.disabled = false;
        }, 1500);
      }
    });
  }

  function showError(input, message) {
    const formGroup = input.parentElement;
    const errorMsg = formGroup.querySelector('.error-msg');
    input.style.borderColor = '#ef4444';
    errorMsg.innerText = message;
    errorMsg.style.display = 'block';
  }

  function hideError(input) {
    const formGroup = input.parentElement;
    const errorMsg = formGroup.querySelector('.error-msg');
    input.style.borderColor = '#e2e8f0';
    errorMsg.style.display = 'none';
  }

  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
});
