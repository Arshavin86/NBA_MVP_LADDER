import Layout from '../components/MyLayout.js';
import {useState} from 'react';
import fetch from 'isomorphic-unfetch';
import style from 'styled-components';
import ApiContext from '../components/Context.js';
import Player_search from '../components/players/side/Player_search';
import Row_headers from '../components/players/side/Row_headers';
import Players_wrapper from '../components/players/side/Players_wrapper';
import MainBoard_players from '../components/players/main/MainBoard_players';


const server = 'http://localhost:3001/api/players'; 

const Container1 = style.div`
  display: flex; 
  color: black; 
  background: #E5E7E9;
  min-height: 100px;
`;

const Container2 = style.div`
  display: flex; 
  flex-direction: row;
  margin-right: auto;
  margin-left: auto;
  height: 100vh;
  background: #E5E7E9;
  padding: 0 15px;
  
`;

const Sidebar = style.div`
  font-family: "Flama-Basic",sans-serif;
  width: 320px;
  background: #fefefe;
  overflow: auto;
  overflow-x: hidden;
`;

const Sidebar_nav = style.div`
position: static;
z-index: -1;
`;

const Sidebar_bottom = style.div`
  width: 100%;
  font-family: "Flama-Basic",sans-serif;
  font-size: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;

const Main = style(Sidebar_bottom)`
  width: 640px;
  padding: 30px 30px 30px;
  background: #fefefe;
`;

 const Players = (props) => {

  // return (
  //   <div>
  //     <img src={props.image}></img>
  //   </div>
  // )
    const [players, setPlayers] = useState(props.players);
    // console.log(players);
    const fullList = props.players;

    return (
        <Layout>
          <Container1>Here could be your advertisement </Container1>
          <Container2>
            <Sidebar>
              <Sidebar_nav>
                <ApiContext.Provider value = {[setPlayers, fullList]}>
                  <Player_search/>
                </ApiContext.Provider> 
                <Row_headers/>
              </Sidebar_nav>
              <Sidebar_bottom>
                <ApiContext.Provider value = {[players]}>
                  <Players_wrapper/>
                </ApiContext.Provider> 
              </Sidebar_bottom>
            </Sidebar>
            <Main>
              <ApiContext.Provider value = {[players]}>
                <MainBoard_players/>
              </ApiContext.Provider>
            </Main>
          </Container2>
        </Layout>
      );
 }
    

Players.getInitialProps = async function () {

    const res = await fetch(server);
    const data = await res.json();
    const players = [];
    let playerName;
    // console.log('IMAGE: ', data.image);
    // return {
    //       image: data.image
    //   }
    // const encodeData = encodeURIComponent(data.image);

    // console.log(`Show data fetched in Players. ${data[0]}`)
    data.map(player => {
      //works with players who have nicknames, like 'Nene'
      const {playerid, name, jersey, pos, heightinmeters, weightinkilograms} = player;
      if (player.lastname.length) {
        playerName = `${player.lastname}, ${player.firstname}`;
      } else {
        playerName = player.firstname;
      }
        players.push({
            name: playerName,
            id: playerid,
            team: name,
            number: jersey,
            position: pos,
            height: heightinmeters,
            weight: weightinkilograms
        });
    })

    return {
        players: players
    }
}

export default Players;
