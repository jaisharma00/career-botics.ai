// 20 Questions: 5 Maths, 5 Reasoning, 5 GK, 5 Facts
const questions = [
  // Mathematics (5)
  { q: "What is 25 + 37?", a: "62" },
  { q: "Simplify: 15 × 6", a: "90" },
  { q: "Square root of 169?", a: "13" },
  { q: "If a train travels 120 km in 2 hours, speed?", a: "60" },
  { q: "What is 12% of 200?", a: "24" },

  // Reasoning (5)
  { q: "Find the odd one: Cat, Dog, Lion, Table", a: "Table" },
  { q: "Series: 2, 4, 8, 16, ?", a: "32" },
  { q: "If RAM = 18, then RAT = ?", a: "39" }, 
  { q: "Mirror of 12:45 will be?", a: "11:15" },
  { q: "Complete: ACE, BDF, CEG, ?", a: "DFH" },

  // General Knowledge (5)
  { q: "Which planet is known as the Red Planet?", a: "Mars" },
  { q: "Who is known as the Father of Computers?", a: "Charles Babbage" },
  { q: "Largest ocean on Earth?", a: "Pacific" },
  { q: "Which country gifted the Statue of Liberty to USA?", a: "France" },
  { q: "National animal of India?", a: "Tiger" },

  // Facts / Awareness (5)
  { q: "Which gas do humans exhale?", a: "Carbon dioxide" },
  { q: "How many bones in adult human body?", a: "206" },
  { q: "Which vitamin do we get from sunlight?", a: "Vitamin D" },
  { q: "Which is the fastest land animal?", a: "Cheetah" },
  { q: "Water freezes at what temperature (°C)?", a: "0" }
];

let userName, userAge, userPhone;
let currentQuestion = 0;
let score = 0;

// Shuffle Questions
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Start Test
function startTest() {
  userName = document.getElementById("name").value;
  userAge = document.getElementById("age").value;
  userPhone = document.getElementById("phone").value;

  if (!userName || !userAge || !userPhone) {
    alert("Please fill all details!");
    return;
  }

  shuffle(questions);

  document.getElementById("studentDetails").style.display = "none";
  document.getElementById("quizSection").style.display = "block";
  loadQuestion();
}

// Load Question + Update Progress
function loadQuestion() {
  let qContainer = document.getElementById("questionContainer");
  qContainer.innerHTML = "";

  let q = questions[currentQuestion];
  qContainer.innerHTML = `
    <p><b>Q${currentQuestion + 1} of ${questions.length}:</b> ${q.q}</p>
    <input type="text" id="answer" placeholder="Enter your answer">
  `;

  updateProgress();
}

// Next Question
function nextQuestion() {
  let userAns = document.getElementById("answer").value;
  if (userAns.trim() === "") {
    alert("Please enter your answer!");
    return;
  }

  if (userAns.trim().toLowerCase() === questions[currentQuestion].a.toLowerCase()) {
    score++;
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

// Show Result
function showResult() {
  document.getElementById("quizSection").style.display = "none";
  document.getElementById("resultSection").style.display = "block";

  let resultText = "";
  if (score <= 7) {
    resultText = `${userName}, you may be good at Creative fields like Arts, Design or Media.`;
  } else if (score <= 14) {
    resultText = `${userName}, you have strong Analytical skills. Careers in Engineering, Finance, or IT may suit you.`;
  } else {
    resultText = `${userName}, you have excellent Aptitude! You can excel in Research, Data Science, or Medicine.`;
  }

  document.getElementById("resultText").innerText = `
    Name: ${userName}, Age: ${userAge}, Phone: ${userPhone}
    Score: ${score}/${questions.length}
    Suggestion: ${resultText}
  `;
}

// Update Progress Bar
function updateProgress() {
  let progressBar = document.getElementById("progressBar");
  let progress = ((currentQuestion + 1) / questions.length) * 100;
  progressBar.style.width = progress + "%";
  progressBar.innerText = Math.round(progress) + "%";
}

// Start Chat
function startChat() {
  document.getElementById("resultSection").style.display = "none";
  document.getElementById("chatSection").style.display = "block";
  document.getElementById("chatWindow").innerHTML = "<p><b>AI:</b> Hi " + userName + "! Ask me anything about your career.</p>";
}

// Chat Function (Static for now)
function sendMessage() {
  let input = document.getElementById("userInput").value;
  if (input.trim() === "") return;

  let chatWindow = document.getElementById("chatWindow");
  chatWindow.innerHTML += "<p><b>You:</b> " + input + "</p>";
  document.getElementById("userInput").value = "";

  // Temporary AI Reply
  setTimeout(() => {
    chatWindow.innerHTML += "<p><b>AI:</b> That's an interesting question! Based on your aptitude, I suggest exploring more in this direction.</p>";
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 1000);
}
