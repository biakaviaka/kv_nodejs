module.exports = {
  data: new Map([
    ['book', 'look'],
    ['cool', 'rool']
  ]),
  update: function(key, value) {
    if(! this.data.get(key)) {
      return `key: ${key} not found`
    }

    this.data.set(key, value)
    return "200OK"
  },
  remove: function(key) {
    if(! this.data.get(key)) {
      return `key: ${key} not found`
    }

    this.data.delete(key)
    return "200OK"
  },
  add: function(key, value) {
    console.log(`${typeof(key)} ${typeof(value)}`)
    if(this.data.get(key)) {
      return `existed key: ${key}`
    }

    this.data.set(key, value)
    return "200OK"
  }
}
