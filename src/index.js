function YouPromise (fn) {
  let value = null
  let state = 'pending'
  const deferreds = []

  this.then = function (onFulfilled) {
    if (state === 'pending') {
      deferreds.push(onFulfilled)
      return this
    }
    onFulfilled(value)
    return this
  }

  function resolve (newValue) {
    value = newValue
    state = 'fulfilled'
    setTimeout(() => {
      deferreds.forEach(function (deferred) {
        value = deferred(value)
      })
    }, 0)
  }

  fn(resolve)
}

module.exports = YouPromise
