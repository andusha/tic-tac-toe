"use strict";

const Cell = () => {
  let symbol = ''
  const addSymbol = (player) => symbol = player
  const getSymbol = () => symbol

  return {addSymbol, getSymbol}
}

const Player = (name, symbol) => {
  let score = 0
  const addScore = () => ++score  
  const getScore = () => score
  const getSymbol = () => symbol

  return {name, getSymbol, addScore, getScore}
}

const Gameboard = () =>{
    let board = [];
    const create  = () =>  {
      for(var i=0; i<3; i++){
        board[i] = [];
        for(var j=0; j<3; j++){
          board[i][j] = Cell()
        }}
      }
    const getBoard = () =>  board;
    const dropSymbol = (player, row, column) => {
      let isAvailableCell = board[row][column].getSymbol()

      if (isAvailableCell) return;

      board[row][column].addSymbol(player)
    }
    const printBoard = () => {
      const boardWithCellValues = board.map((row) => row.map((cell) => cell.getSymbol()))
      console.log(boardWithCellValues);
    }

    return {create, getBoard, dropSymbol, printBoard}
};

const GameContoller = (() => {
  const board = Gameboard()
  const players = [
    Player('jeff', 'X'),
    Player('oloff', 'O')
  ]
  let activePlayer = players[0]

  const activePlayerToggle = () => activePlayer = activePlayer === players[0] ? players[1] : players[0]
  const getActivePlayer = () => activePlayer
  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name} turn.`);
  };

  const playRound = (row, column) => {
    if (board.getBoard()[row][column].getSymbol())  {
      return console.log('you cant drop symbol in the occupied cell');
    }

    board.dropSymbol(getActivePlayer().getSymbol(), row, column)
    
    if (winCombination()) return true
    if (draw()) return false

    console.log(
      `${getActivePlayer().name} dropping ${getActivePlayer().getSymbol()} into ${row} row and column ${column}...`
    );

    activePlayerToggle()
    printNewRound()
  }

  const winCombination = () => {

    function rowsCombinations() {
      let count = []
  
      for (let i =0; i < 3; i++){
        count[i] = []
        for (let j = 0; j < 3; j++){
          if (board.getBoard()[i][j].getSymbol() === getActivePlayer().getSymbol()){
             count[i].push(getActivePlayer().getSymbol())
          }
        }}
  
      let winCondition = count.filter(function (row) {
        return row.length === 3
      })
      console.log('row',{winCondition, count})
      if (winCondition.length) return true
      else return false
    }
    function columnCombination() {
      let count = []
    
      for (let i =0; i < 3; i++){
        count[i] = []
        for (let j = 0; j < 3; j++){
          if (board.getBoard()[j][i].getSymbol() === getActivePlayer().getSymbol()){
            count[i].push(getActivePlayer().getSymbol())
          }
        }}
    
        let winCondition = count.filter(function (column) {
          return column.length === 3
        })
        console.log('column',{winCondition, count})
        if (winCondition.length) return true
        else return false
    }

    function diagonalCombination() {
      let count = [[],[]]
    
      for (let i =0; i < 3; i++){
        if (board.getBoard()[i][i].getSymbol() === getActivePlayer().getSymbol()){
          count[0].push(getActivePlayer().getSymbol())
        }
        if (board.getBoard()[i][3-i-1].getSymbol() === getActivePlayer().getSymbol()){
          count[1].push(getActivePlayer().getSymbol())
        }
      }
      let winCondition = count.filter(function (diagonal) {
        return diagonal.length === 3
      })
      console.log('diagonal',{winCondition, count})
      if (winCondition.length) return true
      else return false
    }

    if (rowsCombinations() || columnCombination() || diagonalCombination()) return true
    return false
  }
  const draw = () =>{
    let count = 0
    for (let i =0; i < 3; i++){
      for (let j = 0; j < 3; j++){
        if (board.getBoard()[i][j].getSymbol()) count++
      }}

    if (count === 9) return true
    return false
  }

  board.create()
  printNewRound()

  return {playRound, getActivePlayer, getBoard: board.getBoard}
})();

const ScreenController = (() => {
  const board = GameContoller.getBoard()
  const game = GameContoller.playRound()
  const wrapper = document.querySelector('.wrapper')
  const turn = document.querySelector('.turn')

  const updateScreen = () =>{
    wrapper.innerHTML = ''
    board.map((row) => {
      row.map((column) => {
        const button = document.createElement('button')
         
      })
    })
  }
  return {board, game}
})()


//const player1 = Player('jeff', 'X', true)
//const player2 = Player('Oloff', 'O', false)

/*function matrixArray(rows,columns){
    var arr = [];
    for(var i=0; i<rows; i++){
      arr[i] = [];
      for(var j=0; j<columns; j++){
        arr[i][j] = i+j+1; //вместо i+j+1 пишем любой наполнитель. В простейшем случае - null
      }
    }
    return arr;
  }
  var myMatrix = matrixArray(3,3);
  for (let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
        console.log(j, i, myMatrix[j][i])
    }
  }
  */

