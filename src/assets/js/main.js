document.addEventListener('DOMContentLoaded', () => {
  const services = document.querySelectorAll('.service');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });

  services.forEach(service => {
    observer.observe(service);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('header nav');
  const body = document.body;

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default button behavior
      nav.classList.toggle('active');
      body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
      console.log('Menu toggled'); // For debugging
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!nav.contains(event.target) && !menuToggle.contains(event.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        body.style.overflow = '';
        console.log('Menu closed'); // For debugging
      }
    });
  } else {
    console.error('Menu toggle or nav element not found');
  }
});

document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('pre code.language-prompt').forEach((block) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'prompt-block';
    block.parentNode.insertBefore(wrapper, block);
    wrapper.appendChild(block);

    const button = document.createElement('button');
    button.className = 'copy-button';
    button.textContent = 'Copy';
    wrapper.appendChild(button);

    button.addEventListener('click', () => {
      navigator.clipboard.writeText(block.textContent).then(() => {
        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = 'Copy';
        }, 2000);
      });
    });
  });
});
