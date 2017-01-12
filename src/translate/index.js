if (!window.Intl) {
  window.Intl = require('intl') // polyfill for `Intl`
  require('intl/locale-data/jsonp/en-US.js')
  require('intl/locale-data/jsonp/es.js')
}

var IntlMessageFormat = require('intl-messageformat')

var es = require('./es')
var en = require('./en-US')

var MESSAGES = {}
MESSAGES.es = es
MESSAGES['en-US'] = en

var locale = localStorage.locale || 'es'

module.exports = {
  message: function (text, opts) {
    opts = opts || {}
    var msg = new IntlMessageFormat(MESSAGES[locale][text], locale, null)
    return msg.format(opts)
  }
}
