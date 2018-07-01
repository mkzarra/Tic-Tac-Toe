const config = require('./config')
const store = require('./store')

const signUp = function (data) {
    return $.ajax({
        url: config.apiUrl + `/sign-up`,
        method: 'POST',
        data
    })
}

const signIn = function (data) {
    return $.ajax({
        url: config.apiUrl + `/sign-in`,
        method: 'POST',
        data
    })
}

const getUserGames = function () {
    return $.ajax({
        url: config.apiUrl + `/games/`,
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

const createNewGame = function () {
    return $.ajax({
        url: config.apiUrl + `/games/`,
        method: 'POST',
        headers: {
            'Authorization': `Token token=` + store.user.token
        }
    })
}

const move = function (game_id, data) {
    return $.ajax({
        headers: {
            'Authorization': `Token token=` + store.user.token
        },
        url: config.apiUrl + `/games/` + game_id,
        method: 'PATCH',
        data
    })
}

module.exports = {
    signUp,
    signIn,
    createNewGame,
    getUserGames,
    findGame,
    move
}