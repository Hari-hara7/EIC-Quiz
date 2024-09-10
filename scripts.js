// Check if we're on the USN Entry Page
if (document.getElementById('usn-form')) {
    document.getElementById('usn-form').addEventListener('submit', function (e) {
      e.preventDefault();
      const usn = document.getElementById('usn').value.trim();
      if (usn) {
        // Check if USN already attempted the quiz
        if (localStorage.getItem(usn)) {
          alert('You have already attempted the quiz.');
        } else {
          localStorage.setItem('currentUSN', usn);
          window.location.href = 'quiz.html';
        }
      }
    });
  }
  
  // Check if we're on the Quiz Page
  if (document.getElementById('quiz-form')) {
    // Redirect to USN page if no USN is stored
    if (!localStorage.getItem('currentUSN')) {
      window.location.href = 'index.html';
    }
  
    document.getElementById('quiz-form').addEventListener('submit', function (e) {
      e.preventDefault();
  
      const correctAnswers = {
        q1: 'b',
        q2: 'c',
        q3: 'b',
        q4: 'b',
        q5: 'a',
        q6: 'a',
        q7: 'a',
        q8: 'b',
        q9: 'b',
        q10: 'a'
      };
  
      let score = 0;
      let totalQuestions = Object.keys(correctAnswers).length;
  
      for (let q in correctAnswers) {
        const userAnswer = document.querySelector(`input[name="${q}"]:checked`);
        if (userAnswer && userAnswer.value === correctAnswers[q]) {
          score++;
        }
      }
  
      const usn = localStorage.getItem('currentUSN');
      localStorage.setItem(usn, true); // Mark that this USN has attempted the quiz
      localStorage.setItem('quizScore', score);
      localStorage.removeItem('currentUSN'); // Clear current USN
      window.location.href = 'result.html';
    });
  }
  
  // Check if we're on the Result Page
  if (document.getElementById('result')) {
    const score = localStorage.getItem('quizScore');
    const totalQuestions = 10;
    if (score !== null) {
      document.getElementById('result').textContent = `You scored ${score} out of ${totalQuestions}!`;
      localStorage.removeItem('quizScore'); // Clear the score after displaying
    } else {
      document.getElementById('result').textContent = 'No quiz attempt found.';
    }
  }
  