# Project Brief

## Idea

Language learning app.
User creates list of words they think they've learned in their target language and their translation to their mother tongue. User is then presented with random notifications asking them to translate their words and if they get it right the word is added to their certified learned words.

## Tech Stack

* React
* Express
* PostgreSQL
* Auth0
* IBM Watson Translator API

## Models

### User

* ID
* First Name
* Last Name
* Username
* Password
* Mother Tongue
* Target Language
* Frequency of Tests

### Words

* ID
* Mother Tongue Translation
* Target Language Translation
* Is Learned?

## Views

* Profile summary dashboard (number of words learned, number of words left to learn)
* Words page (see list of words, delete words)
* Add Word
* Update Word
* Config page for changing mother tongue, target language and frequency of test notifications
