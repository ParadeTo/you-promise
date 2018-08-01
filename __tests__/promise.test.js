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
})
