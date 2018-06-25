const config = require('./config.js')

const move = function () {
    $.ajax({
        url: config.apiUrl,
        method: 'POST',
        data
    })
}

module.exports = {
    move
}