const gameApi = require('./api')
const getFormFields = require('../../lib/get-form-fields.js')
const gameUi = require('./ui')
const store = require('./store')

let currentPlayer = 'O'
let wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
let cellLength = 9
1
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

const onSignOut = function(event) {
    event.preventDefault()
    $('#signOutModal').modal('show')
    gameApi.signOut()
    .then(gameUi.signOutSuccess)
    .catch(gameUi.signOutFailure)
}

const onGetUserGames = function(){
    gameApi.getUserGames().
    then(gameUi.onGetGameSuccess)
    .catch(gameUi.onGetGameFailure)
}

const onCreateNewGame = function() {
    if (store.user === undefined) {
        $('#signInModal').modal('show')
    } else {
        currentPlayer = 'O'
        gameApi.createGame()
            .then(gameUi.onCreateGameSuccess)
            .catch(gameUi.onCreateGameFailure) 
    }   
}

const onGameLoad = function(event) {
    event.preventDefault()
    console.log("here")
    gameApi.findGame()
        .then(gameUi.onGetGameSuccess)
        .catch(gameUi.onGetGameFailure)
}

function togglePlayer() {
    if (currentPlayer === 'X') {
        currentPlayer = 'O'
    } else {
        currentPlayer = 'X'
    }
}

const onSelectCell = function(event) {
    console.log(store)
    if (store.user === undefined || store.game === undefined || 
        store.game.over === true) {
            console.log("you can't make a move.")
        return
    }
    // TODO store move data
    let element = $(this).html()
    let td = event.target
    let index = parseInt(td.id)
    let gameBoard = store.game.cells
    // boardInPlay.push(index)
    // console.log(boardInPlay)
    // console.log(index)
    if (element === 'X' || element === 'O') {
        return false
    } else {
        togglePlayer()
        gameBoard[index] = currentPlayer
        $(this).html(currentPlayer)
    }

    // TODO patch moves to server
    let currentPositions = []
    for (let i = 0; i < cellLength; i++) {
        if (gameBoard[i] === currentPlayer) {
            currentPositions.push(i)
            console.log(currentPositions)
            console.log(currentPositions.length)
        }
    }

    let over = checkForWin(currentPositions, wins)
    // wins.forEach(function(winList) {
    //     let count = 0;
    //     currentPositions.forEach(function(position) {
    //         if (winList.includes(position)) { 
    //             count++
    //         }
    //     })
    //     if (count === 3) {
    //         $('#winningText').text("Congrats! " + currentPlayer + " is the winner!")
    //         $('#winningModal').modal('show')
    //         gameOver = true
    //     } else if (currentPositions.length === cellLength) {
    //         $('#winningText').text("Tie Game")
    //         $('#winningModal').modal('show')
    //         gameOver = true
    //     } 
    // })

    gameApi.move(index, currentPlayer, over)
        .then(gameUi.onSelectSuccess)
        .catch(gameUi.onSelectFailure)
}

function checkForWin(currentPositions, wins) {
    let winner = false
    wins.some(function(winList) {
        let count = 0;
        currentPositions.forEach(function(position) {
            if (winList.includes(position)) { 
                count++
            }
        })
        if (count === 3) {
            $('#winningText').text("Congrats! " + currentPlayer + " is the winner!")
            $('#winningModal').modal('show')
            winner = true
        } else if (currentPositions.length === 5) {
            $('#winningText').text("Tie Game")
            $('#winningModal').modal('show')
            winner = true
        } 
    })
    return winner
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
    onSignOut,
    onGetUserGames,
    onCreateNewGame,
    onGameLoad,
    onSelectCell,
    togglePlayer
}