// Check if user is logged in
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
        // Redirect to login page if not logged in
        window.location.href = 'index.html';
        return;
    }

    // Display username
    document.getElementById('usernameDisplay').textContent = user.username;

    // Initialize chessboard
    initializeChessboard();

    // Load and display puzzles
    loadPuzzles();

    // Setup hint button popup for best move
    const hintBtn = document.getElementById('hintBtn');
    const hintModal = document.getElementById('hintModal');
    const hintText = document.getElementById('hintText');
    const closeBtn = hintModal.querySelector('.close');

    hintBtn.addEventListener('click', () => {
        const puzzleNumber = parseInt(document.getElementById('puzzleNumber').textContent);
        const puzzle = puzzles.find(p => p.id === puzzleNumber);
        const bestMove = puzzle ? puzzle.hint : 'No hint available';
        hintText.textContent = `Best move: ${bestMove}`;
        hintModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        hintModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === hintModal) {
            hintModal.style.display = 'none';
        }
    });
});

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
});

// Chess piece images
const pieceImages = {
    'p': 'images/black-pawn.png',
    'n': 'images/black-knight.png',
    'b': 'images/black-bishop.png',
    'r': 'images/black-rook.png',
    'q': 'images/black-queen.png',
    'k': 'images/black-king.png',
    'P': 'images/white-pawn.png',
    'N': 'images/white-knight.png',
    'B': 'images/white-bishop.png',
    'R': 'images/white-rook.png',
    'Q': 'images/white-queen.png',
    'K': 'images/white-king.png'
};

// Puzzle data
const puzzles = [
    {
        id: 1,
        title: "Knight Fork Challenge",
        difficulty: "easy",
        image: "images/current-puzzles/knight-fork.png",
        description: "You've got this! Look for a move that creates multiple threats at once.",
        hint: "Look for a move that attacks two pieces at once"
    },
    {
        id: 2,
        title: "Bishop's Deadly Pin",
        difficulty: "medium",
        image: "images/current-puzzles/Bishop's-Deadly-Pin.png",
        description: "Great position! Can you find a way to restrict your opponent's pieces?",
        hint: "Use your bishop to pin the knight to the king"
    },
    {
        id: 3,
        title: "Queen's Gambit",
        difficulty: "hard",
        image: "images/current-puzzles/Queen's-gambit.png",
        description: "Challenge yourself! Sometimes the best move is the most unexpected one.",
        hint: "Consider sacrificing your queen for a better position"
    },
    {
        id: 4,
        title: "Rook's Revenge",
        difficulty: "medium",
        image: "images/current-puzzles/Rook's-revenge.png",
        description: "You're doing great! Look for a way to put pressure on your opponent's position.",
        hint: "Use your rook to attack the back rank"
    },
    {
        id: 5,
        title: "Knight's Double Attack",
        difficulty: "easy",
        image: "images/current-puzzles/Double-knight-attack.png",
        description: "Perfect opportunity! Your knight can create a powerful tactical threat.",
        hint: "Find a square where your knight attacks two pieces"
    },
    {
        id: 6,
        title: "Bishop's Discovery",
        difficulty: "hard",
        image: "images/current-puzzles/Bishop's-discovery.png",
        description: "Think outside the box! The solution might be hiding in plain sight.",
        hint: "Move a piece to reveal an attack from behind"
    },
    {
        id: 7,
        title: "Rook's Back Rank",
        difficulty: "medium",
        image: "images/current-puzzles/Rook's-back-rank.png",
        description: "You're almost there! Look for a way to deliver the final blow.",
        hint: "Look for a way to attack the back rank"
    },
    {
        id: 8,
        title: "Queen's Sacrifice",
        difficulty: "hard",
        image: "images/current-puzzles/Queen's-sacrifice.png",
        description: "Trust your instincts! The most beautiful moves are often the most daring.",
        hint: "Consider sacrificing your queen for a forced mate"
    }
];

let currentPuzzleIndex = 0;

// Initialize the dashboard
function initDashboard() {
    // Load current puzzle
    loadCurrentPuzzle();

    // Initialize puzzle gallery
    initPuzzleGallery();

    // Add event listeners
    document.getElementById('nextBtn').addEventListener('click', () => {
        currentPuzzleIndex = (currentPuzzleIndex + 1) % puzzles.length;
        loadCurrentPuzzle();
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
        loadCurrentPuzzle();
    });

    document.getElementById('hintBtn').addEventListener('click', () => {
        const modal = document.getElementById('hintModal');
        modal.style.display = 'block';
    });

    // Close modal when clicking the close button
    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('hintModal').style.display = 'none';
    });
}

// Load current puzzle
function loadCurrentPuzzle() {
    const puzzle = puzzles[currentPuzzleIndex];
    const puzzleDisplay = document.getElementById('puzzleDisplay');
    
    // Update puzzle information
    document.getElementById('puzzleNumber').textContent = puzzle.id;
    document.getElementById('puzzleDescription').textContent = puzzle.description;
    document.getElementById('hintText').textContent = puzzle.hint;
    
    // Update puzzle image
    puzzleDisplay.innerHTML = `<img src="${puzzle.image}" alt="${puzzle.title}" style="width: 100%; height: 100%; object-fit: contain;">`;
}

