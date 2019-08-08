import {useContext} from 'react';
import ApiContext from '../Context';
import style from 'styled-components';

const Wrapper = style.section` 
    padding: 20px 0 0 0;
    
`;

const Vitals = () => {
    const [player] = useContext(ApiContext);
    const {lastname, firstname, jersey, collegename, country, dateofbirth, affiliation, heightinmeters, weightinkilograms, pos, startnba, name} = player;

    return (
        <Wrapper>
          {dateofbirth}
        </Wrapper>
      );
  }

  export default Vitals;