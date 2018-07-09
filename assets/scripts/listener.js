'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const eventHandler = require('./events')
$(() => {
  $('#sign-up-modal').on('click', eventHandler.onEngageSignUpButton)
  $('#sign-in-modal').on('click', eventHandler.onEngageSignInButton)
  $('#change-password-modal').on('click', eventHandler.onEngagePasswordChangeButton)
  $('#sign-up-form').on('submit', eventHandler.onSignUp)
  $('#change-password-form').on('submit', eventHandler.onChangePassword)
  $('#sign-in-form').on('submit', eventHandler.onSignIn)  
  $('#sign-out-modal').on('click', eventHandler.onSignOut)
  $('#create-game-button').on('click', eventHandler.onCreateNewGame)
  $('#load-game-button').on('click', eventHandler.onGetUserGames)
  $('.show-game-button').on('click', eventHandler.onShowGame)
  $('#closeWinningModal').on('click')
  $("#0cell").click(eventHandler.onSelectCell)
  $("#1cell").click(eventHandler.onSelectCell)
  $("#2cell").click(eventHandler.onSelectCell)
  $("#3cell").click(eventHandler.onSelectCell)
  $("#4cell").click(eventHandler.onSelectCell)
  $("#5cell").click(eventHandler.onSelectCell)
  $("#6cell").click(eventHandler.onSelectCell)
  $("#7cell").click(eventHandler.onSelectCell)
  $("#8cell").click(eventHandler.onSelectCell)
})

module.exports = {
  eventHandler
}