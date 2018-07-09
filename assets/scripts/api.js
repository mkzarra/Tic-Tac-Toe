const config = require('./config')
const store = require('./store')

const signUp = function(data) {
    return $.ajax({
        url: config.apiUrl + `sign-up`,
        method: 'POST',
        data
    })
}

const signIn = function(data) {
    return $.ajax({
        url: config.apiUrl + `sign-in`,
        method: 'POST',
        data
    })
}

const changePassword = function(data) {
    return $.ajax({
        url: config.apiUrl + 'change-password',
        method: 'PATCH',
        headers: {
            Authorization: 'Token token=' + store.user.token
        },
        data
    })
}

const signOut = function() {
    return $.ajax({
        url: config.apiUrl + 'sign-out',
        method: 'DELETE',
        headers: {
            Authorization: 'Token token=' + store.user.token
        }
    })
}

const getUserGames = function() {
    return $.ajax({
        url: config.apiUrl + `games/`,
        method: 'GET',
        headers: {
            Authorization: 'Token token=' + store.user.token
        }
    })
}

const showGame = function(game) {
    console.log(game.id)
    console.log(data)
    console.log(game)
    return $.ajax({
        url: config.apiUrl + `games/` + store.game.id,
        method: 'GET',
        headers: {
            Authorization: 'Token token=' + store.user.token
        }
    })
}

const createGame = function() {
    console.log(store.game)
    return $.ajax({
        url: config.apiUrl + `games/`,
        method: 'POST',
        headers: {
            'Authorization': `Token token=` + store.user.token
        },
        data: {}
    })
}

const move = function(index, currentPlayer, over) {
    return $.ajax({
        headers: {
            'Authorization': `Token token=` + store.user.token
        },
        url: config.apiUrl + `games/` + store.game.id,
        method: 'PATCH',
        data: {
            "game": {
              "cell": {
                "index": index,
                "value": currentPlayer
              },
              "over": over
            }
          }
    })
}

module.exports = {
    signUp,
    signIn,
    changePassword,
    signOut,
    createGame,
    getUserGames,
    showGame,
    move
}
