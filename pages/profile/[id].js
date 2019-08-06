import { useRouter } from 'next/router'
import Layout from '../../components/MyLayout';
import {useState} from 'react';
import Server from '../Server';
import style from 'styled-components';
import ApiContext from '../../components/Context';
import MainBoard from '../../components/profile/Mainboard_profile';

const server = Server.server;

const Container1 = style.div` 
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
  justify-content: center;
  padding: 0 30px;
`;

const Main = style.div`
  width: 640px;
  height: 180px;
  padding: 30px 30px 30px;
  background: #fefefe;
  font-family: "Flama-Basic",sans-serif;
  font-size: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;

export default function Post(props) {
    const router = useRouter();
  
    const [player, setPlayer] = useState(props.player[0]);

    console.log(player.lastname);
    return (
        <Layout>
            <Container1>Here could be your advertisement </Container1>
            <Container2>
            <Main>
                <ApiContext.Provider value = {[player]}>
                    <MainBoard/>
                </ApiContext.Provider>
            </Main>
            </Container2>
        </Layout>
    )
};

Post.getInitialProps = async function (router) {
    
    try {
        const response = await fetch (server + 'players/' + router.query.id);
        const json = await response.json();
        console.log(json);
        return {
            player: json
        }
        
    } catch (e) {
        console.warn(e);
    }
};