
/**
 * Description. A function to make a number to 2 digits or more.
 * @param {number} time The time in seconds/minutes/hours.
 * @return {string} Time as two digit number.
 */
function twoDigitFormat (time) {
  return time.length < 2 ? '0' + time : time
}

/**
 * Description. A function to convert seconds into mm:ss format.
 * @param {number} secondsElapsed The seconds to convert.
 * @return {string} Time in a mm:ss format.
 */
export function minutesTimeFormat (secondsElapsed) {
  /* claculate the corresponding seconds from the totalSeconds */
  const seconds = twoDigitFormat((secondsElapsed % 60).toString())
  /* claculate the corresponding minutes from the totalSeconds */
  const mins = twoDigitFormat(Math.floor(secondsElapsed / 60).toString())
  return `${mins}:${seconds}`
}

/**
 * Description. A function to return Seconda elapsed .
 * @param {Date} startTime The start time.
 * @param {Date} endTime The end time.
 * @return {int} seconds elapsed as a number.
 */
function elapsedSecond (startTime, endTime) {
  const timeNow = endTime || new Date()
  return parseInt((timeNow - startTime) / 1000)
}

/**
 * Description.  A function return time in mm:ss given 2 dates/times.
 * @param {Date} startTime The start time.
 * @param {Date} endTime The end time.
 * @return {string} Time in a mm:ss format.
 */
export function timeFormat (startTime, endTime) {
  const secondsElapsed = elapsedSecond(startTime, endTime)
  return minutesTimeFormat(secondsElapsed)
}

/**
 * Description. A function to add player stats (time, timeMins, timePenaltyMins).
 * @param {obj} playerData The object with at least startTime, solvedTime, penaltySeconds properties.
 * @param {bool} isEncoded A bool indicating if the time was encoded.
 * @return {obj} player object with stats.
 */
function playerStats (playerData, isEncoded) {
  const player = { ...playerData }
  const penalty = 20
  let { startTime, solvedTime, penaltySeconds } = player
  if (isEncoded) {
    startTime = new Date(startTime)
    solvedTime = new Date(solvedTime)
  }
  // time taken to solve the game with the penalty added.
  const time = elapsedSecond(startTime, solvedTime) + (penaltySeconds * penalty)
  player.time = time
  player.timeMins = timeFormat(startTime, solvedTime)
  player.timePenaltyMins = minutesTimeFormat(time)
  return player
}

/**
 * Description. A function to get wining player after a penalty is applied (adds the status property).
 * @param {obj} player1 The object with at least startTime, solvedTime, penaltySeconds properties.
 * @param {obj} player2 The object with at least startTime, solvedTime, penaltySeconds properties.
 * @return {obj} object with player1 and player2.
 */
export function getChallengeStats (player1, player2) {
  const player1Stats = playerStats(player1, false)
  const player2Stats = playerStats(player2, true)

  if (player1Stats.time > player2Stats.time) {
    player2Stats.status = 'Won'
    player1Stats.status = 'Lost'
  } else {
    player1Stats.status = 'Won'
    player2Stats.status = 'lost'
  }

  return { player1Stats, player2Stats }
}
