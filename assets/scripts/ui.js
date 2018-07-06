'use strict'

const store = require('./store')

const onSignUpSuccess = function (data) {
    $('#message').text('Signed up successfully')
    $('#message').css('background-color', 'green')
    console.log('signUpSuccess ran. Data is :', data)
    $('#sign-up-form-section').hide()
}

const onSignUpFailure = function (error) {
    $('#message').text('Error on sign up')
    $('#message').css('background-color', 'red')
    console.log('signUpFailure ran. Data is :', error)
}

const onSignInSuccess = function (data) {
    $('#message').text('Signed in successfully')
    $('#message').css('background-color', 'green')
    console.log('signedInSuccess ran. Data is :', data)
    $('#create-game-button').css('display', 'block')
    $('#sign-out-modal').css('display', 'block')
    $('#load-game-button').css('display', 'block')
    $('#sign-up-modal').css('display', 'none')
    $('#sign-in-modal').css('display', 'none')
    store.user = data.user
    $('#signInModul').modal('hide')
}

const onSignInFailure = function (error) {
    $('#message').text('Error on sign in')
    $('#message').css('background-color', 'red')
    console.log('signInFailure ran. Data is :', error)
}

const signOutSuccess = function () {
    store.user = null
    $('#create-game-button').css('display', 'none')
    $('#load-game-button').css('display', 'none')
    $('#sign-out-modal').css('display', 'none')
    $('#sign-up-modal').css('display', 'block')
    $('#sign-in-modal').css('display', 'block')
    $('#game-board').css('display', 'none')
}

const signOutFailure = function (error) {
    $('#message').text('Error on sign out')
    $('#message').css('background-color', 'red')
    console.log('signOutFailure ran. Error is :', error)
}
const onGetGameSuccess = function(data) {
    console.log('onGetGameSuccess ran. Data is :', data)
    $('#game-list').css('display', 'block')
    $('#game-board').css('display', 'none')
    let userEmail = store.user.email
    let games = data.games
    games.forEach(function(game){
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
        let tr = document.createElement("tr")
        tr.append(td1)
        tr.append(td2)
        tr.append(td3)
        $("#game-table").append(tr)
    })
}

const onGetGameFailure = function(error){
    $('#message').text('Unable to get game history. Please create new game to play.')
    $('#message').css('background-color', 'red')
    console.log('onGetGameFailure ran. Data is :', error)
}

const onCreateGameSuccess = function (data) {
    $('#message').text('Success!')
    $('#message').css('background-color', 'green')
    $('.game-square').text('')
    console.log('onCreateGameSuccess ran. Data is :', data)
    $('#game-list').css('display', 'none')
    $('#game-board').css("display", "block")
    store.game = data.game
}

const onCreateGameFailure = function (error) {
    $('#message').text('Error creating new game')
    $('#message').css('background-color', 'red')
    console.log('onCreateGameFailure ran. Data is :', error)
}

const onSelectSuccess = function (data) {
    store.game = data.game
}

const onSelectFailure = function () {
    $(this).html("")
    $('#winningModal').modal('hide')
    console.error('Something went wrong!')
}

module.exports = {
    onSignUpSuccess,
    onSignUpFailure,
    onSignInSuccess,
    onSignInFailure,
    signOutSuccess,
    signOutFailure,
    onCreateGameSuccess,
    onCreateGameFailure,
    onGetGameSuccess,
    onGetGameFailure,
    onSelectSuccess,
    onSelectFailure
}