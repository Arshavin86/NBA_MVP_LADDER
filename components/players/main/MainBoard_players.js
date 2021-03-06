import { useContext } from 'react'
import style from 'styled-components'
import ApiContext from '../../Context'
import PlayerBio from './Player_bio'

const Index = style.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: -17px; /* Increase/Decrease this value for cross-browser compatibility */
    overflow-y: scroll;   
`

const Player = style.div`
    text-align: center;
    border-bottom: 1px solid #CCD0D3;
    margin: 10px 0 10px 0;
    padding: 0 5px;
    position: relative;
    width: 15%;
    display: inline-block;
`

const playersListing = players => {
  const context = []

  players.map((player, id) => {
    context.push(
      <Player key={id}>
        <PlayerBio player={player} />
      </Player>
    )
  })
  return context
}

const Mainboard = () => {
  const [players] = useContext(ApiContext)

  return (
    <Index>
      {playersListing(players)}
    </Index>
  )
}

export default Mainboard
