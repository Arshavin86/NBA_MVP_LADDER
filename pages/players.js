import Layout from '../components/MyLayout'
import { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import style from 'styled-components'
import ApiContext from '../components/Context.js'
import PlayerSearch from '../components/players/side/Player_search'
import RowHeaders from '../components/players/side/Row_headers'
import PlayersWrapper from '../components/players/side/Players_wrapper'
import MainBoardPlayers from '../components/players/main/MainBoard_players'
import { server } from '../config.js'

const Container1 = style.div` 
  color: black; 
  background: #E5E7E9;
  min-height: 100px;
`

const Container2 = style.div`
  display: flex; 
  flex-direction: row;
  margin-right: auto;
  margin-left: auto;
  height: 100vh;
  background: #E5E7E9;
  justify-content: center;
  padding: 0 30px;
`

const Sidebar = style.div`
  font-family: "Flama-Basic",sans-serif;
  width: 320px;
  background: #fefefe;
  overflow: auto;
  overflow-x: hidden;
`

const SidebarNav = style.div`
position: static;
z-index: -1;
`

const SidebarBottom = style.div`
  width: 100%;
  font-family: "Flama-Basic",sans-serif;
  font-size: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`

const Main = style(SidebarBottom)`
  width: 640px;
  padding: 30px 30px 30px;
  background: #fefefe;
  height: 100%;
  overflow: hidden;
  position: relative;
`

const Players = props => {
  // return (
  //   <div>
  //     <img src={props.image}></img>
  //   </div>
  // )

  const [players, setPlayers] = useState(props.players)
  // console.log(players);
  const fullList = props.players

  return (
    <Layout>
      <Container1>Here could be your advertisement </Container1>
      <Container2>
        <Sidebar>
          <SidebarNav>
            <ApiContext.Provider value={[setPlayers, fullList]}>
              <PlayerSearch />
            </ApiContext.Provider>
            <RowHeaders />
          </SidebarNav>
          <SidebarBottom>
            <ApiContext.Provider value={[players]}>
              <PlayersWrapper />
            </ApiContext.Provider>
          </SidebarBottom>
        </Sidebar>
        <Main>
          <ApiContext.Provider value={[players]}>
            <MainBoardPlayers />
          </ApiContext.Provider>
        </Main>
      </Container2>
    </Layout>
  )
}

Players.getInitialProps = async function () {
  const res = await fetch(server + 'players')
  const data = await res.json()
  const players = []
  let playerName
  // console.log('IMAGE: ', data.image);
  // return {
  //       image: data.image
  //   }
  // const encodeData = encodeURIComponent(data.image);

  // console.log(`Show data fetched in Players. ${data[0]}`)
  data.map(player => {
    const { playerid, name, jersey, pos, heightinmeters, weightinkilograms } = player
    // works with player who has nickname, like 'Nene'
    if (player.lastname.length) {
      playerName = `${player.lastname}, ${player.firstname}`
    } else {
      playerName = player.firstname
    }
    players.push({
      name: playerName,
      id: playerid,
      team: name,
      number: jersey,
      position: pos,
      height: heightinmeters,
      weight: weightinkilograms
    })
  })

  return {
    players: players
  }
}

export default Players
