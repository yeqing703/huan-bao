const questions = [
    {
      title: "第一个问题：1 + 1 等于多少？",
      choices: ["1", "2", "3", "4"],
      answer: "2"
    },
    {
      title: "第二个问题：太阳是行星吗？",
      choices: ["是", "否"],
      answer: "否"
    },
    // 更多问题...
  ];
  
  let currentQuestion = 0;
  
  const quiz = document.getElementById('quiz');
  const nextButton = document.getElementById('nextButton');
  const prevButton = document.getElementById('prevButton');
  const submitButton = document.getElementById('submitButton');
  
  function renderQuestion() {
    const question = questions[currentQuestion];
    quiz.innerHTML = `
      <div class="question">${question.title}</div>
      <ul>
        ${question.choices.map(choice => `<li>${choice}</li>`).join('')}
      </ul>
    `;
  }
  
  function showResults() {
    const answers = questions.map(q => document.querySelector(`input[name="question${currentQuestion}"]:checked`).value);
    const correctAnswers = questions.map(q => q.answer);
    const score = answers.filter((answer, index) => answer === correctAnswers[index]).length;
    alert(`你的得分是：${score}/${questions.length}`);
  }
  
  nextButton.addEventListener('click', () => {
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      renderQuestion();
    }
  });
  
  prevButton.addEventListener('click', () => {
    if (currentQuestion > 0) {
      currentQuestion--;
      renderQuestion();
    }
  });
  
  submitButton.addEventListener('click', showResults);
  
  renderQuestion();