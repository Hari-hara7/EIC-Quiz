document.addEventListener('DOMContentLoaded', () => {
    // Get result data from local storage or server
    const totalQuestions = localStorage.getItem('totalQuestions');
    const correctAnswers = localStorage.getItem('correctAnswers');
    
    // Calculate score percentage
    const score = (correctAnswers / totalQuestions) * 100;
    
    // Display the results
    document.getElementById('total-questions').innerText = totalQuestions;
    document.getElementById('correct-answers').innerText = correctAnswers;
    document.getElementById('score').innerText = score.toFixed(2);
    
    // Retake Quiz Button functionality
    document.getElementById('retake-btn').addEventListener('click', () => {
        window.location.href = 'quiz.html'; // Redirect to quiz page
    });
});
