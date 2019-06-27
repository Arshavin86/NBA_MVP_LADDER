import {useContext} from 'react';
import style from 'styled-components';
import ApiContext from './Context';

const Number = style.span`
    font-size: 0.7em;
`;

const Image_wrapper = style.div`
    overflow: hidden;
    background-repeat: no-repeat;
    background-position: center center;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    background-color: #CCD0D3;
    border-radius: 50%;
    background-size: 130%;
`;

const Image = style.img`
    display: block;
    margin: 0 0 0 -20%;
    width: 140%;
    max-width: none;
`;

const Name = style.p`
    font-size: 0.8em;
    min-height: 38px;
    margin: 5px 0;
    line-height: 1.2;
    font-family: "Flama-Medium",sans-serif;
    color: #0B5BE1;
`;

const Details = style.div`
    font-size: 0.75em;
`;


const Player = props => {
    const {number, name, position, height, weight, team} = props.player;
    const firstname = name.split(', ')[1];
    const lastname = name.split(',')[0];
    const short = team.split(' ');
    const shortTeam = short[short.length-1];

    return (
        <div>
            <Number>{number ? number : 'N/A'}</Number>
            <Image_wrapper>
                <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Lebron_wizards_2017_%28cropped%29.jpg/800px-Lebron_wizards_2017_%28cropped%29.jpg">
                </Image>
            </Image_wrapper>  
            <Name>{firstname}<br></br>{lastname}</Name> 
            <Details>
                <div>{position ? position : 'N/A' }</div>
                <span><strong>{height}</strong> m | <strong>{weight}</strong> kg</span>
                <div>{shortTeam}</div>
            </Details>  
        </div>
    ) 
}

export default Player;
