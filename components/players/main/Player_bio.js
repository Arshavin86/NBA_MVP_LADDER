import style from 'styled-components';

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
    cursor: pointer;
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
    cursor: pointer;
`;

const Details = style.div`
    font-size: 0.75em;
`;

const Player = props => {
    const {number, name, position, height, weight, team} = props.player;
    const firstname = name.split(', ')[1];
    const lastname = name.split(',')[0];
    const URL = `https://nba-players.herokuapp.com`;
    //assighn it to empty string in order to get image for Nene
    let firstName = '';
    let lastName;
    //players with such names as D.J. or J.J stored as DJ and JJ, so we have to delete dots from it + Deandre' => Deandre
    if (firstname) {
        firstName = firstname.replace(/\.|\'/g, "");
    } 
    //the same thing with Irish names (O'Neal)
    lastName = lastname.replace(/'|Jr.| II| III| IV/g, "");
    // and with the middle names (Jr., II, III) => such players are stored only with lastnames for some reason 
    // if (lastName.match(/ Jr.| II| III/g)) {
    //     lastName = lastName.replace(/ Jr.| II| III/g, "");
    //     firstName = '';
    // }
    const short = team.split(' ');
    const shortTeam = short[short.length-1];

    return (
        <div>
            <Number>{number ? number : 'N/A'}</Number>
            <Image_wrapper>
                <Image src={`${URL}/players/${lastName}/${firstName}`} alt="No image">
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