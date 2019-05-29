import {useState} from 'react';
import Calendar_nav from '../components/Calendar_nav.js'
import Layout from '../components/MyLayout.js';
import style from 'styled-components';
import fetch from 'isomorphic-unfetch';


const Container1 = style.div`
  display: flex; 
  flex-direction: row;
  cursor: pointer;
  border: 0.5px solid black;
  width: 440px;
  text-align: left;
  vertical-align: middle;
  line-height: 40px; 
`;
const Compon1 = style.div`
  width: 290px;
  border: 0.5px solid black;
`;
const Compon2 = style(Compon1)`
  width: 150px;
`;

const server = 'http://localhost:3001/api/games/date/';

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
const formatDate = date => {
   
    let d = date ? new Date(date) : new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const d = new Date();
const dayName = days[d.getDay()];

const Index = props => {
  const [data, setData] = useState(props.games);
  const [date, setDate] = useState(props.date);

  console.log('date in Index: ', date);

  const handleDateChange = async date => {
    const ISODate = formatDate(date);
    console.log('ISODate:', ISODate);
    setDate (ISODate);
    try {
      const response = await fetch(server + ISODate);
      const json = await response.json();
      console.log(json);
      setData (json); 
    } catch (e) {
      console.log(e);
    }
  } 

  const gamesListing = data => {
    let context = data ? (
      data.map(game => (
        <li key={game.id}>
          <a>{game.score[0]} - {game.score[1]}</a>
        </li>
      ))
    ) : (
      'No games are scheduled on this day.'
    ) 
    return context;
  }
  
  return (
    <Layout>
      <Container1>
        <Compon1>
          <Calendar_nav  onChange = {handleDateChange}/>
        </Compon1>
        <Compon2>
          <ul> 
            {gamesListing(data)}
          </ul>
        </Compon2>
      </Container1>
    </Layout>
  );
}
Index.getInitialProps = async function () {
  let date = formatDate();
  console.log('DATE in props: ', date);
  const res = await fetch(server + date);
  const data = await res.json()
  console.log(`Show data fetched in Index. Count: ${data.length}`)
  return {
    games: data,
    date: date
  }
}

export default Index;
