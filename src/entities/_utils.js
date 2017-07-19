const _padZero = (toPad = '', length = 0) => {
  let string = String(toPad)
  return string.length >= length
    ? string
    : '0'.repeat(length - string.length) + string
}

export const overlapping = (r1 = {}, r2 = {}) => {
  return !(r2.left > r1.right || r2.right < r1.left ||
           r2.top > r1.bottom || r2.bottom < r1.top)
}

export const formatTime = (time = 0) => { // ms
  const min = Math.floor((time) / 60000)
  const sec = Math.floor((time) / 1000) % 60
  const ms = time % 1000
  return `${_padZero(min, 2)}:${_padZero(sec, 2)}:${_padZero(ms, 3)}`
}

export const getId = () => {
    let result = ''
    let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (var i = 20; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)]
    }
    return result
}
