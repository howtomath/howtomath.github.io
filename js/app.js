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

document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('page-content');
  const links = document.querySelectorAll('.nav-link');

  const pages = {
    games: '<h2>Games</h2><div class="game-container" id="game-container"></div>',
    news: '<h2>News</h2><p>All the updates go here!</p>',
    about: '<h2>About</h2><p>Made with love by Gavin 💚</p>',
    suggest: `<h2>Suggest</h2>
      <p>Send ideas or report bugs.</p>
      <form id="suggestion-form">
        <select name="type" required>
          <option value="">-- Choose --</option>
          <option value="game">Game</option>
          <option value="bug">Bug</option>
        </select>
        <textarea name="message" placeholder="Type your message here..." required></textarea>
        <button type="submit">Submit</button>
      </form>
      <p id="form-msg"></p>`
  };

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const page = link.getAttribute('data-page');
      if (!page || !pages[page]) return;

      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      content.innerHTML = pages[page];
      if (page === 'games') loadGames();
    });
  });

  function loadGames() {
    fetch('/data/games.json')
      .then(res => res.json())
      .then(games => {
        const container = document.getElementById('game-container');
        if (!container) return;

        container.innerHTML = '';
        games.forEach(game => {
          const a = document.createElement('a');
          a.href = game.link;
          a.innerHTML = `<img src="${game.image}" alt="${game.title}" class="game-image" title="${game.title}">`;
          container.appendChild(a);
        });
      });
  }

  // Default to games page
  content.innerHTML = pages.games;
  loadGames();
});
