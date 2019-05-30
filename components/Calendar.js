import Calendar from 'react-calendar/dist/entry.nostyle';
import 'react-calendar/dist/Calendar.css'
// import Calendar from 'react-calendar';
import {useState, useContext} from 'react';
import style from 'styled-components';
import ApiContext from './Context';

const Day = style.span`
  display: flex; 
  flex-direction: row; 
  color: #fff;
  font-size: .869em;
  font-weight: bold;
  background: transparent;
  background-position: center left;
  background-size: 16px;
  padding: 4px 30px 4px 30px;
  box-sizing: border-box;
  text-align: center;
`;

const Image = style.img`
  height: 30px;
  width: 30px;
  cursor: pointer;
`;

const Date = style.span`
  cursor: pointer;
  padding: 0px 10px 0px 10px;
`;

const Cal = props => {
  const [calOpen, setCal] = useState(false);
  const [date, setDate] = useContext(ApiContext);
  
  // console.log(calOpen);
  // console.log('date in Calendar: ', date);
  // console.log('props.date', props.date);

    return (
      calOpen 
      ? (
        <div>
          <Calendar onChange={setDate} />
        </div>
      ) : (
        <Day>
          <Image src="/static/calender-google-icon.png"  onClick={e => {e.preventDefault(); setCal(true)}} alt="my image"/>
          <Date onClick={e => {e.preventDefault(); setCal(true)}}>{date} </Date>
        </Day>
      )
    )
}

export default Cal;

// onKeyPress={setCal(true)}
