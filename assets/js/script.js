
  const questionElement = document.getElementById("question");
  const answersElement = document.getElementById("answers");
  const nextButton = document.getElementById("next-btn");
  const resultElement = document.getElementById("result");
  const resultPopup = document.getElementById("result-popup");
  const resultPopupClose = document.getElementsByClassName("result-popup-close")[0];
  
  let currentQuestion = 0;
  let score = 0;
  let answeredQuestions = [];
  
  function displayQuestion() {
    const currentQuestionData = quizData[currentQuestion];
    questionElement.textContent = currentQuestionData.question;
  
    answersElement.innerHTML = "";
    currentQuestionData.answers.forEach((answer, index) => {
      const li = document.createElement("li");
      li.textContent = answer;
      li.addEventListener("click", () => handleAnswerClick(index));
      answersElement.appendChild(li);
    });
  }
  
  function handleAnswerClick(selectedIndex) {
    const currentQuestionData = quizData[currentQuestion];
    const selectedAnswer = currentQuestionData.answers[selectedIndex];
    const isCorrect = selectedIndex === currentQuestionData.correctAnswer;
  
    if (isCorrect) {
      score++;
    }
  
    answeredQuestions[currentQuestion] = selectedIndex;
    disableAnswers();
    nextButton.disabled = false;
  }
  
  function disableAnswers() {
    const answerItems = answersElement.getElementsByTagName("li");
    for (let i = 0; i < answerItems.length; i++) {
      answerItems[i].classList.add("disabled");
    }
  }
  
  nextButton.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      displayQuestion();
      nextButton.disabled = true;
    } else {
      displayResult();
    }
  });
  
  function displayResult() {
    resultElement.textContent = `Votre score : ${score} / ${quizData.length}`;
    resultPopup.style.display = "block";
  }

  resultPopupClose.addEventListener("click", () => {
    resultPopup.style.display = "none";
  });
  
  window.addEventListener("click", (event) => {
    if (event.target == resultPopup) {
      resultPopup.style.display = "none";
    }
  });
  
  displayQuestion();