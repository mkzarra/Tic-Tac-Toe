const gameApi = require('./api')
const getFormFields = require('../../lib/get-form-fields.js')
const gameUi = require('./ui')
const store = require('./store')

let currentPlayer = 'O'
let wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
let cellLength = 9

const onEngageSignUpButton = function(event) {
    event.preventDefault()
    $('#signUpModal').modal('show')
  }
  
const onEngageSignInButton = function(event) {
    event.preventDefault()
    $('#signInModal').modal('show')
}

const onEngagePasswordChangeButton = function() {
    event.preventDefault()
    $('#changePasswordModal').modal('show')
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

const onChangePassword = function(event) {
    event.preventDefault()
    const data = getFormFields(event.target)
    console.log(data)
    gameApi.changePassword(data)
        .then(gameUi.onChangePasswordSuccess)
        .catch(gameUi.onChangePasswordFailure)
    $('#changePasswordModal').modal('hide')
}

const onGetUserGames = function() {
    gameApi.getUserGames()
    .then(gameUi.onGetGameSuccess)
    .catch(gameUi.onGetGameFailure)
}

const onCreateNewGame = function() {
    if (store.user === undefined) {
        $('#signInModal').modal('show')
    } else {
        $('#message').show()
        currentPlayer = 'O'
        gameApi.createGame()
            .then(gameUi.onCreateGameSuccess)
            .catch(gameUi.onCreateGameFailure) 
    }   
}

const onShowGame = function(event) {
    event.preventDefault()
    console.log(event)
    gameApi.showGame(game.id)
        .then(gameUi.onShowGameSuccess)
        .catch(gameUi.onShowGameFailure)
}

function togglePlayer() {
   if (currentPlayer === 'X') {
        currentPlayer = 'O'
        $('#message').text('X\'s turn')
  } else {
        currentPlayer = 'X'
        $('#message').text('O\'s turn')
    }
} 


const onSelectCell = function(event) {
    console.log(store)
    if (store.user === undefined || store.game === undefined || 
        store.game.over === true) {
            $('#errorMessage').text("You can't make a move right now. Try logging in or creating a new game.")
            $('#nopeModal').modal('show')
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
        $('#errorMessage').text("This cell has already been selected!")
        $('#nopeModal').modal('show')
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
        }
    }

    let over = checkForWin(currentPositions, wins)

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
            $('#message').hide()
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
    onEngagePasswordChangeButton,
    onSignUp,
    onSignIn,
    onSignOut,
    onChangePassword,
    onGetUserGames,
    onCreateNewGame,
    onShowGame,
    onSelectCell,
    togglePlayer
}