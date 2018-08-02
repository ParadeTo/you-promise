describe('Promise tests', () => {
  it('can call then after promise resolve', cb => {
    let times = 0
    const p = new Promise((resolve, reject) => {
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

  it('pass value should be right', cb => {
    const p1 = new Promise((resolve) => {
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

  // it('chained promise', cb => {
  //   let user = {}
  //   function getUserId () {
  //     return new Promise((resolve, reject) => {
  //       setTimeout(() => {
  //         user.id = 9876
  //         resolve(9876)
  //       }, 10)
  //     })
  //   }

  //   function getUserMobileById (id) {
  //     return new Promise((resolve, reject) => {
  //       setTimeout(() => {
  //         expect(id).toBe(9876)
  //         user.mobile = '18611110000'
  //         resolve(user)
  //       }, 10)
  //     })
  //   }

  //   getUserId()
  //     .then(getUserMobileById)
  //     .then(user => {
  //       expect(user).toEqual({
  //         id: 9876,
  //         mobile: '18611110000'
  //       })
  //       cb()
  //     })
  // })
})
