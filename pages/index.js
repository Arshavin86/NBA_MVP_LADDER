import React, {useEffect} from 'react';

const server = 'http://localhost:3001/api/games/date/';

export default function Index () {

    useEffect(() => {
          (async() => {
            let date = '2018-10-17';
            try {
              var response = await fetch(server + date);
              var data = await response.json();
              console.log(data);
            } catch (e) {
              console.log(e);
            }
          })();
      }, []);

    return (
        <div>
          <p>I'm rendering because of Next!</p>
        </div>
      );
}