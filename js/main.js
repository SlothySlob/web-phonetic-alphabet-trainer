fetch('data/alphabets.json')
  .then(response => response.json())
  .then(alphabets => {
    const container = document.getElementById('alphabet-list');

    alphabets.forEach(alpha => {
      const card = document.createElement('div');
      card.classList.add('alphabet-card');

      const name = document.createElement('h2');
      name.textContent = alpha.FullName;

      const desc = document.createElement('p');
      desc.textContent = alpha.Description;

      const btn = document.createElement('a');
      btn.href = `game.html?alphabet=${encodeURIComponent(alpha.Name)}`;
      btn.textContent = 'Start Training';
      btn.classList.add('btn');

      card.append(name, desc, btn);
      container.appendChild(card);
    });
  });
