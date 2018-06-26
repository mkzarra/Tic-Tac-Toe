const gameApi = require('./api')
const getFormFields = require('../../lib/get-form-fields.js')
const gameUi = require('./ui')
const orphanFunctions = require('../../../tic-tac-toe/index.js')

const onSelectCell = function(event) {
    event.preventDefault()
    const data = getFormFields(event.target)
    let playerTurn = orphanFunctions.togglePlayer(data)
    gameApi.move(playerTurn)
        .then(gameUi.onSelectSuccess)
        .catch(gameUi.onError)
}


// let accessBtn = $('#doAccess');

// accessBtn.click(function() {
//    accessBtn[0].disabled = true;
//    DoSave();
// });

module.exports = {
    onSelectCell,
}