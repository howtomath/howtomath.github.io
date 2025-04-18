// Clock Update
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}
setInterval(updateClock, 1000);
updateClock();

// Game Data Loader (using JSON)
function loadGames() {
  fetch('/assets/json/games.json')
    .then(response => response.json())
    .then(data => {
      const gameContainer = document.querySelector('.game-container');
      data.games.forEach(game => {
        const gameElement = document.createElement('a');
        gameElement.href = game.link;
        gameElement.innerHTML = `<img src="${game.image}" alt="${game.name}" class="game-image">`;
        gameContainer.appendChild(gameElement);
      });
    })
    .catch(error => {
      console.error('Error loading game data:', error);
    });
}

// Page Switching Logic
document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('.nav-link');
  const content = document.getElementById('page-content');

  const pages = {
    games: `<h2>Games</h2>
      <p>Here's where your awesome math games go!</p>
      <div class="game-container"></div>`,
    news: `<h2>News</h2><p>All the freshest updates from your favorite site.</p>`,
    about: `<h2>About</h2><p>Made with love by Gavin. Math meets magic ✨</p>`,
    suggest: `<div id="suggestion-form">
      <h2>Suggest</h2>
      <p>Got an idea? Let us know!</p>
      <form>
        <label for="suggestion">Your suggestion:</label>
        <textarea id="suggestion" name="suggestion" required></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>`
  };

  let isTransitioning = false;

  function switchPage(page) {
    if (!pages[page] || isTransitioning) return;
    isTransitioning = true;

    content.classList.remove('slide-in');
    content.classList.add('slide-out');

    setTimeout(() => {
      content.innerHTML = pages[page];
      content.classList.remove('slide-out');
      content.classList.add('slide-in');
      isTransitioning = false;
      if (page === 'games') loadGames();  // Load games only when visiting the "Games" page
    }, 300);
  }

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const page = this.getAttribute('data-page');
      switchPage(page);
    });
  });

  switchPage('games'); // Start on the games page by default
});

// Logo Spin + Fade Effect
document.getElementById('logo-link').addEventListener('click', function (e) {
  e.preventDefault();
  const logo = this;
  logo.classList.add('logo-spin-fade');

  setTimeout(() => {
    window.location.reload();
  }, 600);
});