// Initialize puzzle gallery
function initPuzzleGallery() {
    const puzzleGrid = document.getElementById('puzzleGrid');
    puzzleGrid.innerHTML = '';

    puzzles.forEach((puzzle, index) => {
        const puzzleCard = document.createElement('div');
        puzzleCard.className = 'puzzle-card';
        puzzleCard.innerHTML = `
            <div class="puzzle-image">
                <img src="${puzzle.image}" alt="${puzzle.title}" style="width: 100%; height: 100%; object-fit: contain;">
            </div>
            <div class="puzzle-details">
                <h3>${puzzle.title}</h3>
                <span class="puzzle-difficulty difficulty-${puzzle.difficulty}">${puzzle.difficulty.charAt(0).toUpperCase() + puzzle.difficulty.slice(1)}</span>
            </div>
        `;

        // Add click event to load puzzle or redirect to article pages
        puzzleCard.addEventListener('click', () => {
            const pageMap = {
                1: 'knight-fork-challenge.html',
                2: 'bishops-deadly-pin.html',
                3: 'queens-gambit.html',
                4: 'rooks-revenge.html',
                5: 'knights-double-attack.html',
                6: 'bishops-discovery.html',
                7: 'rooks-back-rank.html',
                8: 'queens-sacrifice.html'
            };
            if (pageMap[puzzle.id]) {
                window.location.href = pageMap[puzzle.id];
            } else {
                currentPuzzleIndex = index;
                loadCurrentPuzzle();
            }
        });

        puzzleGrid.appendChild(puzzleCard);
    });
}

// Initialize the dashboard when the page loads
document.addEventListener('DOMContentLoaded', initDashboard);

// Generate SVG for chess position
function generateChessSVG(fen) {
    let svg = '';
    const rows = fen.split(' ')[0].split('/');
    
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const x = j * 25;
            const y = i * 25;
            const isWhite = (i + j) % 2 === 0;
            
            // Draw square
            svg += `<rect x="${x}" y="${y}" width="25" height="25" fill="${isWhite ? '#f0d9b5' : '#b58863'}"/>`;
            
            // Draw piece
            const piece = rows[i][j];
            if (pieceImages[piece]) {
                svg += `<image href="${pieceImages[piece]}" x="${x + 2.5}" y="${y + 2.5}" width="20" height="20"/>`;
            }
        }
    }
    
    return svg;
}

// Load a specific puzzle
function loadPuzzle(puzzle) {
    const board = Chessboard('chessboard', {
        position: puzzle.fen,
        draggable: true
    });

    const game = new Chess(puzzle.fen);
    let moveCount = 0;

    board.on('dragStart', (source, piece) => {
        if (game.game_over()) return false;
        if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
            (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
            return false;
        }
    });

    board.on('drop', (source, target) => {
        const move = game.move({
            from: source,
            to: target,
            promotion: 'q'
        });

        if (move === null) return 'snapback';

        moveCount++;
        
        if (moveCount === 1 && move.san === puzzle.solution) {
            // Correct first move
            updateStats(true);
            setTimeout(() => {
                alert('Correct! Well done!');
                loadNextPuzzle();
            }, 500);
        } else if (moveCount === 1) {
            // Incorrect first move
            updateStats(false);
            setTimeout(() => {
                alert('Incorrect. Try again!');
                board.position(puzzle.fen);
                game.load(puzzle.fen);
                moveCount = 0;
            }, 500);
        }
    });

    // Update puzzle info
    document.getElementById('puzzleNumber').textContent = puzzle.id;
    document.getElementById('puzzleDescription').textContent = `Find the best move for ${game.turn() === 'w' ? 'White' : 'Black'}`;
    
    // Update hint button
    document.getElementById('hintBtn').onclick = () => {
        document.getElementById('hintText').textContent = puzzle.hint;
        document.getElementById('hintModal').style.display = 'block';
    };
}

// Update user stats
function updateStats(success) {
    const puzzlesSolved = document.getElementById('puzzlesSolved');
    const successRate = document.getElementById('successRate');
    const currentStreak = document.getElementById('currentStreak');

    let solved = parseInt(puzzlesSolved.textContent);
    let streak = parseInt(currentStreak.textContent);

    if (success) {
        solved++;
        streak++;
    } else {
        streak = 0;
    }

    puzzlesSolved.textContent = solved;
    currentStreak.textContent = streak;
    successRate.textContent = `${Math.round((solved / (solved + 1)) * 100)}%`;
}

// Load next puzzle
function loadNextPuzzle() {
    const currentPuzzleId = parseInt(document.getElementById('puzzleNumber').textContent);
    const nextPuzzle = puzzles.find(p => p.id === currentPuzzleId + 1) || puzzles[0];
    loadPuzzle(nextPuzzle);
}

// Initialize chessboard
function initializeChessboard() {
    loadPuzzle(puzzles[0]);
} 