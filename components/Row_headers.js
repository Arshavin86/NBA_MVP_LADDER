import style from 'styled-components';

const Container = style.div`
    text-transform: uppercase;
    font-size: 15px;
    width: 100%;er-bottom: 1px solid #B3C1CA;
    font-family: "Flama-Medium",sans-serif;
    display: flex;
    justify-content: space-between;

    font-size: 0.875em;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: solid 1px #66737C;
`;

const Player = style.div`
    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 10px;

`;

const Team = style.div`
    padding: 10px 0;
`;

const Headers = props => {

    return (
        <Container>
            <Player>Player Name</Player>
            <Team>Team</Team>
        </Container>
    )
    
}

export default Headers;