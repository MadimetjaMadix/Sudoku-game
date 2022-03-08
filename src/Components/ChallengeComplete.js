import React from 'react'
import Container from 'react-bootstrap/Container'
import { getChallengeStats } from '../lib/timeFns'

export default function ChallengeComplete ({ shareData, URLData }) {
  const { player1Stats, player2Stats } = getChallengeStats(shareData, URLData)

  return (
    <Container>
      <div className='share-Display challenge'>
        <h4>Challenge Complete</h4>
        <p>
          <span>{player1Stats.name} </span>
          <span>{player2Stats.name} </span>
        </p>
        <span>Time</span>
        <p>
          <span>{player1Stats.timeMins} </span>
          <span>{player2Stats.timeMins} </span>
        </p>
        <span>Time with Penalties</span>
        <p>
          <span>{player1Stats.timePenaltyMins} </span>
          <span>{player2Stats.timePenaltyMins} </span>
        </p>
        <span>Dificulty</span>
        <span>{player1Stats.difficulty} </span>
        <span>Status</span>
        <p>
          <span className={player1Stats.status}>{player1Stats.status} </span>
          <span className={player2Stats.status}>{player2Stats.status} </span>
        </p>
      </div>
    </Container>
  )
}
