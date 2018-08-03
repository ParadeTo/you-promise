function YouPromise (fn) {
  let value = null
  let state = 'pending'
  const deferreds = []

  this.then = function (onFulfilled) {
    return new YouPromise(function (resolve) {
      handle({
        onFulfilled: onFulfilled || null,
        resolve: resolve
      })
    })
  }

  function handle (deferred) {
    if (state === 'pending') {
      deferreds.push(deferred)
      return
    }

    var ret = deferred.onFulfilled(value)
    deferred.resolve(ret)
  }

  function resolve (newValue) {
    if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
      var then = newValue.then
      if (typeof then === 'function') {
        then.call(newValue, resolve)
        return
      }
    }
    state = 'fulfilled'
    value = newValue
    setTimeout(function () {
      deferreds.forEach(function (deferred) {
        handle(deferred)
      })
    }, 0)
  }

  fn(resolve)
}

module.exports = YouPromise
