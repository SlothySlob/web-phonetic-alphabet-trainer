const params = new URLSearchParams(window.location.search);
const alphabetName = params.get('alphabet');
const gameMode = params.get('mode');

fetch('data/PhoneticAlphabets.json')
  .then(res => res.json())
  .then(data => {
    const alphabet = data.find(a => a.Name === alphabetName);
    if (!alphabet) {
      document.body.innerHTML = '<p>Alphabet not found.</p>';
      return;
    }

    document.getElementById('title').textContent = alphabet.FullName;
    document.getElementById('alphabet-name').textContent = alphabet.FullName;

    const gameDiv = document.getElementById('game');
    let index = 0;
    const letters = alphabet.ListOfLetters;

    const card = document.createElement('div');
    card.classList.add('card');

    const letter = document.createElement('p');
    letter.classList.add('letter');

    const inputDiv = document.createElement('div');
    inputDiv.classList.add('input-wrapper');

    const input = document.createElement('input');
    input.type = 'text';
    input.autocomplete = 'off';
    input.placeholder = 'Enter code word';
    input.spellcheck = false;

    const submitBtn = document.createElement('a');
    submitBtn.classList.add('btn');
    submitBtn.textContent = 'Submit';

    inputDiv.append(input, submitBtn);
    card.append(letter, inputDiv);
    gameDiv.append(card);

    const feedback = document.createElement('p');
    const feedbackDiv = document.getElementById('feedback');
    feedbackDiv.append(feedback);

    const instructionsDiv = document.getElementById('instructions');
    instructionsDiv.innerHTML = '';

    if (gameMode === 'practice') {
      instructionsDiv.innerHTML = `
        <div class="card">
          <p>Type out the code word for the presented sign.</p>
          <p>After you've finished, you can <b>press Enter</b> or <b>click Submit</b>.</p>
        </div>
      `;
      
      const listDiv = document.getElementById('list');
      listDiv.innerHTML = '';

      const cheatSheetDiv = document.createElement('div');
      cheatSheetDiv.id='cheat-sheet';

      alphabet.ListOfLetters.forEach(item => {
        const pair = document.createElement('div');
        pair.textContent = `${item.Letter} — ${item.Codename}`;
        cheatSheetDiv.append(pair);
      });
      listDiv.append(cheatSheetDiv);
    }
    else if (gameMode === 'time-trial') {
      instructionsDiv.innerHTML = `
        <div class="card">
          <p>The moment you <b>click into</b> the input box, <b>the timer will start</b>.</p>
          <p>You can <b>press Enter</b> or <b>click Submit</b> to submit your code word.</p>
        </div>
      `;
    }

    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        submitBtn.click();
      }
    });

    function next() {
      const { Letter } = letters[index];
      letter.textContent = `${Letter}`;
      input.value = '';
      feedback.textContent = '';
    }

    function nextRandom() {
      let newIndex;

      do {
        newIndex = Math.floor(Math.random() * letters.length);
      } while (newIndex === index && letters.length > 1);

      index = newIndex;

      const { Letter } = letters[index];
      letter.textContent = `${Letter}`;
      input.value = '';
      feedback.innerHTML = '';
      input.focus();
    }

    submitBtn.onclick = () => {
      feedback.innerHTML = '';
      feedback.classList.remove('correct', 'incorrect');
      const { Codename } = letters[index];
      if (input.value.trim().toLowerCase() === Codename.toLowerCase()) {
        feedback.classList.add('correct');
        feedback.textContent = `Correct!`;
      } else {
        feedback.classList.add('incorrect');
        feedback.textContent = `Incorrect! It's ${Codename}`;
      }

      index = (index + 1) % letters.length;
      setTimeout(nextRandom, 1000);
    };

    nextRandom();
  });
