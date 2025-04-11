document.addEventListener("DOMContentLoaded", () => {
  const fadeSections = document.querySelectorAll('.fade-section');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeSections.forEach(section => observer.observe(section));
});