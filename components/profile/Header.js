import {useContext} from 'react';
import ApiContext from '../Context';
import style from 'styled-components';
import Details from './Header_Details';

const Wrapper = style.div` 
  height: 280px;
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

const Header = () => {
  const [player] = useContext(ApiContext);
  const lastName = player.lastname;
  const firstName = player.firstname;
  const teamName = player.name.split(' ');
  const teamNick = teamName[teamName.length - 1];
  const logoURL = `../../static/Logos/${teamNick}.jpg`;
  // console.log(teamNick);

    return (
        <Wrapper team = {logoURL}>
          <Image src={`${URL}/players/${lastName}/${firstName}`} alt="Player's headshot photo"></Image>
          <Details/>
        </Wrapper>
      );
  }

  export default Header;