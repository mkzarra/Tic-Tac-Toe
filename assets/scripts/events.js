const gameApi = require('./api')
const getFormFields = require('../../lib/get-form-fields.js')
const gameUi = require('./ui')
const store = require('./store')

let currentPlayer = 'O'
let wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
// let count = 0
let gameBoard = new Array(cellLength)
let playerOne = []
let playerTwo = []
let totalMovesPlayed = []
let cellLength = 10
let gameOver = false
let gameId


const onEngageSignUpButton = function (event) {
    event.preventDefault()
    $('#signUpModal').modal('show')
  }
  
const onEngageSignInButton = function (event) {
    event.preventDefault()
    $('#signInModal').modal('show')
}
const onSignUp = function(event) {
    event.preventDefault()
    const data = getFormFields(event.target)
    gameApi.signUp(data)
        .then(gameUi.onSignupSuccess)
        .catch(gameUi.onSignUpFailure)
    $('#signUpModal').modal('hide')
}

const onSignIn = function(event) {
    event.preventDefault()
    const data = getFormFields(event.target)
    console.log(data)
    gameApi.signIn(data)
        .then(gameUi.onSignInSuccess)
        .catch(gameUi.onSignInFailure)
    $('#signInModal').modal('hide')
}

const createNewGame = function(event) {
    console.log("here")
    if(store.user === undefined){
        $('#signInModal').modal('show')
        return
    }
    console.log("token: " +store.user.token)
    event.preventDefault()
    gameApi.createNewGame()
    .then(gameUi.onCreateGameSuccess)
    .catch(gameUi.onCreateGameFailure)
}

const onGameLoad = function(event) {
    event.preventDefault()
    console.log("here")
    gameApi.createGame()
        .then(gameUi.onGetGameSuccess)
        .catch(gameUi.onGetGameFailure)
}

function togglePlayer () {
    if (currentPlayer === 'X') {
        currentPlayer = 'O'
    } else {
        currentPlayer = 'X'
    }
}



const onSelectCell = function(event) {
    console.log(store.user)
    if(store.user === undefined || gameOver === true){
        return
    }
    // TODO store move data
    // TODO check for win or tied
    let element = $(this).html()
    let td = event.target
    console.log(td.id)
    let index = parseInt(td.id)
    console.log(index)
    if (element === 'X' || element === 'O') {
        return false
    } else {
        togglePlayer()
        gameBoard[index] = currentPlayer
        $(this).html(currentPlayer)
    }

    // TODO winning logic
    // TODO patch moves to server

    let currentPositions = []
    for(let i=0; i < cellLength; i++){
        if (gameBoard[i] === currentPlayer){
            currentPositions.push(i)
        }
    }

    wins.forEach(function(winList) {
        let count = 0;
        currentPositions.forEach(function(position){
            if(winList.includes(position)) { 
                count++;
            }
        })
        if(count === 3){
            $('#winningText').text("Congrats! " +currentPlayer + " is the winner!")
            $('#winningModal').modal('show')
            // TODO replace with modal 
            // TODO stop game from moving forward
            gameOver = true
        }
    })

    // totalMovesPlayed.push('#cell')
    // // see draw
    // if (currentPlayer === 'X') {
    // playerOne.push('#cell')
    // } else {
    // playerTwo.push('#cell')
    // }
    // if (playerOne[some winning combo] === true) {
    // message 'playerOne wins!' end game
    // } else if (playerTwo[some winning combo] === true) {
    // message 'playerTwo wins!' end game
    // } else if (totalMovesPlayed.length > 7) {
    // message 'game is draw' end game
    // }
    // gameApi.move(data)
    //     .then(gameUi.onSelectSuccess)
    //     .catch(gameUi.onError)
}

// ui.js
// show move
// declare win or tie

// api.js
// cells: array with current state of board
// over: true if win/tie
// id: game id saved when it is created.

module.exports = {
    onEngageSignUpButton,
    onEngageSignInButton,
    onSignUp,
    onSignIn,
    createNewGame,
    onGameLoad,
    onSelectCell,
    togglePlayer
}