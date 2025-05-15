
document.addEventListener('DOMContentLoaded', () => {
   // Scroll animation
   const revealElements = document.querySelectorAll('.reveal, .reveal-text');
   const header = document.querySelector('.header');

   // Mobile navigation toggle
   const navToggle = document.getElementById('navToggle');
   const navMenu = document.querySelector('.nav-menu');

   // Testimonial slider
   const testimonialTrack = document.getElementById('testimonialTrack');
   const dots = document.querySelectorAll('.dot');
   let currentTestimonial = 0;

   // Contact form
   const contactForm = document.getElementById('contactForm');

   // Smooth scrolling for navigation links
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
         e.preventDefault();

         if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
         }

         const targetId = this.getAttribute('href');
         if (targetId === '#') return;

         const targetElement = document.querySelector(targetId);
         if (targetElement) {
            window.scrollTo({
               top: targetElement.offsetTop - 80,
               behavior: 'smooth'
            });
         }
      });
   });

   // Mobile menu toggle
   navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
   });

   // Reveal elements on scroll
   function revealOnScroll() {
      const windowHeight = window.innerHeight;

      revealElements.forEach(element => {
         const elementTop = element.getBoundingClientRect().top;

         if (elementTop < windowHeight - 100) {
            element.classList.add('active');
         }
      });

      // Header background change on scroll
      if (window.scrollY > 50) {
         header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
         header.style.padding = '1.5rem 0';
      } else {
         header.style.boxShadow = 'none';
         header.style.padding = '2rem 0';
      }
   }

   // Initialize reveal on page load
   revealOnScroll();

   // Testimonial slider functionality
   function showTestimonial(index) {
      testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
      currentTestimonial = index;

      // Update active dot
      dots.forEach((dot, i) => {
         dot.classList.toggle('active', i === index);
      });
   }

   // Add click event to dots
   dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
         showTestimonial(index);
      });
   });

   // Auto slide testimonials
   setInterval(() => {
      const nextSlide = (currentTestimonial + 1) % dots.length;
      showTestimonial(nextSlide);
   }, 6000);

   // Form submission
   if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
         e.preventDefault();

         const formData = {
            name: contactForm.name.value,
            email: contactForm.email.value,
            service: contactForm.service.value,
            message: contactForm.message.value
         };

         // This would normally send to a server, but we'll just log it
         console.log('Form submitted:', formData);

         // Show success message
         const successMessage = document.createElement('div');
         successMessage.className = 'form-success';
         successMessage.innerHTML = `
        <div class="success-icon">✓</div>
        <h3>Message Sent!</h3>
        <p>Thanks for reaching out. We'll be in touch shortly.</p>
      `;

         contactForm.innerHTML = '';
         contactForm.appendChild(successMessage);

         // Reset form after delay in real application
         // setTimeout(() => contactForm.reset(), 5000);
      });
   }

   // Add scroll event listener
   window.addEventListener('scroll', revealOnScroll);

   // Handle resize events
   window.addEventListener('resize', revealOnScroll);
});
