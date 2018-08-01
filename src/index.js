function YouPromise (fn) {
  const deferreds = []

  this.then = function (onFulfilled) {
    deferreds.push(onFulfilled)
    return this
  }

  function resolve (value) {
    setTimeout(() => {
      deferreds.forEach(function (deferred) {
        deferred(value)
      })
    }, 0)
  }

  fn(resolve)
}

module.exports = YouPromise
