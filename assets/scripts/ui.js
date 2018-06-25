

const onSelectSuccess = function (data) {
    data = whichPlayer(i)
    console.log('user status: ', data)
}

const onError = function () {
    console.error('Something went wrong!')
}

module.exports = {
    onSelectSuccess,
    onError
}