/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
const Player = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;
  return { getName, getMark };
};
const gameBoard = (() => {
  const cells = document.querySelectorAll('.cell');
  const board = ['', '', '', '', '', '', '', '', ''];
  // for (let i = 0; i < 9; i++) {
  //   board[i].push();
  // }
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
  const putMark = (elem) => {
    // need to get index of given cell
    const index = findCellByElement(elem);
    // mark = Player.getMark();
    const mark = 'X';
    board[index] = mark;
  };

  return {
    board, renderBoard, putMark, findCellByIndex, findCellByElement,
  };
})();

// display module

const displayModule = (() => {
  const cells = document.querySelectorAll('.cell');

  const cellClick = (e) => {
    const index = e.target;
    gameBoard.putMark(index);
    gameBoard.renderBoard();
  };
  cells.forEach((e, index) => e.addEventListener('click', cellClick));
})();
