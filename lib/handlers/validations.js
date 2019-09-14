'use strict'

function validateTopic (topic, message) {
  var tlen = topic.length

  if (tlen === 0) {
    return new Error('impossible to ' + message + ' to an empty topic')
  }

  var end = tlen - 1
  var endMinus = end - 1
  var slashInPreEnd = endMinus > 0 && topic.charCodeAt(endMinus) !== 47

  for (var i = 0; i < tlen; i++) {
    switch (topic.charCodeAt(i)) {
      case 35:
        var notAtTheEnd = i !== end
        if (notAtTheEnd || slashInPreEnd) {
          return new Error('# is only allowed in ' + message + ' in the last position')
        }
        break
      case 43:
        var pastChar = i < end - 1 && topic.charCodeAt(i + 1) !== 47
        var preChar = i > 1 && topic.charCodeAt(i - 1) !== 47
        if (pastChar || preChar) {
          return new Error('+ is only allowed in ' + message + ' between /')
        }
        break
    }
  }
}

module.exports.validateTopic = validateTopic
