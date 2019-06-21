import {useContext} from 'react';
import style from 'styled-components';
import ApiContext from './Context';
import {useState, useEffect} from 'react';

const Search = props => {
    const [players, setPlayers, fullList] = useContext(ApiContext);
    const [value, setValue] = useState('');

    const onSubmit = event => {
        event.preventDefault();
        // console.log('Submited value: ', value);

    }
    // the useEffect hook takes a value to listen to for changes
    useEffect(() => {
        // filter players in list when value changes
        const filteredPlayers = fullList.filter(player => {
            return player.name.includes(value);
        })
        setPlayers (filteredPlayers);
      }, [value]);

    const onChange = event => {
        event.preventDefault();
        console.log('value in onChange: ', event.target.value)
        setValue(event.target.value);
    }
    
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Search Player"  onChange={onChange} value={value}></input>
            </form>
        </div>
    )
    
}

export default Search;

