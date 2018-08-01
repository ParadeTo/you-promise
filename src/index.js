function YouPromise (fn) {
  const deferreds = []

  this.then = function (onFulfilled) {
    deferreds.push(onFulfilled)
    return this
  }

  function resolve (value) {
    deferreds.forEach(function (deferred) {
      deferred(value)
    })
  }

  fn(resolve)
}

module.exports = YouPromise
