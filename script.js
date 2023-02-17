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
  const board = ['', '', '', '', '', '', '', '', ''];

  const renderBoard = () => {
    cells.forEach((cell, index) => {
      cell.innerHTML = board[index];
    });
  };

  const findCellByIndex = (index) => {
    const cellsArr = Array.from(document.querySelectorAll('.cell'));
    return cellsArr[index];
  };

  const findCellByElement = (element) => {
    const cellsArr = Array.from(document.querySelectorAll('.cell'));
    return cellsArr.indexOf(element);
  };

  const createPlayer = (playerOne, playerTwo) => {
    const one = Player(playerOne, 'X');
    const two = Player(playerTwo, 'O');
    console.log(one, two);
    console.log('test');
    let activePlayer = one.getMark();
    console.log(`active player ${activePlayer}`);

    const switchPlayer = () => {
      activePlayer = activePlayer === 'X' ? 'O' : 'X';
    };
    const activeMark = () => {
      const mark = activePlayer;
      console.log(mark);
      return mark;
    };

    return {
      one,
      two,
      switchPlayer,
      activeMark,
    };
  };
  const putMark = (elem, mark) => {
    // need to get index of given cell
    const index = findCellByElement(elem);
    console.log(`Mark: ${mark}`);
    if (board[index] === '') {
      board[index] = mark;
    }
  };

  return {
    board,
    renderBoard,
    findCellByIndex,
    findCellByElement,
    createPlayer,
    putMark,
  };
})();

// display module

const displayModule = (() => {
  const cells = document.querySelectorAll('.cell');
  const player = gameBoard.createPlayer();
  const cellClick = (e) => {
    const index = e.target;
    const activeMark = player.activeMark();
    gameBoard.putMark(index, activeMark);
    gameBoard.renderBoard();
    player.switchPlayer();
    // gameBoard.switchPlayer();
  };
  cells.forEach((e) => e.addEventListener('click', cellClick));
})();
