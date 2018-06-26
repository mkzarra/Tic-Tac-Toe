

const onSelectSuccess = function () {
    console.log('user status: ', onSelectCell)
}

const onError = function () {
    console.error('Something went wrong!')
}

module.exports = {
    onSelectSuccess,
    onError
}