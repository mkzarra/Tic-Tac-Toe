const gameApi = require('./api')
const getFormFields = require('../../lib/get-form-fields.js')
const gameUi = require('./ui')
const orphanFunctions = require('./index')

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
    gameApi.getUserGames()
        .then(gameUi.onGetGameSuccess)
        .catch(gameUi.onGetGameFailure)
}

const onSelectCell = function(event) {
    event.preventDefault()
    const data = getFormFields(event.target)
    let player = orphanFunctions.togglePlayer
    gameApi.move(player)
        .then(gameUi.onSelectSuccess)
        .catch(gameUi.onError)
}

module.exports = {
    onSignUp,
    onSignIn,
    onGameLoad,
    onSelectCell,
}