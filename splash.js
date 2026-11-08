(function() {
  "use strict";

  const startBtn = document.getElementById('startBtn');
  const splashContainer = document.querySelector('.splash-container');

  // Create fireflies (pixel particles)
  function createFireflies() {
    const container = document.getElementById('firefliesContainer');
    const fireflyCount = 30;
    
    for (let i = 0; i < fireflyCount; i++) {
      const firefly = document.createElement('div');
      firefly.className = 'firefly';
      
      // Random position
      const x = Math.random() * 100;
      const y = 20 + Math.random() * 60; // Keep in upper portion
      
      // Random size (pixel-like)
      const size = 3 + Math.random() * 4;
      
      // Random animation duration and delay
      const duration = 8 + Math.random() * 12;
      const delay = Math.random() * 10;
      
      // Random glow color variation
      const hue = 45 + Math.random() * 20; // Yellow-gold range
      const brightness = 80 + Math.random() * 20;
      
      firefly.style.left = x + '%';
      firefly.style.top = y + '%';
      firefly.style.width = size + 'px';
      firefly.style.height = size + 'px';
      firefly.style.animationDuration = duration + 's';
      firefly.style.animationDelay = delay + 's';
      firefly.style.background = `hsl(${hue}, 100%, ${brightness}%)`;
      firefly.style.boxShadow = `0 0 ${size * 3}px hsla(${hue}, 100%, ${brightness}%, 0.3)`;
      
      container.appendChild(firefly);
    }
  }

  // Initialize fireflies
  createFireflies();

  // Handle START button click
  startBtn.addEventListener('click', function(e) {
    splashContainer.classList.add('transitioning');
    startBtn.disabled = true;
    startBtn.style.opacity = '0.5';
    startBtn.style.cursor = 'default';
    
    setTimeout(function() {
      window.location.href = 'index.html';
    }, 600);
  });

  // Keyboard support
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!startBtn.disabled) {
        startBtn.click();
      }
    }
  });

  console.log('🏰 Castle with fireflies ready!');
})();