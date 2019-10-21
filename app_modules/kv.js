module.exports = {
  data: {
    book: "look",
    cool: "rool"
  },
  update: function(key, value) {
    if(! this.data[key]) {
      return `key: ${key} not found`
    }

    this.data[key] = value
    return "200OK"
  },
  remove: function(key) {
    if(! this.data[key]) {
      return `key: ${key} not found`
    }

    delete this.data[key]
    return "200OK"
  },
  add: function(key, value) {
    if(this.data[key]) {
      return `existed key: ${key}`
    }

    this.data[key] = value
    return "200OK"
  }
}
