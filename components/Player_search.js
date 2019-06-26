import {useContext} from 'react';
import style from 'styled-components';
import ApiContext from './Context';
import {useState, useEffect} from 'react';

const Container = style.div`
    width: 100%;
    position: relative;
    z-index: 2;
    height: 43px;
    background-color: #CCD0D3;
    padding: 8px;
    border-bottom: 1px solid #B3C1CA;
`;

const Input = style.input`
    height: 28px;
    border-radius: 4px;
    padding-top: 0;
    padding-bottom: 0;
`;


const Search = props => {
    const [setPlayers, fullList] = useContext(ApiContext);
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
        <Container>
            <form onSubmit={onSubmit}>
                <Input type="text" placeholder="Search Player"  onChange={onChange} value={value}></Input>
            </form>
        </Container>
    )
    
}

export default Search;

