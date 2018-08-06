function YouPromise (fn) {
  let value = null
  let state = 'pending'
  const deferreds = []

  this.then = function (onFulfilled, onRejected) {
    return new YouPromise(function (resolve, reject) {
      handle({
        onFulfilled: onFulfilled || null,
        onRejected: onRejected || null,
        resolve: resolve,
        reject: reject
      })
    })
  }

  function handle (deferred) {
    if (state === 'pending') {
      deferreds.push(deferred)
      return
    }

    let cb = state === 'fulfilled' ? deferred.onFulfilled : deferred.onRejected
    let ret
    if (cb === null) {
      cb = state === 'fulfilled' ? deferred.resolve : deferred.reject
      cb(value)
      return
    }

    try {
      ret = cb(value)
      deferred.resolve(ret)
    } catch (e) {
      deferred.reject(e)
    }
  }

  function resolve (newValue) {
    if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
      const then = newValue.then
      if (typeof then === 'function') {
        then.call(newValue, resolve, reject)
        return
      }
    }
    state = 'fulfilled'
    value = newValue
    finale()
  }

  function reject (reason) {
    state = 'rejected'
    value = reason
    finale()
  }

  function finale () {
    setTimeout(function () {
      deferreds.forEach(function (deferred) {
        handle(deferred)
      })
    }, 0)
  }

  fn(resolve, reject)
}

module.exports = YouPromise
