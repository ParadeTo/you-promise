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

  it('chained then should pass value rightly', cb => {
    const p1 = new YouPromise((resolve) => {
      setTimeout(() => {
        resolve(1)
      }, 10)
    })

    p1
      .then(val => {
        expect(val).toBe(1)
        return 2
      })
      .then(val => {
        expect(val).toBe(2)
        cb()
      })
  })

  it('chained promise', cb => {
    let user = {}
    function getUserId () {
      return new YouPromise((resolve, reject) => {
        setTimeout(() => {
          user.id = 9876
          resolve(9876)
        }, 10)
      })
    }

    function getUserMobileById (id) {
      return new YouPromise((resolve, reject) => {
        setTimeout(() => {
          expect(id).toBe(9876)
          user.mobile = '18611110000'
          resolve(user)
        }, 20)
      })
    }

    function printUser (user) {
      console.log(user)
      expect(user).toEqual({
        id: 9876,
        mobile: '18611110000'
      })
      cb()
    }

    getUserId()
      .then(getUserMobileById)
      .then(printUser)
  })

  it('chained promise pass val', cb => {
    const p1 = new YouPromise((resolve) => {
      setTimeout(() => {
        resolve(1)
      }, 10)
    })

    p1
      .then(() => {
        return new YouPromise((resolve, reject) => {
          setTimeout(() => {
            resolve('a')
          }, 10)
        })
      })
      .then(val => {
        expect(val).toBe('a')
        cb()
      })
  })
})