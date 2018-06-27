'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const eventHandler = require('./events')

$(() => {

  $('#sign-up-button').on('click', eventHandler.onSignUp)
  $('#sign-in-button').on('click', eventHandler.onSignIn)
  $('#sign-in-button').submit(eventHandler.onGameLoad)
  $('.cell-selector').on('click', eventHandler.onSelectCell)
})

module.exports = {
  eventHandler
}