import Calendar from 'react-calendar/dist/entry.nostyle';
// import Calendar from 'react-calendar';
import {useState} from 'react';

const Cal = props => {
  const [calOpen, setCal] = useState(false);
  
  console.log(calOpen);

    return (
      calOpen 
      ? (
        <div>
          <Calendar
            onChange={props.onChange}
          />
        </div>
      ) : (
        <div >
          <img src="/static/calender-google-icon.png" onClick={e => {e.preventDefault(); setCal(true)}} alt="my image"/>
        </div>
      )
    )
}

export default Cal;

// onKeyPress={setCal(true)}
