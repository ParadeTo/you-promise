const YouPromise = require('../src')

describe('you-promise tests', () => {
  it('support chain', cb => {
    let times = 0
    new YouPromise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 10)
    })
      .then(() => times++)
      .then(() => times++)
      .then(() => {
        expect(times).toBe(2)
        cb()
      })
  })

  it('support promise synchronous', cb => {
    let times = 0
    new YouPromise((resolve) => {
      resolve()
    })
      .then(() => times++)
      .then(() => times++)
      .then(() => {
        expect(times).toBe(2)
        cb()
      })
  })
})
