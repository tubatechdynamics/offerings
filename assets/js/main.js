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
