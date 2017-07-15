const _padZero = (toPad = '', length) => {
  let string = String(toPad)
  return string.length >= length
    ? string
    : '0'.repeat(length - string.length) + string
}

export const overlapping = (r1, r2) => {
  return !(r2.left > r1.right || r2.right < r1.left ||
           r2.top > r1.bottom || r2.bottom < r1.top)
}

export const formatTime = (time) => { // ms
  const min = Math.floor((time) / 60000)
  const sec = Math.floor((time) / 1000) % 60
  const ms = time % 1000
  return `${_padZero(min, 2)}:${_padZero(sec, 2)}:${_padZero(ms, 3)}`
}
