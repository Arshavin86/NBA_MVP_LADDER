import Calendar from 'react-calendar/dist/entry.nostyle';

const Cal = props => (
    <div>
        <Calendar
          onChange={props.onChange}
        />
      </div>
)

export default Cal;
