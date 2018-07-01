'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const eventHandler = require('./events')

$(() => {
  $('#sign-up-modal').on('click', eventHandler.onEngageSignUpButton)
  $('#sign-in-modal').on('click', eventHandler.onEngageSignInButton)
  $('#sign-up-form').on('submit', eventHandler.onSignUp)
  $('#sign-in-form').on('submit', eventHandler.onSignIn)
  $('#create-game-button').on('click', eventHandler.createNewGame)
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