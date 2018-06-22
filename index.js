'use strict'

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// load manifests
// scripts
require('./assets/scripts/index.js')

// styles
require('./assets/styles/index.scss')

// board is array of arrays
const gameBoard = [[0, 1, 2], [0, 1, 2], [0, 1, 2]]
// use pairs to identify the coordinate of each cell
const boardCellPair = [[0, 0], [1, 1], [2, 2]]
// boardCell[0, 0] is boardCellPair [0, 1]
// possible winning scenerios
// win if boardCells [[0,0], [0,1], [0,2]] || [[0,0], [1,0], [2,0]] || [[1,0], [1,1], [1,2]] || [[0,1], [1,1], [2,1]] || [[2,0], [2,1], [2,2]] || [[0,2], [1,2], [2,2]] || [[0,0], [1,1], [2,2]] || [[0,2], [1,1], [2,0]]

const countTurns = function () {
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] % 2 === 0) {
            gameBoard[i].push(playerOne) 
        } else {
            gameBoard[i].push(playerTwo)
            }
        }
    }

// for loop and counter. go through arrays. 
// if element % 2 === 0 it's x's turn. else o's turn

const playerOne = []
const playerTwo = []
// create an empty array for each player. 
// push playerId to their respective arrays. 
// if playerId[] % 3 === 0 that player wins

boardCellPair.forEach(cell => cell % 2 === 0 ? playerOne.push(cell) : playerTwo.push(cell))
