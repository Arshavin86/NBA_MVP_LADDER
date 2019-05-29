import {useState} from 'react';
import Calendar from '../components/Calendar.js'
import style from 'styled-components';

const Container2 = style.div`
  display: flex; 
  flex-direction: row; 
`;
const Cal = props => {

    return (
        <Container2>
            <div>
                <img src="/static/scroll-left-icon.png" onClick={e => {e.preventDefault();}} alt="my image"/>
            </div>
            <div>
                <Calendar onChange={props.onChange}
                />
            </div>
            <div>
                <img src="/static/scroll-right-icon.png" onClick={e => {e.preventDefault();}} alt="my image"/>   
            </div>
        </Container2>
        
    )
}

export default Cal;