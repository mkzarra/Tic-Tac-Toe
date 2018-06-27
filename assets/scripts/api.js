const config = require('./config')
const store = require('./store')

const signUp = function (data) {
    return $.ajax({
        url: config.apiUrl + 'sign-up',
        method: 'POST',
        data: data
    })
}

const signIn = function (data) {
    return $.ajax({
        url: config.apiUrl + 'sign-in',
        method: 'POST',
        data: data
    })
}

const getUserGames = function () {
    console.log(store)
    return $.ajax({
        url: config.apiUrl + 'games',
        headers: {
            Authorization: 'Token token=' + store.user.token
        }
    })
}

const createGame = function () {
    return $.ajax({
        url: config.apiUrl 
    })
}

const move = function (game_id) {
    return $.ajax({
        url: config.apiUrl + 'games/'+ game_id,
        method: 'PATCH'
    })
}

module.exports = {
    signUp,
    signIn,
    getUserGames,
    createGame,
    move
}