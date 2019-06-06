
import {useState, useEffect} from 'react';
import Calendar_nav from '../components/Calendar_nav.js';
import Layout from '../components/MyLayout.js';
import Scoreboard_wrapper from '../components/Scoreboard_wrapper.js';
import style from 'styled-components';
import fetch from 'isomorphic-unfetch';
import ApiContext from '../components/Context.js';
import Videoboard from '../components/Videoboard';

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

const server = 'http://localhost:3001/api/';

const formatDate = date => {
   
    let d = date ? new Date(date) : new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

const Index = props => {
  const [data, setData] = useState(props.games);
  const [date, setDate] = useState(props.date);
  const [query, setQuery] = useState('Lebron');
  const [video, setVideo] = useState(null);

  useEffect(() => {
    (async() => {
      try {
        const response = await fetch (server + 'videos/' + query);
        const json = await response.json();
        console.log('Youtube data on FE:', json);
        setVideo(json);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const handleDateChange = async date => {
    const ISODate = formatDate(date);
    let json;
    console.log('ISODate:', ISODate);
    setDate (ISODate);
    try {
      const response = await fetch(server + 'games/date/' + ISODate);
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

  const handleVideoChange = async query => {
    let options = {
      query: query,
      max: 5,
      key: YoutubeAPI_Key,
    };
    try {
      const response = await searchYouTube (options);
      // const json = await response.json();
      console.log('Youtube data on FE:', response);
      setVideo(response);
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
            <ApiContext.Provider value = {[data, handleVideoChange]}>
              <Scoreboard_wrapper/>
            </ApiContext.Provider>
          </Scoreboard_bottom>
        </Scoreboard>
        <Compon2>
          <ApiContext.Provider value = {[video]}>
              <Videoboard/>
          </ApiContext.Provider>
        </Compon2>
      </Container1>
    </Layout>
  );
}

Index.getInitialProps = async function () {
  let date = formatDate('2019-06-05');
  let json;
  console.log('DATE in props: ', date);

  try {
    const res = await fetch(server + 'games/date/' + date);
    console.log('res status on FE:', res.status);
    if (res.status === 500) {
      json = 'No games were played on this day';
    } else {
      const json = await res.json();
      console.log('json!!!!!', json);
      console.log(`Show data fetched in Index. Count: ${json.length}`)
    }
    return {
      games: json,
      date: date,
      // query: json[0].id
    }
  } catch (e) {
    console.log(e);
  }
}

export default Index;