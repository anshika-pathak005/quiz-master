# 🧠 Quiz Website

A responsive, browser-based quiz application built with HTML, CSS, and JavaScript.

It fetches questions dynamically from the Open Trivia Database (OTDB), shuffles them locally, and gives users a smooth, interactive quiz experience with score calculation, difficulty selection, and progress tracking.

## ✨ Features

### 🎮 Core Gameplay

- ⚡ Dynamic Questions: Fetches quiz questions using fetchOTDB(amount, category, difficulty)  
- 🖥 Category Pre-Set: Uses Computers (18) category by default  
- 🎚 Difficulty Levels: Easy / Medium / Hard selection via dropdown  
- 🔀 Randomized Order: Questions and options shuffled using shuffle()  
- 🔎 HTML Decoding: Converts encoded entities (like &quot;, &amp;) using decodeHTML()  
- 🚫 Single Attempt: Options disable after answering, preventing changes  
- 🧮 Score Calculation: Increments automatically on correct answers  
- ⏭ Auto Next Button: Appears only after selecting an option  

### 🖥 User Interface

- 📜 Landing Page Popup: Displays rules before starting quiz  
- 📱 Responsive Layout: Scales smoothly for desktop and mobile  
- ✒ External Fonts: Google Fonts via @import  
- 🏷 Header with Logo & Nav: Includes space for branding / menu  
- 🎯 Circular Progress Result Screen: Shows animated percentage after quiz  
- 📊 Dynamic Score Display: Updates header score as you play  

### 🛠 Navigation & State Control

- ▶ Start Quiz → Activates quiz box and fetches new questions  
- 🔄 Try Again → Restarts quiz instantly without reloading page  
- 🏠 Go Home → Returns to landing screen and resets progress  
- ❌ Quit Button → Immediately exits quiz and clears state  

### 🎨 Styling

- 🌈 Custom Theme: Magenta (#c40094) accent with black background  
- ✨ Hover Effects: Buttons and options have interactive highlights  
- 🎛 Difficulty Dropdown: Styled `<select>` for modern look  
- 📦 No Extra Libraries: Pure HTML + CSS + JS only  

## 📂 Project Structure

```

quiz-website/
├── index.html    # Page structure
├── style.css     # Visual styles, responsive layout
├── index.js      # Core quiz logic and UI handling
└── assets/       # (images/icons if used)

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

## 🧩 Possible Improvements

- ➕ Add menu toggle logic to make the header nav functional  
- 🔁 Implement restart button inside result screen (no refresh required)  
- 💾 Use localStorage to save scores between sessions  
- 🗂 Add category selector dynamically at start screen  
- ⏱ Include timer per question for more challenge  
- 🔊 Add sound effects for right/wrong answers  

## 📸 Screenshot


## 🙌 Acknowledgments

- 🎥 Tutorial Reference: Followed a YouTube tutorial for basic quiz structure  
- 🌟 Inspiration: Open Trivia DB (https://opentdb.com/) for quiz content  
- 💻 Code: Fully written and customized by me to practice DOM manipulation, API fetching, and UI logic  
