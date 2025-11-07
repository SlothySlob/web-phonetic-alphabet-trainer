const params = new URLSearchParams(window.location.search);
const alphabetName = params.get('alphabet');

fetch('data/alphabets.json')
  .then(res => res.json())
  .then(data => {
    const alphabet = data.find(a => a.Name === alphabetName);
    if (!alphabet) {
      document.body.innerHTML = '<p>Alphabet not found.</p>';
      return;
    }

    document.getElementById('title').textContent = alphabet.FullName;
    document.getElementById('description').textContent = alphabet.Description;

    const gameDiv = document.getElementById('game');
    let index = 0;
    const letters = alphabet.ListOfLetters;

    const question = document.createElement('p');
    const input = document.createElement('input');
    const button = document.createElement('button');
    const feedback = document.createElement('p');

    button.textContent = 'Check';
    gameDiv.append(question, input, button, feedback);

    function next() {
      const { Letter } = letters[index];
      question.textContent = `What is the code word for: ${Letter}?`;
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
