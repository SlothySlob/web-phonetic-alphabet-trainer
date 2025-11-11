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

    const maxCycles = 10;
    let currentCycle = 0;
    let index = 0;
    const letters = alphabet.ListOfLetters;

    let startTime = null;
    let timerInterval = null;

    document.getElementById('title').textContent = alphabet.FullName;
    document.getElementById('alphabet-name').textContent = alphabet.FullName;

    const gameWrapper = document.getElementById('game-wrapper');
    const gameDiv = document.createElement('div');
    gameDiv.id = 'game';
    const instructionsDiv = document.createElement('div');
    instructionsDiv.id = 'instructions';
    gameWrapper.append(gameDiv, instructionsDiv);

    // Card for letter + input
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

    // Feedback element (always present)
    const feedbackDiv = document.getElementById('feedback');
    feedbackDiv.innerHTML = ''; 
    const feedback = document.createElement('p');
    feedbackDiv.append(feedback);

    // Time-trial elements
    let timeTrialCycles, timeTrialTimer;
    let timeTrialOptions, timeTrialRetryBtn; // <- declare here
    if (gameMode === 'time-trial') {
      const timeTrialWrapper = document.getElementById('time-trial-wrapper');
      timeTrialWrapper.innerHTML = '';

      const timeTrialCard = document.createElement('div');
      timeTrialCard.classList.add('card');

      timeTrialCycles = document.createElement('p');
      timeTrialCycles.textContent = padCycle(currentCycle, maxCycles);

      timeTrialTimer = document.createElement('p');
      timeTrialTimer.textContent = '00:00.000';

      timeTrialCard.append(timeTrialCycles, timeTrialTimer);

      timeTrialOptions = document.createElement('div');
      timeTrialOptions.id = 'time-trial-options';

      timeTrialRetryBtn = document.createElement('a');
      timeTrialRetryBtn.classList.add('btn');
      timeTrialRetryBtn.innerText = 'Retry';
      timeTrialRetryBtn.onclick = () => location.reload();

      timeTrialWrapper.append(timeTrialCard, timeTrialOptions);

      // Start timer on first focus
      input.addEventListener('focus', () => {
        if (!startTime) {
          startTime = performance.now();
          timerInterval = setInterval(() => {
            const elapsed = performance.now() - startTime;
            timeTrialTimer.textContent = formatTime(elapsed);
          }, 50);
        }
      });
    }

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
      cheatSheetDiv.id = 'cheat-sheet';

      alphabet.ListOfLetters.forEach(item => {
        const pair = document.createElement('div');
        pair.textContent = `${item.Letter} — ${item.Codename}`;
        cheatSheetDiv.append(pair);
      });
      listDiv.append(cheatSheetDiv);
    } else if (gameMode === 'time-trial') {
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

    const normalize = str => str.trim().toLowerCase().replace(/[-\s]/g, '');

    function nextRandom() {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * letters.length);
      } while (newIndex === index && letters.length > 1);
      index = newIndex;

      letter.textContent = letters[index].Letter;
      input.value = '';
      input.focus();
    }

    submitBtn.onclick = () => {
      const { Codename } = letters[index];
      const userInput = normalize(input.value);
      const correctAnswer = normalize(Codename);

      // Clear previous feedback before showing new one
      feedback.classList.remove('correct', 'incorrect');

      if (userInput === correctAnswer) {
        feedback.classList.add('correct');
        feedback.textContent = 'Correct!';
        if (gameMode === 'time-trial') {
          currentCycle += 1;
          timeTrialCycles.textContent = padCycle(currentCycle, maxCycles);

          if (currentCycle >= maxCycles) {
            clearInterval(timerInterval);
            const totalTime = performance.now() - startTime;
            timeTrialTimer.textContent = `Final Time: ${formatTime(totalTime)}`;
            input.disabled = true;
            submitBtn.classList.add('disabled');
            gameWrapper.innerHTML = '';
            feedback.textContent = `You're pretty good.`;
            feedback.classList.remove('correct', 'incorrect');
            timeTrialOptions.append(timeTrialRetryBtn);
            return;
          }
        }
      } else {
        feedback.classList.add('incorrect');
        feedback.textContent = `Incorrect! It's ${Codename}`;
      }

      nextRandom();
    };

    function formatTime(ms) {
      const seconds = Math.floor(ms / 1000);
      const minutes = Math.floor(seconds / 60);
      const millis = Math.floor(ms % 1000);
      return `${String(minutes).padStart(2,'0')}:${String(seconds % 60).padStart(2,'0')}.${String(millis).padStart(3,'0')}`;
    }

    function padCycle(current, max) {
      const width = String(max).length;
      return String(current).padStart(width, '0') + '/' + max;
    }

    nextRandom();
  });
