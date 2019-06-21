import Layout from '../components/MyLayout.js';
import {useState} from 'react';
import fetch from 'isomorphic-unfetch';
import style from 'styled-components';
import ApiContext from '../components/Context.js';
import Player_search from '../components/Player_search';

const server = 'http://localhost:3001/api/players'; 

const Container1 = style.div`
  display: flex; 
  flex-direction: row;
  border: 0.5px solid black;
  margin-right: auto;
  margin-left: auto;
  max-width: none;
  text-align: left;
  vertical-align: middle;
  line-height: 40px; 
  background: #CCD0D3;
`;
const Sidebar = style.div`
  border: 0.5px solid black;
  font-family: "Flama-Basic",sans-serif;
  width: 320px;
`;
const Sidebar_nav = style.div`
  background-color: #00092D;
`;

const Sidebar_bottom = style.div`
  background: #CCD0D3;
  width: 100%;
  font-family: "Flama-Basic",sans-serif;
  font-size: 100%;
  overflow-x: hidden;
`;

const Main = style(Sidebar_bottom)`
  width: 640px;
  padding: 30px 30px 30px;
  background: #fefefe;
`;

 const Players = (props) => {
    const [players, setPlayers] = useState(props.players);
    console.log(players);
    const fullList = props.players;

    return (
        <Layout>
          <Container1>
            <Sidebar>
              <Sidebar_nav>
                <ApiContext.Provider value = {[players, setPlayers, fullList]}>
                  <Player_search/>
                </ApiContext.Provider>
              </Sidebar_nav>  
              <Sidebar_bottom> 
                <ApiContext.Provider value = {[players, setPlayers]}>
                  
                </ApiContext.Provider>
              </Sidebar_bottom>
            </Sidebar>
            <Main>
              <ApiContext.Provider value = {[players, setPlayers]}>
                
              </ApiContext.Provider>
            </Main>
          </Container1>
        </Layout>
      );
 }
    

Players.getInitialProps = async function () {

    const res = await fetch(server);
    const data = await res.json();
    const players = [];
    // const encodeData = encodeURIComponent(data.image);

    // console.log(`Show data fetched in Players. image src: ${data}`)
    data.map(player => {
        players.push({
            name: `${player.lastname}, ${player.firstname}`,
            id: player.playerid
        });
    })

    return {
        players: players
    }
}

export default Players;
