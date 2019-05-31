// import Calendar from 'react-calendar/dist/entry.nostyle';
// import 'react-calendar/dist/Calendar.css'
// import Calendar from 'react-calendar';
import Calendar from 'react-modern-datepicker';
import {useContext} from 'react';
import style from 'styled-components';
import ApiContext from './Context';
import '../static/Calendar.css';

const Day = style.span`
  display: flex; 
  flex-direction: row; 
  color: #fff;
  font-size: .869em;
  font-weight: bold;
  background-position: center left;
  padding: 4px 30px 4px 30px;
  box-sizing: border-box;
  text-align: left;
`;

// const Image = style.img`
//   height: 30px;
//   width: 30px;
//   cursor: pointer;
// `;

// const Date = style.span`
//   cursor: pointer;
//   padding: 0px 10px 0px 10px;
// `;

// const formatDate = date => {
   
//   let newDate = new Date(date);

//   return newDate;
// }


const Cal = props => {
  // const [calOpen, setCal] = useState(false);
  const [date, setDate] = useContext(ApiContext);
  
  // console.log(calOpen);
  // console.log('date in Calendar: ', date);
  // console.log('props.date', props.date);

    return (
      // calOpen 
      // ? (
        <Day>
          <Calendar 
            date={date}
            format={'YYYY-MM-DD'}
            icon={'/static/calender-google-icon.png'}
            onChange={date => {setDate(date);}}
            //define minimum date (exists in DB) that the user can select
            minDate={'2017-10-17'} 
            className="color"
            iconClass="icon"
            // value={formatDate(date)}
            // Trying to define minimum date (exists in DB) that the user can select. Getting: 'TypeError: Date is not a constructor'?????  
            // minDate={new Date(2017, 10, 17)}
          />
        </Day>
      // ) : (
      //   <Day>
      //     <Image src="/static/calender-google-icon.png"  onClick={e => {e.preventDefault(); setCal(true)}} alt="my image"/>
      //     <Date onClick={e => {e.preventDefault(); setCal(true)}}>{date} </Date>
      //   </Day>
      // )
    )
}

export default Cal;

// onKeyPress={setCal(true)}
