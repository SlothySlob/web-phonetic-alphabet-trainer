fetch('data/PhoneticAlphabets.json')
  .then(response => response.json())
  .then(alphabets => {
    const container = document.getElementById('alphabet-list');

    alphabets.forEach(alpha => {
      const card = document.createElement('div');
      card.classList.add('card');

      const name = document.createElement('h2');
      name.textContent = alpha.FullName;

      const desc = document.createElement('p');
      desc.textContent = alpha.Description;

      const letterSpellingRow = document.createElement('div');
      letterSpellingRow.classList.add('button-row');

      const practiceBtn = document.createElement('a');
      practiceBtn.href = `letter-spelling.html?alphabet=${encodeURIComponent(alpha.Name)}&mode=practice`;
      practiceBtn.textContent = 'Letter Spelling';
      practiceBtn.classList.add('btn');
      practiceBtn.classList.add('practice');

      const timeTrialBtn = document.createElement('a');
      timeTrialBtn.href = `letter-spelling.html?alphabet=${encodeURIComponent(alpha.Name)}&mode=time-trial`;
      timeTrialBtn.textContent = 'Time Trial';
      timeTrialBtn.classList.add('btn');
      timeTrialBtn.classList.add('time-trial');

      letterSpellingRow.append(practiceBtn, timeTrialBtn);

      card.append(name, desc, letterSpellingRow);
      container.appendChild(card);
    });
  });
