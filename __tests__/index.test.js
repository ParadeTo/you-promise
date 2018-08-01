const YouPromise = require('../src')

describe('YouPromise tests', () => {
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

  it('support call then after promise resolve', cb => {
    let times = 0
    const p = new YouPromise((resolve, reject) => {
      resolve()
    })

    p.then(() => {
      times++
    })

    setTimeout(() => {
      p.then(() => {
        times++
        expect(times).toBe(2)
        cb()
      })
    }, 100)
  })
})
