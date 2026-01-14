    // Animation on appear using IntersectionObserver
  (function(){
    const skills = document.querySelectorAll('.skill');

    // Set textual percent for accessibility (aria-valuenow) and .value text
    skills.forEach(s => {
      const pct = parseInt(s.getAttribute('data-percent') || 0, 10);
      const valueEl = s.querySelector('.value');
      const track = s.querySelector('.track');
      track.setAttribute('aria-valuenow', 0);
      if (valueEl) valueEl.textContent = pct + '%';
    });

    // Animate when visible
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const s = entry.target;
          const pct = parseInt(s.getAttribute('data-percent') || 0, 10);
          const fill = s.querySelector('.fill');
          const track = s.querySelector('.track');

          // trigger transition
          requestAnimationFrame(() => {
            fill.style.width = pct + '%';
            track.setAttribute('aria-valuenow', pct);
          });
          obs.unobserve(s); // only once
        });
      }, {threshold: 0.15});

      skills.forEach(s => observer.observe(s));
    } else {
      // Fallback for old browsers: animate immediately
      skills.forEach(s => {
        const pct = parseInt(s.getAttribute('data-percent') || 0, 10);
        s.querySelector('.fill').style.width = pct + '%';
        s.querySelector('.track').setAttribute('aria-valuenow', pct);
      });
    }
  })();