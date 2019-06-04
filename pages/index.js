import {useState} from 'react';
import Calendar_nav from '../components/Calendar_nav.js'
import Layout from '../components/MyLayout.js';
import Scoreboard_wrapper from '../components/Scoreboard_wrapper.js';
import style from 'styled-components';
import fetch from 'isomorphic-unfetch';
import ApiContext from '../components/Context.js';

const Container1 = style.div`
  display: flex; 
  flex-direction: row;
  border: 0.5px solid black;
  width: 440px;
  text-align: left;
  vertical-align: middle;
  line-height: 40px; 
`;
const Scoreboard = style.div`
  border: 0.5px solid black;
  font-family: "Flama-Basic",sans-serif;
`;
const Scoreboard_nav = style.div`
  background-color: #00092D;
`;

const Scoreboard_bottom = style.div`
  background: #CCD0D3;
  width: 100%;
  font-family: "Flama-Basic",sans-serif;
  font-size: 100%;
  overflow-x: hidden;
`;

const Compon2 = style(Scoreboard_bottom)`
  width: 150px;
`;

const server = 'http://localhost:3001/api/games/date/';

const formatDate = date => {
   
    let d = date ? new Date(date) : new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

// const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// const d = new Date();
// const dayName = days[d.getDay()];

// export const ApiContext = React.createContext([{}, () => {}]);

const Index = props => {
  const [data, setData] = useState(props.games);
  const [date, setDate] = useState(props.date);

  // console.log('date in Index: ', date);
  // console.log('data in Index: ', data);

  const handleDateChange = async date => {
    const ISODate = formatDate(date);
    let json;
    console.log('ISODate:', ISODate);
    setDate (ISODate);
    try {
      const response = await fetch(server + ISODate);
      if (response.status === 500) {
        json = 'No games were played on this day';
      } else {
        json = await response.json();
        console.log('JSON:', json); 
      }
      setData (json);
    } catch (e) {
      console.log(e);
    }
  } 
  
  return (
    <Layout>
      <Container1>
        <Scoreboard>
          <Scoreboard_nav>
            <ApiContext.Provider value = {[date, handleDateChange]}>
              <Calendar_nav/>
            </ApiContext.Provider>
          </Scoreboard_nav>  
          <Scoreboard_bottom> 
            <ApiContext.Provider value = {[data]}>
              <Scoreboard_wrapper/>
            </ApiContext.Provider>
          </Scoreboard_bottom>
        </Scoreboard>
        <Compon2>
          Place for video player/news etc.
        </Compon2>
      </Container1>
    </Layout>
  );
}
Index.getInitialProps = async function () {
  let date = formatDate();
  let json;
  console.log('DATE in props: ', date);

  try {
    const res = await fetch(server + date);
    console.log('res!!!!!', res.status);
    if (res.status === 500) {
      json = 'No games were played on this day';
    } else {
      const json = await res.json();
      console.log('json!!!!!', json);
      console.log(`Show data fetched in Index. Count: ${json.length}`)
    }
    return {
      games: json,
      date: date
    }
  } catch (e) {
    console.log(e);
  }
}

export default Index;

 //use Hooks to fetch data  
    // const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //       (async() => {
    //         let date = '2018-10-17';
    //         try {
    //           const response = await fetch(server + date);
    //           const json = await response.json();
    //           console.log(json);
    //           setData (json);
    //           setLoading(false); 
    //         } catch (e) {
    //           console.log(e);
    //         }
    //       })();
    //   }, []);