import React, {useEffect, useState} from 'react';
// This is the Link API
// import Link from 'next/link';
// import Header from '../components/Header';

import Layout from '../components/MyLayout.js';
import Players from './players';

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

const Index = (props) => (
    <Layout>
      <p>I'm rendering because of Next!</p>
      {/* {loading ? (
        "Loading..."
      ) : ( */}
        <ul>
        {props.games.map(game => (
                <li key={game.id}>
                    <a>{game.bestplayer1}</a>
                </li>
            ))}
        </ul>
      {/* )} */}
    </Layout>
  );

Index.getInitialProps = async function () {

  let date = '2018-10-17';
  const res = await fetch(server + date)
  const data = await res.json()

  console.log(`Show data fetched in Index. Count: ${data.length}`)

  return {
      games: data
  }
}

export default Index;
