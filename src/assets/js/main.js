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
