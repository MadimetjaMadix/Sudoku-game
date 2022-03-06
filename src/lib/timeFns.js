
/* A function to make a number to 2 digits or more */
function twoDigitFormat (time) {
  return time.length < 2 ? '0' + time : time
}

/** A function return time in mm:ss given 2 dates/times */
export function timeFormat (startTime, endTime) {
  const timeNow = endTime || new Date()
  const secondsElapsed = parseInt((timeNow - startTime) / 1000)
  /* claculate the corresponding seconds from the totalSeconds */
  const seconds = twoDigitFormat((secondsElapsed % 60).toString())
  /* claculate the corresponding minutes from the totalSeconds */
  const mins = twoDigitFormat(Math.floor(secondsElapsed / 60).toString())
  return `${mins}:${seconds}`
}
