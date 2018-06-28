'use strict'

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// load manifests
// scripts
require('./listener')
require('./ui')

const cellLength = 10
let gameBoard = []

function createGameBoard () {
    gameBoard = new Array(cellLength)
}

createGameBoard(gameBoard)


// wins = [0, 1, 2] || [3, 4, 5] || [6, 7, 8] || [0, 3, 6] || [1, 4, 7] || [2, 5, 8] || [0, 4, 8] || [2, 4, 6]


module.exports = {
    createGameBoard,
    gameBoard
}