import {useContext} from 'react';
import style from 'styled-components';
import ApiContext from './Context';
import {useState, useEffect} from 'react';
import Players_list from '../components/Players_list';

const Container = style.div`
    display: block;
`;

const List = style.div`
    
`;

const Letter = style.div`
    background-color: #e6e8ea;
    padding-top: 2px;
    padding-bottom: 2px;
    font-size: 0.875em;
`;

const playersListing = players => {
    let context = [];
    let letters = [];

    players.map(player => {
        //creating an alphabetic list
        if (!letters.includes(player.name[0])) {
            letters.push(player.name[0]);
        }
    })
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

const Wrapper = props => {
    const [players] = useContext(ApiContext);


    return (
        <Container>
            {playersListing(players)}
        </Container>
    )
    
}

export default Wrapper;
