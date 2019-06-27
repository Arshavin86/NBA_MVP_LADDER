import {useContext} from 'react';
import style from 'styled-components';
import ApiContext from './Context';

const Body = style.tbody`
    overflow-x: auto;
    border-collapse: separate;
    color: #333;
    font-family: Roboto,sans-serif;
    font-size: 14px;
    line-height: 16px;
    margin: 0;
    width: 100%;
`;

const Table_body = props => {
    const [players] = useContext(ApiContext);
    console.log(players);
    

    const playersList = players => {
        const context = [];

        players.map(player => {
            const {position, firstname, lastname, pos, name} = player;
            const short = name.split(' ');
            const shortTeam = short[short.length-1];
            context.push(
                <tr key={position}>
                    <th>{position} {firstname} {lastname}</th>
                    <th>{shortTeam}</th>
                    <th>{pos}</th>
                    <th>N/A</th>
                    <th>N/A</th>
                    <th>N/A</th>
                    <th>N/A</th>
                    <th>N/A</th>
                    <th>N/A</th>
                    <th>N/A</th>
                    <th>N/A</th>
                    <th>N/A</th>
                </tr>
            )
        })
        return context;
    }

    return (
        <Body>
            {playersList(players)}
        </Body>
    )
    
}

export default Table_body;

