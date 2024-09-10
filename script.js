// Store valid USNs
const validUSNs = ['12345', '67890', 'ABCDE'];

// Validate USN and redirect to Quiz
document.getElementById('usn-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const usn = document.getElementById('usn').value.trim();
    const errorMsg = document.getElementById('error-message');

    if (validUSNs.includes(usn)) {
        window.location.href = 'quiz.html';
    } else {
        errorMsg.textContent = 'Invalid USN. Please try again.';
    }
});

// Handle Quiz Form Submission
document.getElementById('quiz-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const answers = {
        q1: document.querySelector('input[name="q1"]:checked')?.value,
        q2: document.querySelector('input[name="q2"]:checked')?.value,
    };

    const errorMsg = document.getElementById('error-message');

    // Validate all questions answered
    if (!answers.q1 || !answers.q2) {
        errorMsg.textContent = 'Please answer all questions!';
        return;
    }

    // Calculate Score
    const correctAnswers = { q1: 'b', q2: 'c' };
    let score = 0;

    for (const [question, correct] of Object.entries(correctAnswers)) {
        if (answers[question] === correct) score++;
    }

    // Store score and show result
    localStorage.setItem('quizScore', score);
    window.location.href = 'result.html';
});

// Show Results on Result Page
window.onload = function() {
    const score = localStorage.getItem('quizScore');
    if (score !== null) {
        const scoreText = document.getElementById('score');
        const feedback = document.getElementById('feedback');
        const progressBar = document.getElementById('progress-bar');

        scoreText.textContent = `${score}/2`;
        feedback.textContent = (score >= 1) ? "Good job!" : "You can improve!";

        // Fill progress bar
        const progressPercentage = (score / 2) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }
};

// Updated correct answers array
const correctAnswers = [
  'b', // How does traditional knowledge contribute to the global economy?
  'c', // Which international organization is involved in the protection of traditional knowledge?
  'b', // What is the primary concern related to the use of traditional knowledge?
  'b', // Which of the following is a common economic activity involving traditional knowledge?
  'a', // Traditional knowledge is often exploited in the global economy due to lack of IP protection
  'a', // Which agreement within the WTO addresses issues related to traditional knowledge?
  'a', // Biopiracy refers to theft of biological resources without permission
  'b', // Difficulty in standardizing and documenting traditional practices
  'b', // Pharmaceutical industry relies on traditional knowledge
  'a'  // Traditional knowledge helps preserve biodiversity and promote sustainable practices
];

function calculateScore() {
  const userAnswers = document.querySelectorAll('input[type="radio"]:checked');
  let score = 0;
  
  userAnswers.forEach((answer, index) => {
      if (answer.value === correctAnswers[index]) {
          score++;
      }
  });
  
  displayResults(score);
}

function displayResults(score) {
  const totalQuestions = correctAnswers.length;
  const resultMessage = `You scored ${score} out of ${totalQuestions}`;
  
  const resultElement = document.querySelector("#result");
  resultElement.textContent = resultMessage;
  
  const progressBar = document.querySelector("#progress-bar");
  const progressPercentage = (score / totalQuestions) * 100;
  progressBar.style.width = `${progressPercentage}%`;
  
  const feedbackMessage = score >= 7 ? "Well done!" : "You can improve!";
  document.querySelector("#feedback").textContent = feedbackMessage;
}
