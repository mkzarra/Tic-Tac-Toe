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
    store.user = data.user
    $('#sign-up-form-section').hide()
    $('#sign-in-form-section').hide()
}

const onSignInFailure = function (error) {
    $('#message').text('Error on sign in')
    $('#message').css('background-color', 'red')
    console.log('signInFailure ran. Data is :', error)
}

const onGetGameSuccess = function (data) {
    $('#message').text('Success!')
    $('#message').css('background-color', 'green')
    console.log('onGetGameSuccess ran. Data is :', data)
}

const onGetGameFailure = function (error) {
    $('#message').text('Error getting game history')
    $('#message').css('background-color', 'red')
    console.log('onGetGameFailure ran. Data is :', error)
}

const onSelectSuccess = function () {
    console.log('user status: ', onSelectCell)
}

const onError = function () {
    console.error('Something went wrong!')
}

module.exports = {
    onSignUpSuccess,
    onSignUpFailure,
    onSignInSuccess,
    onSignInFailure,
    onGetGameSuccess,
    onGetGameFailure,
    onSelectSuccess,
    onError
}