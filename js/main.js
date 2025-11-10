fetch('data/PhoneticAlphabets.json')
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

      const practicebtn = document.createElement('a');
      practicebtn.href = `game.html?alphabet=${encodeURIComponent(alpha.Name)}`;
      practicebtn.textContent = 'Letter Spelling';
      practicebtn.classList.add('btn');

      const timetrialbtn = document.createElement('a');
      timetrialbtn.href = `game.html?alphabet=${encodeURIComponent(alpha.Name)}`;
      timetrialbtn.textContent = 'Time Trial';
      timetrialbtn.classList.add('btn');

      card.append(name, desc, practicebtn, timetrialbtn);
      container.appendChild(card);
    });
  });
