import React, {useEffect, useState} from 'react';
// This is the Link API
import Link from 'next/link';
import Header from '../components/Header';
import Layout from '../components/MyLayout.js';


const server = 'http://localhost:3001/api/games/date/';

export default function Index () {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
          (async() => {
            let date = '2018-10-17';
            try {
              const response = await fetch(server + date);
              const res = await response.json();
              console.log(res);
              setData (res);
              setLoading(false); 
            } catch (e) {
              console.log(e);
            }
          })();
      }, []);

    return (
        <Layout>
          <p>I'm rendering because of Next!</p>
          {loading ? (
            "Loading..."
          ) : (
            <ul>
              {data.map(item => (
                <li key={item.id}>
                  <a>{item.bestplayer1}</a>
                </li>
              ))}
            </ul>
          )}
        </Layout>
      );
}