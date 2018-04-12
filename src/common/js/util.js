// Fisher–Yates Shuffle 洗牌算法
export function shuffle(array) {
  // 复制一份array
  let _array = array.slice(0)
  let m = _array.length
  let t = null
  let i = null

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--)

    // And swap it with the current element.
    t = _array[m]
    _array[m] = _array[i]
    _array[i] = t
  }

  return _array
}

export function debounce(func, delay) {
  let timer = 0
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}