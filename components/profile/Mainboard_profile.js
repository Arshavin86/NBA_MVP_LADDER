import {useContext} from 'react';
import ApiContext from '../Context';
import style from 'styled-components';

const Header = style.div` 
  height: 100%;
  position: relative;
  background-image: url("${props => props.team}");
  background-repeat: no-repeat;
  background-size: cover;
`;

const Image = style.img`
    position: absolute;
    left: 0;
    bottom: 0;
    height: 80%;
`;

const URL = `https://nba-players.herokuapp.com`;

const Player = () => {
  const [player] = useContext(ApiContext);
  const lastName = player.lastname;
  const firstName = player.firstname;
  const teamName = player.name.split(' ');
  const teamNick = teamName[teamName.length - 1];
  const logoURL = `../../static/Logos/${teamNick}.jpg`;
  // console.log(teamNick);

    return (
        <Header team = {logoURL}>
          <Image src={`${URL}/players/${lastName}/${firstName}`} alt="No image"></Image>
        </Header>
      );
  }

  export default Player;