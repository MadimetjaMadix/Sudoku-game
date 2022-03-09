
/* A function to make a number to 2 digits or more */
function twoDigitFormat (time) {
  return time.length < 2 ? '0' + time : time
}

export function minutesTimeFormat (secondsElapsed) {
  /* claculate the corresponding seconds from the totalSeconds */
  const seconds = twoDigitFormat((secondsElapsed % 60).toString())
  /* claculate the corresponding minutes from the totalSeconds */
  const mins = twoDigitFormat(Math.floor(secondsElapsed / 60).toString())
  return `${mins}:${seconds}`
}

/** A function to return Seconda elapsed */
function elapsedSecond (startTime, endTime) {
  const timeNow = endTime || new Date()
  return parseInt((timeNow - startTime) / 1000)
}

/** A function return time in mm:ss given 2 dates/times */
export function timeFormat (startTime, endTime) {
  const secondsElapsed = elapsedSecond(startTime, endTime)
  return minutesTimeFormat(secondsElapsed)
}

/** A function to return player stats */
function playerStats (playerData, isEncoded) {
  const player = { ...playerData }
  const penalty = 20
  let { startTime, solvedTime, penaltySeconds } = player
  if (isEncoded) {
    startTime = new Date(startTime)
    solvedTime = new Date(solvedTime)
  }
  const time = elapsedSecond(startTime, solvedTime) + (penaltySeconds * penalty)
  player.time = time
  player.timeMins = timeFormat(startTime, solvedTime)
  player.timePenaltyMins = minutesTimeFormat(time)
  return player
}

/** A function to get wining player after a penalty is applied */
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
