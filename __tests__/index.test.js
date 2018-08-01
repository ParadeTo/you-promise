const YouPromise = require('../src')

describe('you-promise tests', () => {
  it('support chain', cb => {
    let times = 0
    new YouPromise((resolve) => {
      setTimeout(() => {
        resolve()
        expect(times).toBe(2)
        cb()
      }, 10)
    })
      .then(() => times++)
      .then(() => times++)
  })
})
