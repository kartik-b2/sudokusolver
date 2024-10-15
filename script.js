// Initialize the Sudoku grid
const grid = Array.from({ length: 9 }, () => Array(9).fill(0));

// Create the grid in the HTML
const sudokuGrid = document.getElementById('sudokuGrid');

function createGrid() {
    sudokuGrid.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('input');
            cell.type = 'number';
            cell.min = 1;
            cell.max = 9;
            cell.className = 'cell';
            cell.id = `cell-${i}-${j}`;
            cell.value = grid[i][j] === 0 ? '' : grid[i][j];
            sudokuGrid.appendChild(cell);
        }
    }
}

createGrid(); // Create initial grid

// Backtracking algorithm to solve Sudoku
function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isSafe(board, row, col, num)) {
                        board[row][col] = num;

                        if (solveSudoku(board)) {
                            return true;
                        }

                        board[row][col] = 0; // Backtrack
                    }
                }
                return false; // Trigger backtracking
            }
        }
    }
    return true; // Solved
}

function isSafe(board, row, col, num) {
    // Check row and column
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num) {
            return false;
        }
    }

    // Check 3x3 grid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] === num) {
                return false;
            }
        }
    }

    return true;
}

// Solve button event listener
document.getElementById('solveBtn').addEventListener('click', function() {
    const board = [];

    // Read input from the grid
    for (let i = 0; i < 9; i++) {
        const row = [];
        for (let j = 0; j < 9; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            row.push(cell.value ? parseInt(cell.value) : 0);
        }
        board.push(row);
    }

    // Solve the Sudoku
    if (solveSudoku(board)) {
        // Display the solved Sudoku grid
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const cell = document.getElementById(`cell-${i}-${j}`);
                cell.value = board[i][j];
                cell.disabled = true; // Disable the cells after solving
            }
        }
        document.getElementById('result').innerText = 'Sudoku solved!';
    } else {
        document.getElementById('result').innerText = 'No solution exists!';
    }
});

// Reset button event listener
const resetBtn = document.createElement('button');
resetBtn.innerText = 'Reset Grid';
resetBtn.className = 'resetBtn';
document.body.appendChild(resetBtn);

resetBtn.addEventListener('click', function() {
    createGrid(); // Reset the grid to the initial state
    document.getElementById('result').innerText = ''; // Clear the result message
});
