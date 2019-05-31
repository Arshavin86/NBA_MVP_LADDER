import {useContext} from 'react';
import Calendar from '../components/Calendar.js'
import style from 'styled-components';
import ApiContext from './Context';

const Container2 = style.div`
  display: flex; 
  flex-direction: row;
`;
const Image = style.input`
  height: 22px;
  width: 22px;
  cursor: pointer;
  padding: 0px 10px 0px 10px;
`;

const Cal = props => {
    const [date, setDate] = useContext(ApiContext);

    //it decrements a date by 2 and doesn't increment if I put -1 and 1, but it works with 0 and 2???
    const changeDate = (incrementor) => {
        let newDate = new Date (date);
        newDate.setDate(newDate.getDate() + incrementor);
        console.log(newDate);
        setDate(newDate);
    }

    return (
        <Container2>
            <Image type="image" src="/static/scroll-left-icon.png" onClick={e => {e.preventDefault(); changeDate(0)}} alt="my image"/>
            <div>
                <Calendar/>
            </div>
            <Image type="image" src="/static/scroll-right-icon.png" onClick={e => {e.preventDefault(); changeDate(2)}} alt="my image"/>   
        </Container2>      
    )
}

export default Cal;