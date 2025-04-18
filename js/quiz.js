// Quiz questions data
const quizQuestions = [
    {
        question: "What is the value of a queen in chess?",
        options: ["3 points", "5 points", "9 points", "1 point"],
        answer: 2
    },
    {
        question: "Which piece can only move diagonally?",
        options: ["Rook", "Bishop", "Knight", "Pawn"],
        answer: 1
    },
    {
        question: "What is castling in chess?",
        options: [
            "Moving the king two squares towards a rook",
            "Moving a pawn two squares forward",
            "Capturing an opponent's piece",
            "Promoting a pawn"
        ],
        answer: 0
    },
    {
        question: "How many squares does a knight move?",
        options: ["2 squares", "3 squares", "4 squares", "In an L shape"],
        answer: 3
    },
    {
        question: "What is checkmate?",
        options: [
            "When the king is in check and can escape",
            "When the king is in check and cannot escape",
            "When a pawn reaches the last rank",
            "When a player resigns"
        ],
        answer: 1
    },
    {
        question: "Which piece can jump over other pieces?",
        options: ["Queen", "Bishop", "Knight", "Rook"],
        answer: 2
    },
    {
        question: "What happens when a pawn reaches the opposite end?",
        options: [
            "It is removed from the board",
            "It promotes to another piece",
            "It becomes a king",
            "It can move backwards"
        ],
        answer: 1
    },
    {
        question: "What is the starting position of the king?",
        options: ["e1 for White", "d1 for White", "e8 for Black", "d8 for Black"],
        answer: 0
    },
    {
        question: "How many pawns does each player start with?",
        options: ["6", "8", "10", "12"],
        answer: 1
    },
    {
        question: "What is stalemate?",
        options: [
            "A draw when no legal moves are available",
            "A win by checkmate",
            "A special pawn move",
            "A type of opening"
        ],
        answer: 0
    }
];

let currentQuizIndex = 0;
let quizScore = 0;
let userAnswers = new Array(quizQuestions.length).fill(null);

// Initialize quiz
function initQuiz() {
    showQuizQuestion(currentQuizIndex);

    document.getElementById('nextQuestionBtn').addEventListener('click', () => {
        if (currentQuizIndex < quizQuestions.length - 1) {
            fadeOutIn(() => {
                currentQuizIndex++;
                showQuizQuestion(currentQuizIndex);
            });
        }
    });

    document.getElementById('submitQuizBtn').addEventListener('click', () => {
        calculateQuizScore();
    });
}

// Show quiz question
function showQuizQuestion(index) {
    const questionObj = quizQuestions[index];
    const quizQuestion = document.getElementById('quizQuestion');
    const quizOptions = document.getElementById('quizOptions');
    const nextBtn = document.getElementById('nextQuestionBtn');
    const submitBtn = document.getElementById('submitQuizBtn');
    const quizScoreDiv = document.getElementById('quizScore');

    quizScoreDiv.style.display = 'none';

    quizQuestion.textContent = `Q${index + 1}. ${questionObj.question}`;
    quizOptions.innerHTML = '';

    questionObj.options.forEach((option, i) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <label>
                <input type="radio" name="quizOption" value="${i}" />
                ${option}
            </label>
        `;
        quizOptions.appendChild(li);
    });

    // Restore previously selected answer if any
    if (userAnswers[index] !== null) {
        const radios = document.getElementsByName('quizOption');
        radios[userAnswers[index]].checked = true;
    }

    // Add event listeners to radio buttons to update score on selection
    const radios = document.getElementsByName('quizOption');
    radios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            userAnswers[index] = parseInt(e.target.value);
            updateScoreForAnswer(index, userAnswers[index]);
        });
    });

    nextBtn.style.display = index === quizQuestions.length - 1 ? 'none' : 'inline-block';
    submitBtn.style.display = index === quizQuestions.length - 1 ? 'inline-block' : 'none';
}

// Fade out and fade in animation helper
function fadeOutIn(callback) {
    const quizQuestion = document.getElementById('quizQuestion');
    const quizOptions = document.getElementById('quizOptions');

    quizQuestion.classList.add('fade-out');
    quizOptions.classList.add('fade-out');

    setTimeout(() => {
        callback();
        quizQuestion.classList.remove('fade-out');
        quizOptions.classList.remove('fade-out');
    }, 500);
}

// Update score for a given answer
function updateScoreForAnswer(questionIndex, selectedOption) {
    // Recalculate score from all answers
    quizScore = 0;
    userAnswers.forEach((answer, idx) => {
        if (answer === quizQuestions[idx].answer) {
            quizScore++;
        }
    });

    // If last question answered, show score popup
    if (questionIndex === quizQuestions.length - 1) {
        showScorePopup(quizScore, quizQuestions.length);
    }
}

// Calculate quiz score (fallback if submit button used)
function calculateQuizScore() {
    if (userAnswers.includes(null)) {
        alert('Please answer all questions before submitting.');
        return;
    }
    quizScore = 0;
    userAnswers.forEach((answer, idx) => {
        if (answer === quizQuestions[idx].answer) {
            quizScore++;
        }
    });
    showScorePopup(quizScore, quizQuestions.length);
}

// Show score popup
function showScorePopup(score, total) {
    // Create popup container
    let popup = document.createElement('div');
    popup.id = 'scorePopup';
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = '#fff';
    popup.style.border = '2px solid #333';
    popup.style.borderRadius = '10px';
    popup.style.padding = '20px 30px';
    popup.style.zIndex = '1000';
    popup.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    popup.style.textAlign = 'center';

    // Score message
    let message = document.createElement('p');
    message.textContent = `You scored ${score} out of ${total}!`;
    message.style.fontSize = '1.2rem';
    message.style.marginBottom = '20px';
    popup.appendChild(message);

    // Close button
    let closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.style.padding = '8px 16px';
    closeBtn.style.fontSize = '1rem';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.border = 'none';
    closeBtn.style.borderRadius = '5px';
    closeBtn.style.backgroundColor = '#3498db';
    closeBtn.style.color = '#fff';

    closeBtn.addEventListener('click', () => {
        document.body.removeChild(popup);
    });

    popup.appendChild(closeBtn);

    // Append popup to body
    document.body.appendChild(popup);

    // Redirect to dashboard after 5 seconds if score > 5
    if (score > 5) {
        let countdown = 5;
        let countdownMessage = document.createElement('p');
        countdownMessage.style.fontSize = '1rem';
        countdownMessage.style.marginTop = '10px';
        countdownMessage.textContent = `Redirecting to dashboard in ${countdown} seconds...`;
        popup.appendChild(countdownMessage);

        const intervalId = setInterval(() => {
            countdown--;
            countdownMessage.textContent = `Redirecting to dashboard in ${countdown} seconds...`;
            if (countdown <= 0) {
                clearInterval(intervalId);
                window.location.href = 'dashboard.html';
            }
        }, 1000);
    }
}

// Initialize quiz on page load
document.addEventListener('DOMContentLoaded', initQuiz);
