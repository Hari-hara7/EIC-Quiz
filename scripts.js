// Check if we're on the USN Entry Page
if (document.getElementById('usn-form')) {
  document.getElementById('usn-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const usn = document.getElementById('usn').value.trim();

    if (usn) {
      // Check if USN has already attempted the quiz
      if (localStorage.getItem(usn)) {
        alert('You have already attempted the quiz.');
      } else {
        // Send the USN to your email using Formspree
        sendUSNToEmail(usn).then(() => {
          localStorage.setItem('currentUSN', usn);
          window.location.href = 'quiz.html';
        }).catch(error => {
          console.error('Error sending USN:', error);
        });
      }
    }
  });
}

// Function to send the USN to an email using Formspree
function sendUSNToEmail(usn) {
  const formData = new FormData();
  formData.append('USN', usn); // Add USN as a field

  // Replace 'your-formspree-url' with your actual Formspree endpoint URL
  return fetch('https://usebasin.com/f/1e528d2e048d', {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      console.log('USN sent successfully!');
    } else {
      throw new Error('Failed to send USN.');
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
    const totalQuestions = Object.keys(correctAnswers).length;

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
  const score = parseInt(localStorage.getItem('quizScore'), 10);
  const totalQuestions = 10;

  // Initialize ranks if not already stored
  let ranks = JSON.parse(localStorage.getItem('quizRanks')) || [];

  // If the score exists, proceed with ranking logic
  if (score !== null) {
    // Check if the score is within the top 3 and update ranks
    ranks.push(score);
    ranks = ranks.sort((a, b) => b - a).slice(0, 3); // Keep top 3 ranks only
    localStorage.setItem('quizRanks', JSON.stringify(ranks));

    // Determine rank
    const rank = ranks.indexOf(score) + 1; // Get the rank (1 for Rank 1, 2 for Rank 2, etc.)

    // Display the score and rank
    document.getElementById('result').textContent = `You scored ${score} out of ${totalQuestions}! Your rank is ${rank}.`;

    // Congratulatory message and emoji animation for Rank 1
    if (rank === 1) {
      document.getElementById('result').innerHTML += `
        <div class="congrats-message">🎉 Congratulations! You got Rank 1! 🎉</div>
        <div class="emoji-container"></div>
      `;
      startEmojiAnimation();
    }

    localStorage.removeItem('quizScore'); // Clear the score after displaying
  } else {
    document.getElementById('result').textContent = 'No quiz attempt found.';
  }
}

// Function to start the emoji falling animation
function startEmojiAnimation() {
  const emojiContainer = document.querySelector('.emoji-container');
  for (let i = 0; i < 20; i++) {
    const emoji = document.createElement('div');
    emoji.textContent = '🎉'; // You can add more types of emojis here
    emoji.classList.add('emoji');
    emoji.style.left = `${Math.random() * 100}%`;
    emoji.style.animationDelay = `${Math.random() * 2}s`;
    emojiContainer.appendChild(emoji);
  }
}
