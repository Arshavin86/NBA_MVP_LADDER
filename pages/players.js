import Layout from '../components/MyLayout.js';
import {useState} from 'react';
import fetch from 'isomorphic-unfetch';
import style from 'styled-components';
import ApiContext from '../components/Context.js';
import Player_search from '../components/Player_search';
import Row_headers from '../components/Row_headers';
import Players_wrapper from '../components/Players_wrapper';


const server = 'http://localhost:3001/api/players'; 

const Container1 = style.div`
  max-height: 100vh;
  order: 0;
  padding: 0;
  flex: 0 0 320px;
  z-index: 1;
  width: 320px;
  margin: 0;
  height: 100vh;
  background-color: #fff;
  padding: 0 15px;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const Sidebar = style.div`
  font-family: "Flama-Basic",sans-serif;
  width: 320px;
`;

const Sidebar_bottom = style.div`
  width: 100%;
  font-family: "Flama-Basic",sans-serif;
  font-size: 100%;
  overflow-x: hidden;
  max-height: calc(100vh - 135px);
  overflow-y: auto;
`;

 const Players = (props) => {
    const [players, setPlayers] = useState(props.players);
    console.log(players);
    const fullList = props.players;

    return (
        <Layout>
          <Container1>
            <Sidebar>
              <ApiContext.Provider value = {[setPlayers, fullList]}>
                <Player_search/>
              </ApiContext.Provider> 
              <Row_headers/>
            </Sidebar>
            <Sidebar_bottom>
              <ApiContext.Provider value = {[players]}>
                <Players_wrapper/>
              </ApiContext.Provider> 
            </Sidebar_bottom>
          </Container1>
        </Layout>
      );
 }
    

Players.getInitialProps = async function () {

    const res = await fetch(server);
    const data = await res.json();
    const players = [];
    let name;
    // const encodeData = encodeURIComponent(data.image);

    // console.log(`Show data fetched in Players. ${data[0]}`)
    data.map(player => {
      //works with players who have nicknames, like 'Nene'
      if (player.lastname.length) {
        name = `${player.lastname}, ${player.firstname}`;
      } else {
        name = player.firstname;
      }
        players.push({
            name: name,
            id: player.playerid,
            team: player.name
        });
    })

    return {
        players: players
    }
}

export default Players;
