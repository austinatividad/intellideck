# IntelliDeck
a platform that integrates AI to help you memorize concepts and terminologies through flashcards

This project is a Proof of Concept test of a fine-tuned LLM's ability to create educational flashcards for memorization. Also provides a functioning web application for creating and storing AI-created flashcards.


## Setup
1. Clone the repository
2. Install the required packages
```bash
npm install
```
3. Run backend server
```bash
node server.js
```
4. Setup ChatGPT API server
    - Follow the instructions on starting the ChatGPT API server from [here](https://github.com/zsodur/chatgpt-api-by-browser-script)
    - Make sure the CORS block is removed from the ChatGPT API server to allow requests from the IntelliDeck server using this [extension](https://chrome.google.com/webstore/detail/ieelmcmcagommplceebfedjlakkhpden)
    - Following the instructions correctly will display `API Connected!` in ChatGPT.
5. Run frontend server
```bash
npm run build
```
6. Open the browser and go to `localhost:8080`