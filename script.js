document.getElementById('usnForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission behavior
    const usn = document.getElementById('usnInput').value;

    // Define the USN pattern (adjust to match the required format)
    const usnPattern = /^NNM(23|24)[A-Z]{2}\d{3}$/; // Example pattern: NNM23XX123 or NNM24XX456

    // Check if USN matches the pattern
    if (!usnPattern.test(usn)) {
        alert('Invalid USN format. Please follow the required format (e.g., NNM23XX123).');
        return; // Exit the function if the USN is invalid
    }

    // Check if the USN was already used (localStorage simulation)
    const existingUSN = localStorage.getItem('enteredUSN');
    if (existingUSN === usn) {
        alert('This USN has already been used. Please try with a different USN.');
    } else {
        // Store the USN in localStorage and redirect to the test page
        localStorage.setItem('enteredUSN', usn);
        window.location.href = "test.html"; // Redirect to the test page
    }
});


  // Handle test submission
document.getElementById('testForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    // Define correct answers
    const answers = {
      q1: 'b',
      q2: 'c',
      // Add more questions here
    };
  
    // Initialize score
    let score = 0;
    let totalQuestions = Object.keys(answers).length;
  
    // Check answers
    for (let [question, correctAnswer] of Object.entries(answers)) {
      const userAnswer = document.querySelector(`input[name="${question}"]:checked`);
      if (userAnswer && userAnswer.value === correctAnswer) {
        score += 1;
      }
    }
  
    // Store score and total in localStorage
    localStorage.setItem('testScore', score);
    localStorage.setItem('totalQuestions', totalQuestions);
  
    // Redirect to result page
    window.location.href = "result.html";
  });
  