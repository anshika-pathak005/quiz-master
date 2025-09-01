# 🧠 Quiz Website

A responsive, browser-based quiz application built with HTML, CSS, and JavaScript.

It fetches questions dynamically from the Open Trivia Database (OTDB), shuffles them locally, and gives users a smooth, interactive quiz experience with score calculation, difficulty selection, and progress tracking.

## 🌐 Online & Offline Mode Support  
- Online: When the user is connected to the internet, quiz questions are fetched dynamically from an external database. 
- Offline: If no internet connection is available, questions are loaded locally from the questions.js file to ensure uninterrupted gameplay.
- 
## ✨ Features

- ⚡ Dynamic Questions: Fetches quiz questions using fetchOTDB(amount, category, difficulty)  
- 🖥 Category Pre-Set: Uses Computers (18) category by default  
- 🎚 Difficulty Levels: Easy / Medium / Hard selection via dropdown  
- 🔀 Randomized Order: Questions and options shuffled using shuffle()  
- 🔎 HTML Decoding: Converts encoded entities (like &quot;, &amp;) using decodeHTML()  
- 🚫 Single Attempt: Options disable after answering, preventing changes  
- 🧮 Score Calculation: Increments automatically on correct answers  
- ⏭ Auto Next Button: Appears only after selecting an option  

## 📂 Project Structure

```

quiz-website/
├── index.html    # Page structure
├── style.css     # Visual styles, responsive layout
├── index.js      # Core quiz logic and UI handling
├── questions.js      # quetions for offline
└── Bg.jpg       # background 

```

## 🚀 How It Works

1. Page Load → Welcome popup explains rules.  
2. Select Level → User chooses difficulty (optional).  
3. Start Quiz → fetchOTDB() loads 10 questions dynamically.  
4. Answer Questions → Options disable on click, score updates in real time.  
5. Next Button → Appears only after choosing an answer.  
6. Result Screen → Displays animated circular progress and final score.  
7. Try Again / Go Home → Instantly restart or exit.  

## 🔑 Key Functions

- fetchOTDB(amount, category, difficulty) → Fetches questions from OTDB API.  
- mapOTDBToLocal(results) → Converts raw API data into {numb, question, answer, options[]} format.  
- decodeHTML(str) → Ensures question text renders correctly.  
- shuffle(arr) → Randomizes options to avoid predictability.  
- optionSelected(answer) → Marks correct/incorrect answers and updates score.  
- showResultBox() → Builds animated results screen dynamically.  

## 📸 Screenshot

### 🏠 Landing Page  
<img width="800" height="400" alt="image" src="https://github.com/user-attachments/assets/c449744c-4916-4063-914a-eb4238e0d4ae" />

### 📜 Rules & Level Selection  
<img width="800" height="400" alt="image" src="https://github.com/user-attachments/assets/767436eb-6862-4433-b2aa-64a4e67a1be5" />

### 📝 Quiz in Progress  
<img width="800" height="400" alt="image" src="https://github.com/user-attachments/assets/97806908-6575-4b74-a5f4-d6c8e9c65d71" />

### 🏆 Results Screen  
<img width="800" height="400" alt="image" src="https://github.com/user-attachments/assets/923a02e8-9643-4c02-9191-a34db1bf3706" />

## 🙌 Acknowledgments

- 🎥 Tutorial Reference: Followed a YouTube tutorial for basic quiz structure  
- 🌟 Inspiration: Open Trivia DB (https://opentdb.com/) for quiz content  
- 💻 Code: Fully written and customized by me to practice DOM manipulation, API fetching, and UI logic  
