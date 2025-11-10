const params = new URLSearchParams(window.location.search);
const alphabetName = params.get('alphabet');

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

    const question = document.createElement('p');
    const input = document.createElement('input');
    const button = document.createElement('button');
    const feedback = document.createElement('p');

    button.textContent = 'Submit';

    card.append(question, input, button);

    gameDiv.append(card, feedback);

    function next() {
      const { Letter } = letters[index];
      question.textContent = `${Letter}`;
      input.value = '';
      feedback.textContent = '';
    }

    button.onclick = () => {
      const { Codename } = letters[index];
      if (input.value.trim().toLowerCase() === Codename.toLowerCase()) {
        feedback.textContent = '✅ Correct!';
      } else {
        feedback.textContent = `❌ It's ${Codename}`;
      }

      index = (index + 1) % letters.length;
      setTimeout(next, 1000);
    };

    next();
  });
