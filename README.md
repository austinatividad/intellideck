![image](https://github.com/austinatividad/intellideck/assets/114718588/693457ff-5ba9-4818-a5be-88c013a40c34)

a platform that integrates AI to help you memorize concepts and terminologies through flashcards

This personal side project is a Proof of Concept test of a fine-tuned LLM's ability to create educational flashcards for memorization, including a functioning minimum viable product web application for creating and storing AI-created flashcards. This web application aims to advocate for leveraging AI tools in education, as I believe AI can be used CORRECTLY for its users to actually learn! (there is a SIGNIFICANT difference between plagiarizing ChatGPT and treating it as another reference and cross-validating with other sources!)

Note: The model I am currently using is NOT fine-tuned yet. (No money 😭)

## Features!
1. **Creating AI-Generated Flashcards**
   - The main feature of IntelliDeck! It uses a large language model to generate a deck of flashcards based on the user's input.
2. **Viewing Created Decks**
   - Currently, the web application only lets users view the decks of flashcards they generated. Future plans include the modification of these decks!

## Short Demo
To gain an idea of what IntelliDeck is, please watch the short demo below:

[![IntelliDeck v0.2 Demo](https://img.youtube.com/vi/dugGYZptags/0.jpg)](https://www.youtube.com/watch?v=dugGYZptags)

## Planned Features 📌
1. **Practice Tool**
    - The user gets to use their flashcards in a game where they could practice on a deck they created.
    - The game goes indefinitely, and the basis of scoring is their streak of getting the cards correct.
    - Different practice modes may also be implemented!
2. **Editing and Deleting Cards**
    - IntelliDeck does not guarantee perfect results (yet?) therefore, users can modify the definition and term of the generated flashcards.
3. **Manual Creation of Decks and Cards**
    - While IntelliDeck is a web application focusing on AI-generated flashcards, it is still essentially designed to be a learning tool for anyone. My goal is still to create a
4. **Images!**
    - Some learners may be able to memorize concepts more with visualizations. If flashcards could include images, the learning and familiarization rates may even be better!
    - The default option is to let users drag and drop their images into the flashcards
    - If possible (albeit expensive), image-generation AI can also be integrated in the future
5. **User System**
    - Currently, IntelliDeck is on a single centralized database. If everything goes well, I could implement a user system where each user would have their decks and cards, but this is currently impossible due to my current implementation of the ChatGPT API wrapper I use.
## Setup
1. Clone the repository
2. Install the required packages
```bash
npm install
```
3. Run the backend server
```bash
node server.js
```
4. Setup ChatGPT API server (To be Replaced!)
    - Follow the instructions on starting the ChatGPT API server from [here](https://github.com/zsodur/chatgpt-api-by-browser-script)
    - Make sure the CORS block is removed from the ChatGPT API server to allow requests from the IntelliDeck server using this [extension](https://chrome.google.com/webstore/detail/ieelmcmcagommplceebfedjlakkhpden)
    - Following the instructions correctly will display `API Connected!` in ChatGPT.
5. Run the frontend server
```bash
npm run serve
```
6. Open the browser and go to `localhost:8080`
