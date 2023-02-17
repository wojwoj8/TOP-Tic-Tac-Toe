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
      move.innerHTML = `It's ${activePlayer} move`;
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
          move.innerHTML = `Player with ${mark} wins`;
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
    return {
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

  };
})();

// display module

const displayModule = (() => {
  const cells = document.querySelectorAll('.cell');
  const nameOne = document.querySelector('#play1').value;
  const nameTwo = document.querySelector('#play2').value;
  console.log('stworzono gracza');
  const player = gameBoard.createPlayer(nameOne, nameTwo);
  const cellClick = (e) => {
    const index = e.target;
    const activeMark = player.activeMark();
    // console.log(`test ${index.innerHTML}`);
    if (index.innerHTML === '') {
      // console.log('puste');
      console.log(nameOne);
      gameBoard.putMark(index, activeMark);
      gameBoard.renderBoard();
      if (player.checkWin() === true) {
        // console.log('test');
        // player.checkWin();
      } else {
        player.switchPlayer();
      }
      if (player.checkDraw() === true) {
        return 0;
      }
    }
  };
  const startGame = () => {
    cells.forEach((e) => e.addEventListener('click', cellClick));
  };
  return {
    cellClick, startGame,
  };
})();

// gamestart
const gameStart = (() => {
  const start = () => {
    const startButton = document.querySelector('#startButton');
    startButton.addEventListener('click', (event) => {
      console.log('test');
      // displayModule.cellClick();
      displayModule.startGame();
      event.preventDefault();
    });
  };
  return { start };
})();
gameStart.start();
