'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const eventHandler = require('./events')

$(() => {
  $('#signUpModal').on('click', eventHandler.onEngageSignUpButton)
  $('#signInModal').on('click', eventHandler.onEngageSignInButton)
  $('#sign-up-button').on('submit', eventHandler.onSignUp)
  $('#sign-in-button').on('submit', eventHandler.onSignIn)
  $("#cellI").click(eventHandler.onSelectCell)
  $("#cellII").click(eventHandler.onSelectCell)
  $("#cellIII").click(eventHandler.onSelectCell)
  $("#cellIV").click(eventHandler.onSelectCell)
  $("#cellV").click(eventHandler.onSelectCell)
  $("#cellVI").click(eventHandler.onSelectCell)
  $("#cellVII").click(eventHandler.onSelectCell)
  $("#cellVIII").click(eventHandler.onSelectCell)
  $("#cellIX").click(eventHandler.onSelectCell)
})

module.exports = {
  eventHandler
}