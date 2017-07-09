export const formatTime = (time) => {
  const m = Math.floor((time) / 60000) + ''
  const s = Math.floor((time) / 1000) % 60 + ''
  return `${m.length < 2 ? '0' : ''}${m}:${s.length < 2 ? '0' : ''}${s}`
}
