import {useState} from 'react';
import Calendar from '../components/Calendar.js'
import style from 'styled-components';

const Container2 = style.div`
  display: flex; 
  flex-direction: row;
`;
const Image = style.img`
  height: 30px;
  width: 30px;
  cursor: pointer;
`;

// const changeDate = (incrementor) => {
//     let date = new Date (props.date);
//     date.setDate(date.getDate() + incrementor);
//     props.onChange
// }

const Cal = props => {
    // console.log('props.date', props.date);

    return (
        <Container2>
            <Image src="/static/scroll-left-icon.png" onClick={e => {e.preventDefault();}} alt="my image"/>
            <div>
                <Calendar/>
            </div>
            <Image src="/static/scroll-right-icon.png" onClick={e => {e.preventDefault();}} alt="my image"/>   
        </Container2>      
    )
}

export default Cal;