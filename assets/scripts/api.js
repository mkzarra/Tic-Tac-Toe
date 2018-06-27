const config = require('./config')
const store = require('./store')

const signUp = function (data) {
    return $.ajax({
        url: config.apiUrl + `sign-up`,
        method: 'POST',
        data
    })
}

const signIn = function (data) {
    return $.ajax({
        url: config.apiUrl + `sign-in`,
        method: 'POST',
        data
    })
}

const getUserGames = function () {
    return $.ajax({
        url: config.apiUrl + `/games[?over=]`,
        method: 'GET',
        headers: {
            Authorization: 'Token token=' + store.user.token
        }
    })
}

const findGame = function (game_id) {
    return $.ajax({
        url: config.apiUrl + `/games/` + game_id,
        method: 'GET'
    })
}

const createGame = function () {
    return $.ajax({
        url: config.apiUrl + `/games`,
        method: 'POST'
    })
}

const move = function (game_id) {
    return $.ajax({
        url: config.apiUrl + `/games/` + game_id,
        method: 'PATCH',
        headers: 'Token token=' + store.user.token,
        data

    })
}

module.exports = {
    signUp,
    signIn,
    getUserGames,
    findGame,
    createGame,
    move
}