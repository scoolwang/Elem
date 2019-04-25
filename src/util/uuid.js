/* eslint-disable */
var uuid = require('uuid');

function get () {
	return uuid.v4().replace(/\-/g,'')
}

module.exports = get