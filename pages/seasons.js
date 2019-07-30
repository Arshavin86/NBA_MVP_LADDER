import Layout from '../components/MyLayout.js';
import {useState, useEffect} from 'react';
import fetch from 'isomorphic-unfetch';
import style from 'styled-components';
import ApiContext from '../components/Context.js';
import Table from '../components/seasons/Table';
import Server from './Server';

const server = Server.server;

const Container1 = style.div`
  display: flex; 
  color: black; 
  background: transparent;
  min-height: 100px;
`;

const Container2 = style.div`
    display: flex; 
    margin-right: auto;
    margin-left: auto; 
    background: #fefefe;
    width: 800px;
    flex-flow: row wrap;
    justify-content: center;
`;

const Page_header = style.div`
    border-bottom: 3px solid #171b1f;
    align-items: center;
    display: flex;
    height: 80px;
    width: 100%;
    font-size: 28px;
    font-weight: 800;
`;

const Breakdown = style.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

const Button1 = style.button`
    margin-left: 2px;
    border-radius: 40px;
    // flex: 1 1 0;
    margin: 2px 1px;
    padding: 0;
    text-align: center;
    font-family: "Roboto",sans-serif;
    font-size: 14px;
    font-weight: bold;
    line-height: 28px;
    text-decoration: none;
    cursor: pointer;
    width: 191px;
    // background-color: #CCD0D3;
    // background-color: ${(props) => props.seasonOn ? "white" : "gray"};
    &:hover {
        color: white;
    }
    &:focus {
        outline:0;
    }
`;

const Button2 = style(Button1)`
`;

const Select = style.select`
    background-color: transparent;
    border-color: gray;
    border-radius: 40px;
    cursor: pointer;
    font-size: 12px;
    height: 32px;
    line-height: normal;
    margin: 2px 1px;
    padding: 0 30px 0 15px;
    outline: none;
    text-transform: none;
    width: 150px;
    &:hover {
        color: #0B5BE1;
    }
`;

const Main = style.div`
  width: 100%;
  padding: 30px 0 30px 0;
  background: #fefefe;
`;

 const Seasons = props => {
    const [players, setPlayers] = useState(props.players);
    const [season, setSeason] = useState('2018-2019');
    const [seasonOn, toggleMode] = useState(true);
    const [seasonTime, setSeasonTime] = useState('regular season');
    // console.log('players ', players);
    useEffect(() => {
        (async() => {
          try {
            if (seasonOn) {
                const response = await fetch (server + 'seasons/' + season);
                const json = await response.json();
                //console.log('Players data on FE:', json);
                setPlayers(json);
            } else {
                const response = await fetch (server + 'seasons/playOffs' + season);
                const json = await response.json();
                //console.log('Players data on FE:', json);
                setPlayers(json);
            } 
          } catch (e) {
            console.warn(e);
          }
        })();
    }, [season, seasonOn]);

    const seasonChange = event => {
        event.preventDefault();
        // console.log('value in seasonChange: ', event.target.value)
        setSeason(event.target.value);  
    }

    const switchToSeason = event => {
        event.preventDefault();
        toggleMode(true);
        // console.log(toggleMode);
        setSeasonTime('regular season')
    }

    const switchToPlayOffs = event => {
        event.preventDefault();
        toggleMode(false);  
        setSeasonTime('playoffs');
    }
    return (
        <Layout>
            <Container1></Container1>
            <Container2>
                <Page_header>
                    {season} {seasonTime} NBA players ranking
                </Page_header>
                <Breakdown>
                    <Button1 onClick={switchToSeason} seasonOn={toggleMode}>
                        Regular Season
                    </Button1>
                    <Button2 onClick={switchToPlayOffs} seasonOn={toggleMode}>
                        Playoffs
                    </Button2>
                    <Select onChange={seasonChange}>
                        <option value="2018-2019">2018-2019</option>
                        <option value="2017-2018">2017-2018</option>
                        <option value="2016-2017">2016-2017</option>
                        <option value="2015-2016">2015-2016</option>
                    </Select>
                </Breakdown>
                <Main>
                    <ApiContext.Provider value = {[players]}>
                        <Table/>
                    </ApiContext.Provider>
                </Main>
            </Container2>  
        </Layout>
    );
 }
    
 Seasons.getInitialProps = async function () {
    const res = await fetch(server + 'seasons/2018-2019');
    const data = await res.json();
    return {
        players: data
    }
}

export default Seasons;
