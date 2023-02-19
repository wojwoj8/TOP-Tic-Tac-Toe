/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
const Player = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;
  return {
    getName,
    getMark,
  };
};
const gameBoard = (() => {
  const cells = document.querySelectorAll('.cell');
  const move = document.querySelector('#playerMove');
  const board = ['', '', '', '', '', '', '', '', ''];

  const renderBoard = () => {
    cells.forEach((cell, index) => {
      cell.innerHTML = board[index];
    });
  };
  const clearBoard = () => {
    cells.forEach((cell, index) => {
      cell.innerHTML = '';
      board[index] = '';
      // cell.innerHTML = board[index];
      // console.log(cell);
      console.log(board[index]);
    });
  };

  const findCellByElement = (element) => {
    const cellsArr = Array.from(document.querySelectorAll('.cell'));
    return cellsArr.indexOf(element);
  };

  const createPlayer = (playerOne, playerTwo) => {
    const one = Player(playerOne, 'X');
    const two = Player(playerTwo, 'O');
    // console.log(one, two);
    // console.log('test');
    let activePlayer = one.getMark();
    // console.log(`active player ${activePlayer}`);

    const switchPlayer = () => {
      activePlayer = activePlayer === 'X' ? 'O' : 'X';
      // move.innerHTML = `It's ${activePlayer} move`;
    };
    const activeMark = () => {
      const mark = activePlayer;
      // console.log(mark);
      return mark;
    };
    const checkWin = () => {
      // console.log(`checkWin ${activeMark()}`);
      const mark = activeMark();
      const winConditions = [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        if (board[condition[0]] === mark && board[condition[1]] === mark
          && board[condition[2]] === mark) {
          console.log(`Player with ${mark} wins`);
          // move.innerHTML = `Player with ${mark} wins`;
          return true;
        }
      }
      return false;
    };
    const checkDraw = () => {
      if (board.includes('') === false && checkWin() === false) {
        move.innerHTML = 'It\'s Draw!';
        return true;
      }
      return false;
    };
    const players = [one, two];
    return {
      players,
      one,
      two,
      switchPlayer,
      activeMark,
      checkWin,
      checkDraw,
    };
  };

  const putMark = (elem, mark) => {
    // need to get index of given cell
    const index = findCellByElement(elem);
    // console.log(`Mark: ${mark}`);
    if (board[index] === '') {
      board[index] = mark;
    }
  };

  return {
    board,
    renderBoard,
    findCellByElement,
    createPlayer,
    putMark,
    clearBoard,

  };
})();

// display module

const displayModule = (() => {
  const cells = document.querySelectorAll('.cell');
  const player = gameBoard.createPlayer('', '');
  const move = document.querySelector('#playerMove');
  const restartButton = document.querySelector('#restartButton');

  const getPlayerNames = () => {
    let nameOne = document.querySelector('#play1').value;
    let nameTwo = document.querySelector('#play2').value;
    if (nameOne === '') {
      nameOne = 'Paul';
    }
    if (nameTwo === '') {
      nameTwo = 'Bob';
    }
    player.one = gameBoard.createPlayer(nameOne, 'X');
    player.two = gameBoard.createPlayer(nameTwo, 'O');
  };
  const cellClick = (e) => {
    const index = e.target;
    const activeMark = player.activeMark();
    // console.log(`test ${index.innerHTML}`);
    if (index.innerHTML === '') {
      // console.log('puste');
      // console.log(nameOne);
      // console.log(player.one.one.getName());
      // console.log(player.two.one.getName());
      gameBoard.putMark(index, activeMark);
      gameBoard.renderBoard();
      if (player.checkWin() === true) {
        if (activeMark === player.one.one.getMark()) {
          move.innerHTML = `${player.one.one.getName()} won!`;
        } else {
          move.innerHTML = `${player.two.one.getName()} won!`;
        }
        restartButton.style.display = 'flex';
      } else {
        player.switchPlayer();
        if (activeMark === player.one.one.getMark()) {
          move.innerHTML = `It\`s ${player.two.one.getName()} move!`;
        } else {
          move.innerHTML = `It\`s ${player.one.one.getName()} move!`;
        }
      }
      if (player.checkDraw() === true) {
        restartButton.style.display = 'flex';
      }
    }
  };
  const startGame = () => {
    getPlayerNames();
    cells.forEach((e) => e.addEventListener('click', cellClick));
  };
  return {
    cellClick, startGame,
  };
})();

// gamestart
const gameController = (() => {
  const move = document.querySelector('#playerMove');
  const playersName = document.querySelector('.playersName');
  const start = () => {
    const startButton = document.querySelector('#startButton');
    // const playersName = document.querySelector('.playersName');
    startButton.addEventListener('click', (event) => {
      // console.log('test');
      // displayModule.cellClick();
      displayModule.startGame();
      playersName.style.display = 'none';
      event.preventDefault();
    });
  };
  const restart = () => {
    const restartButton = document.querySelector('#restartButton');
    restartButton.addEventListener('click', () => {
      gameBoard.board = ['', '', '', '', '', '', '', '', ''];
      console.log(gameBoard.board);
      gameBoard.renderBoard();
      gameBoard.clearBoard();
      playersName.style.display = 'flex';
      restartButton.style.display = 'none';
      move.innerHTML = 'It\'s X move';
      gameController.start();
    });
  };
  return { start, restart };
})();

gameController.start();
gameController.restart();
