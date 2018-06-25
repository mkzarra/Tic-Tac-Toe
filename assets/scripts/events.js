const gameApi = require('./api.js')
// const getFormFields = require('../../lib/get-form-fields.js')
const gameUi = require('./ui.js')

const onSelectCell = function(event) {
    event.preventDefault()
    gameApi.move()
        .then(gameUi.onSelectSuccess)
        .catch(gameUi.onError)
}

// let accessBtn = $('#doAccess');

// accessBtn.click(function() {
//    accessBtn[0].disabled = true;
//    DoSave();
// });

module.exports = {
    onSelectCell
}