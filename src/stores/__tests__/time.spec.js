import {toJS} from 'mobx'
import timerStore from '../timer'

jest.useFakeTimers()

let timeoutCount = 0

describe('timerStore', () => {
  it('has defaults', () => {
    const actual = Object.keys(toJS(timerStore))
    const expected = ['startTime', 'endTime', 'timeout', 'time']
    expect(actual.sort()).toEqual(expected.sort())
  })

  it('starts at 0', () => {
    expect(timerStore.startTime).toEqual(0)
    expect(timerStore.endTime).toEqual(0)
    expect(timerStore.time).toEqual(0)
  })

  test('ticks 1 second', () => {
    timerStore.resetTimer()
    jest.clearAllTimers()
    timerStore.startTimer()
    timeoutCount++ // start
    jest.runTimersToTime(999)
    expect(setTimeout.mock.calls.length).toBe(timeoutCount)
  })

  it('resets', () => {
    timerStore.resetTimer()
    expect(timerStore.timeout).toBeNull()
    expect(timerStore.time).toEqual(0)
    timerStore.startTimer()
    timeoutCount++ // start
    expect(timerStore.timeout).toBeDefined()
    expect(timerStore.time).toBeGreaterThan(0)
    timerStore.resetTimer()
    expect(timerStore.timeout).toBeNull()
    expect(timerStore.time).toEqual(0)
    expect(setTimeout.mock.calls.length).toBe(timeoutCount)
  })

  it('ends before 1 second', () => {
    timerStore.resetTimer()
    expect(timerStore.timeout).toBeNull()
    expect(timerStore.time).toEqual(0)
    timerStore.startTimer()
    timeoutCount++ // start
    setTimeout(() => timerStore.endTimer(), 500)
    timeoutCount++ // ^^ that jest timeout
    jest.runAllTimers()
    expect(setTimeout.mock.calls.length).toBe(timeoutCount)
    expect(setTimeout.mock.calls[timeoutCount - 1][1]).toBe(500)
  })
  //
  // it('ends after 1 second', () => {
  //   timerStore.resetTimer()
  //   jest.clearAllTimers()
  //   expect(timerStore.timeout).toBeNull()
  //   expect(timerStore.time).toEqual(0)
  //   timerStore.startTimer()
  //   timeoutCount++ // start
  //   timeoutCount++ // tick 1
  //   setTimeout(() => timerStore.endTimer(), 2001)
  //   timeoutCount++ // ^^ that jest timeout
  //   timeoutCount++ // tick 2
  //   jest.runAllTimers()
  //   expect(setTimeout.mock.calls.length).toBe(timeoutCount)
  //   expect(setTimeout.mock.calls[0][1]).toBe(2000)
  // })
})
