const YouPromise = require('../src')

describe('YouPromise tests', () => {
  let getUserId
  let getUserMobileById
  let printUser
  let user

  beforeEach(() => {
    user = {}

    getUserId = () => {
      return new YouPromise((resolve, reject) => {
        setTimeout(() => {
          user.id = 9876
          resolve(9876)
        }, 10)
      })
    }

    getUserMobileById = (id) => {
      return new YouPromise((resolve, reject) => {
        setTimeout(() => {
          expect(id).toBe(9876)
          user.mobile = '18611110000'
          resolve(user)
        }, 20)
      })
    }

    printUser = (user) => {
      console.log(user)
      expect(user).toEqual({
        id: 9876,
        mobile: '18611110000'
      })
    }
  })

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
    getUserId()
      .then(getUserMobileById)
      .then(val => {
        printUser(val)
        cb()
      })
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

  it('support handle error', cb => {
    const p = new YouPromise((resolve, reject) => {
      reject('error')
    })

    p.then(value => {

    }, err => {
      expect(err).toBe('error')
      cb()
    })
  })

  it('support error bubble', cb => {
    getUserId = () => {
      return new YouPromise((resolve, reject) => {
        setTimeout(() => {
          user.id = 9876
          reject('user id is null')
        }, 10)
      })
    }

    getUserId()
      .then(getUserMobileById, err => {
        expect(err).toBe('user id is null')
      })

    getUserId()
      .then(getUserMobileById)
      .then(printUser, err => {
        expect(err).toBe('user id is null')
        cb()
      })
  })

  it('reject in then', cb => {
    getUserMobileById = id => {
      return new YouPromise((resolve, reject) => {
        setTimeout(() => {
          expect(id).toBe(9876)
          reject('user mobile is null')
        }, 20)
      })
    }

    getUserId()
      .then(getUserMobileById)
      .then(printUser, err => {
        expect(err).toBe('user mobile is null')
        cb()
      })
  })

  it('handle exception', cb => {
    getUserId = () => {
      return new YouPromise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 20)
      })
    }

    getUserId()
      .then(val => {
        throw new Error('err')
      })
      .then(null, err => {
        expect(err).toEqual(new Error('err'))
        cb()
      })
  })
})
