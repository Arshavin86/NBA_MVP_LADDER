import {useContext} from 'react';
import style from 'styled-components';
import ApiContext from '../../Context';
import Players_list from './Players_list';

const Container = style.div`
    display: block;
`;

const List = style.div`
    
`;

const Letter = style.div`
    background-color: #e6e8ea;
    padding-left: 10px;
    font-size: 0.875em;
`;

const playersListing = players => {
    let context = [];
    let letters = [];
    let name = '';

    players.map((player, index) => {
        //clear players array from repeated players  
        if (player.name === name) {
            // console.log('repeated player in list:', player);
            players.splice(index, 1);
        } else {
            //creating an alphabetic list
            if (!letters.includes(player.name[0])) {
                letters.push(player.name[0]);
            }
            name = player.name;
        } 
    })
    console.log('players in list', players);
    //sort array A-Z 
    letters.sort();

    letters.map((letter, id) => {
        context.push (
            <List key={id}>
                <Letter>{letter}</Letter>
                <Players_list letter={letter}/>
            </List>
        )
    })  
    return context;
}

const Wrapper = () => {
    const [players] = useContext(ApiContext);

    return (
        <Container>
            {playersListing(players)}
        </Container>
    )  
}

export default Wrapper;
