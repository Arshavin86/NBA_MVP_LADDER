import {useState, useContext} from 'react';
import style from 'styled-components';
import ApiContext from './Context';

const gamesListing = data => {
    let context = [];
    if (data.length) {
      data.map(game => {
        context.push (<li key={game.id}>
          <a>{game.score[0]} - {game.score[1]}</a>
        </li>
      )});
    } else {
      return 'No games were played on this day';
    } 
    console.log('context', context);
    return context;
}

const Wrapper = props => {
    const [data] = useContext(ApiContext);

    return gamesListing(data);
}

export default Wrapper;