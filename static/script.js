document.addEventListener("DOMContentLoaded", () => {
  // Fade‑in-effekt for alle elementer med klassen 'fade-section'
  const fadeSections = document.querySelectorAll('.fade-section');
  fadeSections.forEach(section => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    observer.observe(section);
  });

  // Team-slider med sirkulær logikk
  const teamMembers = document.querySelectorAll('.team-member');
  const prevBtn = document.querySelector('.slider-nav .prev');
  const nextBtn = document.querySelector('.slider-nav .next');

  if (teamMembers.length === 0 || !prevBtn || !nextBtn) return;

  const total = teamMembers.length;
  let centerIndex = 0;  // Start med indeks 0 (CEO vises først)

  function updateSlider() {
    teamMembers.forEach(member => {
      const idx = parseInt(member.getAttribute('data-index'), 10);
      member.classList.remove('left', 'center', 'right', 'hidden');

      if (idx === centerIndex) {
        member.classList.add('center');
      } else if (idx === ((centerIndex - 1 + total) % total)) {
        member.classList.add('left');
      } else if (idx === ((centerIndex + 1) % total)) {
        member.classList.add('right');
      } else {
        member.classList.add('hidden');
      }
    });
  }

  updateSlider();

  prevBtn.addEventListener('click', () => {
    centerIndex = (centerIndex - 1 + total) % total;
    updateSlider();
  });

  nextBtn.addEventListener('click', () => {
    centerIndex = (centerIndex + 1) % total;
    updateSlider();
  });
});

