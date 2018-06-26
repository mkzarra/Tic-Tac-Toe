const config = require('./config')

const createGame = function () {
    return $.ajax({
        url: config.apiUrl 
    })
}

const move = function () {
    return $.ajax({
        url: config.apiUrl,
        method: 'PATCH'
    })
}

module.exports = {
    createGame,
    move
}