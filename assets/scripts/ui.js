'use strict'

const store = require('./store')
const events = require('./events')

const onSignUpSuccess = function(/*data*/) {
    $('#message').text('Signed up successfully')
    $('#message').css('background-color', 'khaki')
   // console.log('signUpSuccess ran. Data is :', data)
    $('#sign-up-form-section').hide()
    clearFormFields('#sign-up-form')
}

const onSignUpFailure = function(/*error*/) {
    $('#message').text('Error on sign up')
    $('#message').css('background-color', 'red')
    // console.log('signUpFailure ran. Data is :', error)
}

const onSignInSuccess = function(data) {
    // console.log('signedInSuccess ran. Data is :', data)
    $('#message').text('Welcome!')
    $('#message').css('background-color', 'khaki')
    $('#create-game-button').css('display', 'inline-block')
    $('#sign-out-modal').css('display', 'inline-block')
    $('#load-game-button').css('display', 'inline-block')
    $('#change-password-modal').css('display', 'inline-block')
    $('#sign-up-modal').css('display', 'none')
    $('#sign-in-modal').css('display', 'none')
    clearFormFields('#sign-in-form')
    store.user = data.user
    $('#signInModul').modal('hide')
}

const clearFormFields = function(formId) {
    $(formId).each(function () {
        this.reset()
    })
}

const onSignInFailure = function(/*error*/) {
    $('#message').text('Error on sign in')
    $('#message').css('background-color', 'red')
    // console.log('signInFailure ran. Data is :', error)
}

const signOutSuccess = function() {
    store.user = null
    // console.log(events)
    // console.log(events.xWins)
    events.xWins = 0
    // console.log(events.xWins)
    $("#player-x-score").text("Player X: 0")
    events.oWins = 0
    $("#player-o-score").text("Player O: 0")
    $('.stats').hide()
    $('#game-list').css('display', 'none')
    $('#create-game-button').css('display', 'none')
    $('#load-game-button').css('display', 'none')
    $('#sign-out-modal').css('display', 'none')
    $('#sign-up-modal').css('display', 'inline-block')
    $('#sign-in-modal').css('display', 'inline-block')
    $('#game-board').css('display', 'none')
    $('#message').hide()
    $('#change-password-modal').css('display', 'none')
}

const signOutFailure = function(/*error*/) {
    $('#message').text('Error on sign out')
    $('#message').css('background-color', 'red')
    // console.log('signOutFailure ran. Error is :', error)
}

const onChangePasswordSuccess = function(/*data*/) {  
    $('#message').text('Changed password successfully')
    $('#message').css('background-color', 'khaki')
    // console.log('onChangePasswordSuccess ran. Data is :', data)
    $('#change-password-form-section').hide()  
    clearFormFields('#change-password-form')
}

const onChangePasswordFailure = function(/*error*/) {
  $('#message').text('Error on changing password')
  $('#message').css('background-color', 'red')
  // console.log('onChangePasswordFailure ran. Data is :', error)
}

const onGetGameSuccess = function(data) {
    // console.log('onGetGameSuccess ran. Data is :', data)
    $('.stats').hide()
    $('#game-list').css('display', 'inline-block')
    $('#game-board').css('display', 'none')
    let userEmail = store.user.email
    let games = data.games
    games.forEach(function(game) {
        let td1 = document.createElement("td")
        td1.appendChild(document.createTextNode(game.id))
        let td2 = document.createElement("td")
        let opponent
        if(game.player_x !== null && userEmail === game.player_x.email){
            opponent = (game.player_o === null ? "Unknown" : game.player_o.email)
        } else{
            opponent = (game.player_x === null ? "Unknown" : game.player_x.email)
        }        
        td2.appendChild(document.createTextNode(opponent))
        let td3 = document.createElement("td", { text:  "Game Over" })
        if(game.over){
            td3.appendChild(document.createTextNode("Game Over"))

        }else{
            td3.appendChild(document.createTextNode("Active Game"))

        }
        let td4 = document.createElement("td")
        let positions = game.cells
        td4.appendChild(document.createTextNode(positions))
        let tr = document.createElement("tr")
        tr.append(td1)
        tr.append(td2)
        tr.append(td3)
        tr.append(td4)
        $("#game-table").append(tr)
    })
}

const onGetGameFailure = function(/*error*/) {
    $('#message').text('Unable to get game history. Please create new game to play.')
    $('#message').css('background-color', 'red')
    // console.log('onGetGameFailure ran. Data is :', error)
}

const onShowGameSuccess = function(data) {
    store.game.id = data.game.id 
    $('#game-list').css('display', 'none')
    $('#game-board').css("display", "block")
    $('.stats').hide()
}

const onShowGameFailure = function(/*error*/){
    $('#message').text('Unable to fetch game.')
    $('#message').css('color', 'red')
    // console.error(error)
}
const onCreateGameSuccess = function(data) {
    $('#message').text('X\'s turn')
    $('#message').css('background-color', 'khaki')
    $('.game-square').text('')
    // console.log('onCreateGameSuccess ran. Data is :', data)
    $('#game-list').css('display', 'none')
    $('#game-board').css("display", "block")
    store.game = data.game
}

const onCreateGameFailure = function(/*error*/) {
    $('#message').text('Error creating new game')
    $('#message').css('background-color', 'red')
    // console.log('onCreateGameFailure ran. Data is :', error)
}

const onSelectSuccess = function(data) {
    store.game = data.game
}

const onSelectFailure = function() {
    $(this).html("")
    $('#winningModal').modal('hide')
    // console.error('Something went wrong!')
}

module.exports = {
    onSignUpSuccess,
    onSignUpFailure,
    onSignInSuccess,
    onSignInFailure,
    signOutSuccess,
    signOutFailure,
    onChangePasswordSuccess,
    onChangePasswordFailure,
    onCreateGameSuccess,
    onCreateGameFailure,
    onGetGameSuccess,
    onGetGameFailure,
    onShowGameSuccess,
    onShowGameFailure,
    onSelectSuccess,
    onSelectFailure
}