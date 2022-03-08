import React from 'react'
import Container from 'react-bootstrap/Container'
import { timeFormat, minutesTimeFormat } from '../lib/timeFns'

export default function ShareDataDisplay ({ shareData, shareURL, onClick }) {
  const onclick = () => {
    const content = document.getElementById('share-Display-url').href

    navigator.clipboard.writeText(content)
      .then(() => {
        // revisit
        if (Notification.permission === 'granted') {
          // If it's okay let's create a notification
          const options = {
            body: ' Text copied'
          }
          const notification = new Notification('Text copied to clipboard...', options)
          setTimeout(() => {
            notification.close()
          }, 2 * 1000)
        }
        console.log('Text copied to clipboard.')
      })
      .catch(err => {
        console.log('Failed to copy text to clipboard', err)
      })
  }

  let { name, startTime, solvedTime, penaltySeconds, difficulty } = shareData
  if (!shareURL) {
    console.log(shareData)
    startTime = new Date(startTime)
    solvedTime = new Date(solvedTime)
  }

  return (
    <Container>
      <div className='share-Display'>
        <h4>Game {shareURL ? 'Details' : 'Request Details'}</h4>
        <p>{shareURL ? `Name: ${name}` : `From: ${name}`}</p>
        <p>Date: {new Date(solvedTime).toString()}</p>
        <p>Difficulty: {difficulty}</p>
        <p>Solve Time: {timeFormat(startTime, solvedTime)}</p>
        <p>Penalty Time: {minutesTimeFormat(penaltySeconds)}</p>
        {shareURL && (<p>URL: <a href={shareURL} target='_' id='share-Display-url'>{shareURL}</a> <button onClick={onclick}>Copy</button></p>)}
        {!shareURL && (<p>Click <span>New Game</span> to play this game <button onClick={onClick}>Delete Reaquest</button></p>)}
      </div>
    </Container>
  )
}
