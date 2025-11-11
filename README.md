# Phonetic Alphabet Trainer

The project was created with the intention to practice phonetic alphabets, and to practice and or learn JS, CSS and what options there are for static pages.

Link to the page: [Link](https://slothyslob.github.io/web-phonetic-alphabet-trainer/)

## Table of contents

- [Git Pages](#git-pages)
- [Index / Home page](#index--home-page)
- [Letter Spelling page](#letter-spelling-page)
  - [Game type](#game-type)
    - [Practice mode](#practice-mode)
    - [Time Trial](#time-trial)
- [Phonetic Alphabets DB](#phonetic-alphabets-db)

## Git Pages

I don't exactly know if it's a standard or not, but the public release, or what you see on the static page, is on the **public branch**.

## Index / Home page

The contents of the page is generated based on the [PhoneticAlphabets.json](data/PhoneticAlphabets.json), which represents a database.

Here the user can select which alphabet to practice, by selecting either the name of the practice type or it's time trial version.

## Letter Spelling page

The contents of the page are generated based on the game type selected on the home page. On the top bar, the user will have an option to return back to the home page at any moment.

> [!TIP]
> The game mode is not case sensitive, ignores spaces and special characters. This was done specifically for exanples as for example "X-ray"

### Game type

This game type allows you to practice the spelling of a letter. You're required to type out the code word of the letter.

#### Practice mode

The user is not under any constraint and may practice the words for as long as they like. There's a cheat sheet at the bottom for that extra help, or if the user just wishes to read out the alphabet.

> [!TIP]
> Make sure to pronounce the code words too!

#### Time Trial

In this game mode, the user is timed. The goal is to type out the code words as quickly as possible to get as low of a time as possible. 

> [!NOTE]
> Sadly, since this is a static page, high scores are pointless to implement.

> [!WARNING]
> Sadly, I did not implement some sort of an audio playback to hear "proper" pronounciation of the code words. Generally, as long as you know English it shouldn't be a problem.

## Phonetic Alphabets DB

The file has a fairly straigh forward structure. The same file structure is used for a different project, the [PhoneticAlphabetTrainer](https://github.com/SlothySlob/PhoneticAlphabetTrainer)

``` json
{
    "Name": "NATO",
    "FullName": "NATO Phonetic Alphabet",
    "Description": "[HARDCODED] The NATO phonetic alphabet is a set of code words assigned to the letters of the English alphabet to ensure clarity in oral communication, especially over radio or telephone. It is widely used in military, aviation, and maritime contexts to prevent misunderstandings due to similar-sounding letters.",
    "ListOfLetters": [
      { "Letter": "A", "Codename": "Alfa" },
      { "Letter": "B", "Codename": "Bravo" },
      { "Letter": "C", "Codename": "Charlie" },
      { "Letter": "D", "Codename": "Delta" },
      { "Letter": "E", "Codename": "Echo" },
      { "Letter": "F", "Codename": "Foxtrot" },
      { "Letter": "G", "Codename": "Golf" },
      { "Letter": "H", "Codename": "Hotel" },
      { "Letter": "I", "Codename": "India" },
      { "Letter": "J", "Codename": "Juliett" },
      { "Letter": "K", "Codename": "Kilo" },
      { "Letter": "L", "Codename": "Lima" },
      { "Letter": "M", "Codename": "Mike" },
      { "Letter": "N", "Codename": "November" },
      { "Letter": "O", "Codename": "Oscar" },
      { "Letter": "P", "Codename": "Papa" },
      { "Letter": "Q", "Codename": "Quebec" },
      { "Letter": "R", "Codename": "Romeo" },
      { "Letter": "S", "Codename": "Sierra" },
      { "Letter": "T", "Codename": "Tango" },
      { "Letter": "U", "Codename": "Uniform" },
      { "Letter": "V", "Codename": "Victor" },
      { "Letter": "W", "Codename": "Whiskey" },
      { "Letter": "X", "Codename": "X-ray" },
      { "Letter": "Y", "Codename": "Yankee" },
      { "Letter": "Z", "Codename": "Zulu" }
    ]
  }
  ```