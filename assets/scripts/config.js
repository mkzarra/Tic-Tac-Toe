'use strict'

// styles
require('../styles/index.scss')

let apiUrl
const apiUrls = {
  production: 'https://aqueous-atoll-85096.herokuapp.com/',
  development: 'https://tic-tac-toe-wdi.herokuapp.com/'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

module.exports = {
  apiUrl,
  module: {
    loaders: [
        {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
        }
    ]
  }
}
