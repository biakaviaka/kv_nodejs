module.exports = {
  fetchInput: function(identifier) {
    var pairs = identifier.split('&')
    var input = {}

    pairs.forEach(function(pair) {
        var data = pair.split('=')
        input[data[0]] = decodeURIComponent(data[1])
    });

    return input
  }
}
