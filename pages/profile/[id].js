import { useRouter } from 'next/router'
import Layout from '../../components/MyLayout.js';
import {useState, useEffect} from 'react';
import Server from '../Server';
const server = Server.server;

export default function Post(props) {
    const router = useRouter();
  
    const [player, setPlayer] = useState(props.player[0]);

    console.log(player.lastname);
    return (
        <Layout>
            <h1>{router.query.id}</h1>
            <p>{player.lastname}</p>
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