import {useContext} from 'react';
import ApiContext from '../Context';
import style from 'styled-components';

const Wrapper = style.div`
    position: absolute;
    right: 10px;
    bottom: 0;
    height: 80%;
    color: #fff;
    font-size: 2rem;
`;

const Details = () => {
    const [player] = useContext(ApiContext);
    const lastName = player.lastname;
    const firstName = player.firstname;
  
      return (
          <Wrapper>
            {lastName}
          </Wrapper>
        );
    }
  
    export default Details;
