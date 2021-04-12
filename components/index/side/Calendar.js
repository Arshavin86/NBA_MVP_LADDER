import Calendar from 'react-modern-datepicker'
import { useContext } from 'react'
import style from 'styled-components'
import moment from 'moment'

import ApiContext from '../../Context'
import '../../../static/Calendar.css'

const Day = style.div`
  display: flex; 
  flex-direction: row; 
  color: #fff;
  font-size: .869em;
  font-weight: bold;
  background-position: center left;
  padding: 4px 30px 4px 30px;
  box-sizing: border-box;
  text-align: center;
  &: hover {
    background: blue;
  }
`

const Cal = () => {
  const [date, setDate] = useContext(ApiContext)

  return (
    <Day>
      <Calendar
        icon='/static/calender-google-icon.png'
        date={date}
        format='YYYY-MM-DD'
        onChange={date => { setDate(moment(date)) }}
        // define minimum date (exists in DB) that the user can select
        minDate='2015-10-28'
        className='color'
        iconClass='icon'
      />
    </Day>
  )
}

export default Cal
