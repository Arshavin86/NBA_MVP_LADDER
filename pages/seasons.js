import Layout from '../components/MyLayout.js';
import {useState} from 'react';
import fetch from 'isomorphic-unfetch';
import style from 'styled-components';
import ApiContext from '../components/Context.js';
import Table from '../components/Table';



const server = 'http://localhost:3001/api/seasons'; 

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
`;

const Page_header = style.div`
    border-bottom: 3px solid #171b1f;
    align-items: center;
    display: flex;
    height: 80px;
    // justify-content: space-between;
    padding: 0 24px;
    width: 100%
`;

const Breakdown = style.div`
    display: flex;
    width: 100%
`;

const Button = style.button`
    margin-left: 2px;
    border-radius: 2px;
    flex: 1 1 0;
    margin: 2px 1px;
    padding: 0;
    text-align: center;
    font-family: "Roboto",sans-serif;
    font-size: 14px;
    font-weight: bold;
    line-height: 28px;
    text-decoration: none;
    cursor: pointer;
    width: 91px;
`;

const Select = style.select`
    text-overflow: ellipsis;
    overflow: hidden;
    width: 91px;
    background-color: transparent;
    border: 0;
    cursor: pointer;
    font-size: 12px;
    height: 32px;
    line-height: normal;
    padding: 0 30px 0 15px;
    outline: none;
    text-transform: none;
`;

const Main = style.div`
  width: 640px;
  padding: 30px 30px 30px;
  background: #fefefe;
`;

 const Seasons = (props) => {

    const [players, setPlayers] = useState(props.players);
    // console.log('players ', players);

    const seasonChange = event => {
        event.preventDefault();
        // console.log('value in seasonChange: ', event.target.value)
        
    }

    return (
        <Layout>
            <Container1></Container1>
            <Container2>
            <Page_header>
              2018-2019 NBA players ranking
            </Page_header>
            <Breakdown>
                <Button>
                    Regular Season
                </Button>
                <Button>
                    Playoffs
                </Button>
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

    const res = await fetch(server);
    const data = await res.json();

    return {
        players: data
    }
}

export default Seasons;
