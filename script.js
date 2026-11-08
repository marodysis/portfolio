(function() {
  "use strict";

  // ========== 1. TYPING EFFECT (updated to match your stack) ==========
  function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const texts = [
      'System Analyst',
      'Android Developer',
      'C# Desktop Dev',
      'Multi-Stack Dev',
      'UI/UX Enthusiast'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';
    
    function typeEffect() {
      const fullText = texts[textIndex];
      
      if (isDeleting) {
        currentText = fullText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        currentText = fullText.substring(0, charIndex + 1);
        charIndex++;
      }
      
      typingElement.textContent = '▶ ' + currentText;
      
      if (!isDeleting && charIndex === fullText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
      }
      
      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeEffect, 500);
        return;
      }
      
      const speed = isDeleting ? 50 : 100;
      setTimeout(typeEffect, speed);
    }
    
    typeEffect();
  }

  // ========== 2. THEME TOGGLE ==========
  function initThemeToggle() {
    const toggleBtn = document.getElementById('themeToggle');
    let isDark = true;
    
    toggleBtn.addEventListener('click', function() {
      isDark = !isDark;
      document.body.classList.toggle('light-theme', !isDark);
      toggleBtn.textContent = isDark ? '🌙 Night Mode' : '☀️ Day Mode';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
      toggleBtn.textContent = '☀️ Day Mode';
      isDark = false;
    }
  }

  // ========== 3. PIXEL ART CANVAS ==========
  function initPixelCanvas() {
    const canvas = document.getElementById('pixelCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const pixelSize = 10;
    const gridSize = 16;
    let isDrawing = false;
    let isErasing = false;
    let currentColor = '#c8a0f0';
    
    let grid = Array(gridSize).fill().map(() => Array(gridSize).fill(null));
    
    function drawPixel(x, y, color) {
      if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) return;
      grid[y][x] = color;
      ctx.fillStyle = color || '#1a0a30';
      ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      ctx.strokeStyle = 'rgba(74, 42, 122, 0.3)';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    }
    
    function clearCanvas() {
      grid = Array(gridSize).fill().map(() => Array(gridSize).fill(null));
      ctx.fillStyle = '#1a0a30';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    function getGridPosition(e) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const mouseX = (e.clientX - rect.left) * scaleX;
      const mouseY = (e.clientY - rect.top) * scaleY;
      return {
        x: Math.floor(mouseX / pixelSize),
        y: Math.floor(mouseY / pixelSize)
      };
    }
    
    canvas.addEventListener('mousedown', function(e) {
      e.preventDefault();
      const pos = getGridPosition(e);
      if (e.button === 2) {
        isErasing = true;
        drawPixel(pos.x, pos.y, null);
      } else {
        isDrawing = true;
        drawPixel(pos.x, pos.y, currentColor);
      }
    });
    
    canvas.addEventListener('mousemove', function(e) {
      e.preventDefault();
      const pos = getGridPosition(e);
      if (isDrawing) {
        drawPixel(pos.x, pos.y, currentColor);
      } else if (isErasing) {
        drawPixel(pos.x, pos.y, null);
      }
    });
    
    canvas.addEventListener('mouseup', function() {
      isDrawing = false;
      isErasing = false;
    });
    
    canvas.addEventListener('mouseleave', function() {
      isDrawing = false;
      isErasing = false;
    });
    
    canvas.addEventListener('contextmenu', function(e) {
      e.preventDefault();
    });
    
    const colorPicker = document.getElementById('pixelColor');
    if (colorPicker) {
      colorPicker.addEventListener('input', function(e) {
        currentColor = e.target.value;
      });
    }
    
    const clearBtn = document.getElementById('clearCanvas');
    if (clearBtn) {
      clearBtn.addEventListener('click', clearCanvas);
    }
    
    const randomBtn = document.getElementById('randomArt');
    if (randomBtn) {
      randomBtn.addEventListener('click', function() {
        clearCanvas();
        const colors = ['#c8a0f0', '#4a2a7a', '#6a3aaa', '#f7f2b0', '#ff6b6b', '#4ecdc4', '#45b7d1'];
        for (let i = 0; i < 30; i++) {
          const x = Math.floor(Math.random() * gridSize);
          const y = Math.floor(Math.random() * gridSize);
          const color = colors[Math.floor(Math.random() * colors.length)];
          drawPixel(x, y, color);
        }
      });
    }
    
    const exportBtn = document.getElementById('exportArt');
    if (exportBtn) {
      exportBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        link.download = 'pixel-art.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
    
    clearCanvas();
  }

  // ========== 4. CONFETTI ==========
  function createConfetti() {
    const colors = ['#c8a0f0', '#4a2a7a', '#f7f2b0', '#6a3aaa', '#ff6b6b', '#4ecdc4', '#45b7d1', '#ffd93d'];
    
    for (let i = 0; i < 50; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      
      const size = 4 + Math.random() * 6;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const duration = 2 + Math.random() * 2;
      const delay = Math.random() * 0.5;
      const rotation = Math.random() * 360;
      
      piece.style.cssText = `
        left: ${left}%;
        top: -10px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        transform: rotate(${rotation}deg);
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        box-shadow: 0 0 4px ${color}40;
      `;
      
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), (duration + delay) * 1000 + 100);
    }
  }

  // ========== 5. FIREFLIES ==========
  function createFireflies() {
    const container = document.getElementById('firefliesContainer');
    if (!container) return;
    
    const fireflyCount = 25;
    
    for (let i = 0; i < fireflyCount; i++) {
      const firefly = document.createElement('div');
      firefly.className = 'firefly';
      
      const x = Math.random() * 100;
      const y = 20 + Math.random() * 60;
      const size = 3 + Math.random() * 4;
      const duration = 8 + Math.random() * 12;
      const delay = Math.random() * 10;
      const hue = 45 + Math.random() * 20;
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

  // ========== 6. CLICK COUNTER ==========
  let clickCount = 0;
  const counterSpan = document.getElementById('clickCounter');
  const clickBtn = document.getElementById('clickBtn');
  const resetBtn = document.getElementById('resetCounterBtn');

  function updateCounter() {
    counterSpan.textContent = clickCount;
  }

  clickBtn.addEventListener('click', function() {
    clickCount++;
    updateCounter();
    counterSpan.style.background = '#4a2a7a';
    setTimeout(() => counterSpan.style.background = 'rgba(45, 27, 78, 0.8)', 120);
    
    if (clickCount % 10 === 0) {
      createConfetti();
    }
  });

  resetBtn.addEventListener('click', function() {
    clickCount = 0;
    updateCounter();
    counterSpan.style.background = 'rgba(10, 6, 24, 0.8)';
    setTimeout(() => counterSpan.style.background = 'rgba(45, 27, 78, 0.8)', 150);
  });

  // ========== 7. GREETING ==========
  const greetBtn = document.getElementById('greetBtn');
  const greetingDisplay = document.getElementById('greetingDisplay');

  const greetings = [
    'hello, traveller', 
    '⚡ pixel mage', 
    '🎮 game on!', 
    '🧙 ready to code',
    '✨ 32‑bit magic',
    '🕹️ press start'
  ];
  let greetIndex = 0;

  greetBtn.addEventListener('click', function() {
    greetIndex = (greetIndex + 1) % greetings.length;
    greetingDisplay.textContent = greetings[greetIndex];
    greetingDisplay.style.background = '#4a2a7a';
    setTimeout(() => greetingDisplay.style.background = 'rgba(45, 27, 78, 0.8)', 150);
    
    if (greetings[greetIndex] === '⚡ pixel mage' || greetings[greetIndex] === '✨ 32‑bit magic') {
      createConfetti();
    }
  });

  // ========== 8. LEVEL UP ==========
  const levelUpBtn = document.getElementById('levelUpBtn');
  const xpSpan = document.getElementById('xpValue');

  levelUpBtn.addEventListener('click', function() {
    let currentXp = xpSpan.textContent;
    let level = parseInt(currentXp.replace('lv. ', ''), 10);
    if (isNaN(level)) level = 8;
    level = Math.min(level + 1, 99);
    xpSpan.textContent = `lv. ${level}`;
    levelUpBtn.style.background = '#7a5aaa';
    setTimeout(() => levelUpBtn.style.background = '#4a2a7a', 150);
    greetingDisplay.textContent = '⬆ level up!';
    setTimeout(() => {
      greetingDisplay.textContent = greetings[greetIndex % greetings.length];
    }, 1200);
    
    createConfetti();
    setTimeout(createConfetti, 300);
  });

  // ========== INITIALIZE ==========
  createFireflies();
  initTypingEffect();
  initThemeToggle();
  initPixelCanvas();
  updateCounter();
  
  console.log('🏰 Portfolio ready · PHAQS + Expense Tracker + Food & Table');
})();