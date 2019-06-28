import {useContext} from 'react';
import style from 'styled-components';
import ApiContext from '../../Context';
import Player_bio from './Player_bio';

const Index = style.div`
    
`;

const Player = style.div`
    text-align: center;
    border-bottom: 1px solid #CCD0D3;
    margin: 10px 0 10px 0;
    padding: 0 5px;
    position: relative;
    width: 15%;
    display: inline-block;
`;

const playersListing = players => {
    const context = [];

    players.map((player, id) => {
        context.push (
            <Player key={id}>
                <Player_bio player={player}/>
            </Player>
        )
    })
        
    return context;
}

const Mainboard = props => {
    const [players] = useContext(ApiContext);

    return (
        <Index>
            {playersListing(players)}
        </Index>
    ) 
}

export default Mainboard;
