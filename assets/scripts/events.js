const gameApi = require('./api')
const getFormFields = require('../../lib/get-form-fields.js')
const gameUi = require('./ui')

let currentPlayer = 'O'
let count = 0
let playerOne = []
let playerTwo = []


const onEngageSignUpButton = function (event) {
    event.preventDefault()
    const data = getFormFields(event.target)
    console.log(data)
    console.log(data.form)

    $('#signUpModal').modal('hide')
  }
  
const onEngageSignInButton = function (event) {
    event.preventDefault()
    console.log('Sign in ran!')
    const data = getFormFields(event.target)
    console.log(data)
    console.log(data.form)
    $('#signInModul').modal('hide')
}
const onSignUp = function(event) {
    event.preventDefault()
    const data = getFormFields(event.target.form)
    gameApi.signUp(data)
        .then(gameUi.onSignupSuccess)
        .catch(gameUi.onSignUpFailure)
}

const onSignIn = function(event) {
    event.preventDefault()
    const data = getFormFields(event.target.form)
    gameApi.signIn(data)
        .then(gameUi.onSignInSuccess)
        .catch(gameUi.onSignInFailure)
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

    // event.preventDefault()
    console.log("hi")
    // if cell is occupied. don't change.
    debugger
    if ($(this).html()) {

    }
    togglePlayer()
    $(this).html(currentPlayer)
    // console.log('player made move!')
    // const data = getFormFields(event.target)
    // // const player = orphanFunctions.togglePlayer()
    // gameApi.move(data)
    //     .then(gameUi.onSelectSuccess)
    //     .catch(gameUi.onError)
}



module.exports = {
    onEngageSignUpButton,
    onEngageSignInButton,
    onSignUp,
    onSignIn,
    onGameLoad,
    onSelectCell,
    togglePlayer
}