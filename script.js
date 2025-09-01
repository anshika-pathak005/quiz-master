const startBtn = document.querySelector(".start_btn")
const popupInfo = document.querySelector(".popup_info")
const exitBtn = document.querySelector(".exit_btn")
const main = document.querySelector(".main")
const continueBtn = document.querySelector(".continue_btn")
const quizSection = document.querySelector(".quiz_section")
const quizBox = document.querySelector(".quiz_box")
const resultBox = document.querySelector(".result_box")
const tryAgainBtn = document.querySelector(".tryAgain_btn")
const goHomeBtn = document.querySelector(".goHome_btn")

// Dynamic Questions -> Open Trivia DB)

// Fetch N multiple-choice questions from OTDB
async function fetchOTDB(amount = 10, category = null, difficulty = null) {
  const params = new URLSearchParams({ amount: String(amount), type: "multiple" });
  if (category) params.set("category", String(category)); 
  if (difficulty) params.set("difficulty", String(difficulty));

  const res = await fetch(`https://opentdb.com/api.php?${params.toString()}`);
  if (!res.ok) throw new Error("Network error");
  const data = await res.json();
  // response_code === 0 means success
  if (data.response_code !== 0) throw new Error("OTDB returned no questions");
  return data.results;
}

// Decode HTML entities (&quot; etc.)
const decodeHTML = (s) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = s;
  return txt.value;
};

// Shuffle utility
const shuffle = (arr) => arr
  .map((v) => ({ v, r: Math.random() }))
  .sort((a, b) => a.r - b.r)
  .map(({ v }) => v);
  
function mapOTDBToLocal(results) {
  return results.map((q, idx) => {
    const question = decodeHTML(q.question);
    const correct = decodeHTML(q.correct_answer);
    const incorrects = q.incorrect_answers.map(decodeHTML);
    const all = shuffle([correct, ...incorrects]);
    const letters = ["A", "B", "C", "D"];
    const optionsLabeled = all.map((opt, i) => `${letters[i]}. ${opt}`);
    const answer = optionsLabeled[all.indexOf(correct)];

    return { numb: idx + 1, question, answer, options: optionsLabeled };
  });
}

startBtn.onclick = ()=>{
    popupInfo.classList.add("active");  
    main.classList.add("active");  
}

exitBtn.onclick = ()=>{
    popupInfo.classList.remove("active");
    main.classList.remove("active");  
}

const levelSelect = document.getElementById("level");

async function startQuizWithQuestions(level) {
  nextBtn.classList.remove("active");
  questionCount = 0;
  questionNumb = 1;
  userScore = 0;

  // Show temporary loading message
  const questionText = document.querySelector(".question_text");
  const optionList = document.querySelector(".option_list");
  if (questionText) questionText.textContent = "Loading questions…";
  if (optionList) optionList.innerHTML = "";

  try {
    // Always fetch Computer category (18)
    const otdb = await fetchOTDB(10, 18, level);
    questions = mapOTDBToLocal(otdb);
  } catch (err) {
    console.warn("Falling back to local questions.js:", err);
    // If fetch fails, questions stays as static from questions.js
  }

  showQuestion(0);
  questionCounter(1);
  headerScore();
}


continueBtn.onclick = async () => {
  const level = levelSelect.value || null;

  // Show quiz section
  quizSection.classList.add("active");
  popupInfo.classList.remove("active");
  main.classList.remove("active");
  quizBox.classList.add("active");

  await startQuizWithQuestions(level);
};





tryAgainBtn.onclick = async () => {
  const level = levelSelect.value || null;

  quizBox.classList.add("active");
  resultBox.classList.remove("active");
  quizSection.classList.add("active");

  await startQuizWithQuestions(level);
};


goHomeBtn.onclick = () => {
  resultBox.classList.remove("active");
  quizSection.classList.remove("active");
  nextBtn.classList.remove("active");

  questionCount = 0;
  questionNumb = 1;
  userScore = 0;
};


let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

//clicking on next btn the questions should be changed
const nextBtn = document.querySelector(".next_btn");

nextBtn.onclick = ()=>{
    if(questionCount < questions.length-1){
        questionCount++;
        showQuestion(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove("active");


    }
    else{
        // console.log("completed")
        showResultBox();
    }
}

//changing the questions
//gettin questions and answers from the array

const optionList = document.querySelector(".option_list");

function showQuestion(index){

    const questionText = document.querySelector(".question_text");

    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
                    <div class="option"><span>${questions[index].options[1]}</span></div>
                    <div class="option"><span>${questions[index].options[2]}</span></div>
                    <div class="option"><span>${questions[index].options[3]}</span></div>
    `;

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll(".option");
    for(let i=0; i<option.length ;i++){
        option[i].setAttribute('onclick','optionSelected(this)')
    }

}

//correct answer selection
function optionSelected(answer){
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;
    if(userAnswer == correctAnswer){
        answer.classList.add('correct')
        //user score gets +1 if correct answer
        userScore++;
        headerScore();
    }
    else{
        answer.classList.add('incorrect')

        //if answer is incorrect then auto select the correct option
        for(let i = 0; i<allOptions ;i++){
            if(optionList.children[i].textContent == correctAnswer){
                optionList.children[i].setAttribute('class','option correct')
            }
        }
    

    }

    //if user has selected once, disable all the options
    for(let i = 0; i<allOptions ;i++){
        optionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add("active");

}

//question counter
function questionCounter(index){
    const questionTotal = document.querySelector('.question_total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`
}
//function header score
function headerScore(){
    const headerScoreText = document.querySelector(".header_score");
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}
//to show result box
function showResultBox(){
    quizBox.classList.remove('active')
    resultBox.classList.add('active')

    const scoreText = document.querySelector(".score_text")
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`

    const circularProgress = document.querySelector(".circular_progress")
    const progressValue = document.querySelector(".progress_value")

    let progressStartValue = -1;
    let progressEndValue = (userScore/questions.length)*100;

    let speed = 10;
    let progress = setInterval(()=>{
        progressStartValue++;
        // console.log(progressStartValue);

        progressValue.textContent = `${progressStartValue}%`
        circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255,255,255,.1) 0deg)`;

        if(progressStartValue == progressEndValue){
            clearInterval(progress);
        }
    },speed)
}

const quitBtn = document.querySelector(".quit_btn");

quitBtn.onclick = () => {
  // Hide quiz completely
  quizBox.classList.remove("active");
  quizSection.classList.remove("active");

  // Hide popup too (so we go all the way home)
  popupInfo.classList.remove("active");

  // Show home screen
  main.classList.remove("active");

  // Reset quiz state
  questionCount = 0;
  questionNumb = 1;
  userScore = 0;
  nextBtn.classList.remove("active");
};
