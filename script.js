const quizData = [
  {
    question: "What does 'let' do in JavaScript?",
    options: ["Declares a block-scoped variable", "Declares a global variable", "Fixes a variable", "None"],
    answer: "Declares a block-scoped variable"
  },
  {
    question: "Which method is used to convert JSON to a JavaScript object?",
    options: ["JSON.parse()", "JSON.stringify()", "parse.JSON()", "toObject()"],
    answer: "JSON.parse()"
  },
  {
    question: "What does '=== ' mean in JavaScript?",
    options: ["Equal value only", "Assignment", "Strict equality", "Loose equality"],
    answer: "Strict equality"
  }
];

let currentIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const jokeEl = document.getElementById("joke");

function loadQuestion() {
  const current = quizData[currentIndex];
  questionEl.textContent = current.question;
  optionsEl.innerHTML = "";
  current.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => {
      if (option === current.answer) score++;
      currentIndex++;
      if (currentIndex < quizData.length) {
        loadQuestion();
      } else {
        showResult();
      }
    };
    optionsEl.appendChild(btn);
  });
}

function showResult() {
  document.getElementById("quiz-container").style.display = "none";
  resultEl.innerHTML = `<h2>Your Score: ${score}/${quizData.length}</h2>`;
}

async function fetchJoke() {
  try {
    const res = await fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" }
    });
    const data = await res.json();
    jokeEl.textContent = data.joke;
  } catch (error) {
    jokeEl.textContent = "Couldn't fetch a joke. Try again later!";
  }
}

loadQuestion();
fetchJoke();
