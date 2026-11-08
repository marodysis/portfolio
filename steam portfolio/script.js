// ===== GAME DATA =====
const games = [
  { title: 'Cyber City 2077', icon: '🏙️', status: 'In Development' },
  { title: 'Pixel Racer', icon: '🏎️', status: 'Released' },
  { title: 'Dungeon Keeper', icon: '⚔️', status: 'Early Access' },
  { title: 'Space Explorers', icon: '🚀', status: 'Prototype' },
  { title: 'Rhythm Arena', icon: '🎵', status: 'Released' },
  { title: 'Mystic Woods', icon: '🌲', status: 'Coming Soon' },
];

// ===== RENDER GAME CARDS =====
function renderGames() {
  const container = document.getElementById('gamesContainer');
  if (!container) return;

  container.innerHTML = games.map(game => `
    <div class="game-card">
      <div class="game-img">${game.icon}</div>
      <div class="game-title">${game.title}</div>
      <div class="game-meta">
        <span>🎮 ${game.status}</span>
        <span class="game-status">${game.status === 'Released' ? '✅' : '⏳'}</span>
      </div>
    </div>
  `).join('');
}

// ===== NAVIGATION INTERACTION =====
function setupNav() {
  const navLinks = document.querySelectorAll('.steam-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

// ===== PROFILE BUTTON ALERT =====
function setupProfileButton() {
  const btn = document.querySelector('.steam-button');
  if (btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      alert('✏️ Edit profile: This would open your Steam profile settings.');
    });
  }
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderGames();
  setupNav();
  setupProfileButton();
  console.log('🎮 Steam Portfolio loaded successfully!');
});