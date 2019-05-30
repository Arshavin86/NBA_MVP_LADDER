import Calendar from 'react-calendar/dist/entry.nostyle';
import 'react-calendar/dist/Calendar.css'
// import Calendar from 'react-calendar';
import {useState} from 'react';
import style from 'styled-components';

const Day = style.span`
  display: flex; 
  flex-direction: row; 
  color: #fff;
  background: transparent;
  background-position: center left;
  background-size: 16px;
  padding: 4px 5px 0 25px;
  box-sizing: border-box;
`;

const Cal = props => {
  const [calOpen, setCal] = useState(false);
  
  console.log(calOpen);
  // console.log('props.date', props.date);


    return (
      calOpen 
      ? (
        <div>
          <Calendar
            onChange={props.onChange}
          />
        </div>
      ) : (
        <Day>
          <img src="/static/calender-google-icon.png" onClick={e => {e.preventDefault(); setCal(true)}} alt="my image"/>
          <span>{props.date}</span>
        </Day>
      )
    )
}

export default Cal;

// onKeyPress={setCal(true)}
