// ===== VALORANT PORTFOLIO – INTERACTIONS =====

// 1. ABILITY BARS ANIMATION ON LOAD
document.addEventListener('DOMContentLoaded', () => {
  const fills = document.querySelectorAll('.ability-fill');
  fills.forEach((fill, index) => {
    const width = fill.style.width; // e.g. "90%"
    fill.style.width = '0%';
    setTimeout(() => {
      fill.style.width = width;
      fill.style.transition = 'width 1s cubic-bezier(0.2, 0.9, 0.4, 1)';
    }, 200 + index * 150);
  });

  // 2. PROJECT ITEMS CLICK FEEDBACK
  const projects = document.querySelectorAll('.project-item');
  projects.forEach((item) => {
    item.addEventListener('click', function() {
      // remove previous selected
      projects.forEach(p => p.style.borderColor = 'rgba(255,255,255,0.04)');
      this.style.borderColor = '#ff4655';
      this.style.transition = '0.15s';
      // tiny haptic feedback
      this.style.transform = 'scale(0.97)';
      setTimeout(() => { this.style.transform = 'scale(1)'; }, 150);
    });
  });

  // 3. SOCIAL BUTTONS – DYNAMIC GLOW
  const socialBtns = document.querySelectorAll('.social-btn');
  socialBtns.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.boxShadow = '0 0 20px #ff465540';
    });
    btn.addEventListener('mouseleave', function() {
      this.style.boxShadow = 'none';
    });
  });

  // 4. CONSOLE EASTER EGG – VALORANT STYLE
  console.log('%c🔥 VALORANT PORTFOLIO', 'font-size:2rem; font-weight:900; color:#ff4655;');
  console.log('%c“Play with fire, become the flame.”', 'font-style:italic; color:#b9b3c9;');

  // 5. RANK BADGE PULSE (extra flair)
  const badge = document.querySelector('.rank-badge');
  if (badge) {
    setInterval(() => {
      badge.style.boxShadow = badge.style.boxShadow ? 'none' : '0 0 16px #ff465580';
    }, 2000);
  }
});

// 6. DYNAMIC YEAR IN FOOTER (optional)
document.addEventListener('DOMContentLoaded', () => {
  const footerLeft = document.querySelector('.footer-left');
  if (footerLeft) {
    const year = new Date().getFullYear();
    footerLeft.innerHTML = `<i class="fas fa-crosshairs"></i> VALORANT PORTFOLIO · ${year}`;
  }
});