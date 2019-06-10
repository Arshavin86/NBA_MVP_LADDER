    import Layout from '../components/MyLayout.js';
// import a simple implementation of the browser fetch API, which works both in client and server environments
import fetch from 'isomorphic-unfetch';

const server = 'http://localhost:3001/api/games/date/'; 

 const Players = (props) => (
    <Layout>
        <p>Here come our players!</p>
        <ul>
            {props.games.map(game => (
                <li key={game.id}>
                    <a>{game.bestplayer1}</a>
                </li>
            ))}
        </ul>
    </Layout>
);

Players.getInitialProps = async function () {

    let date = '2018-10-17';
    const res = await fetch(server + date)
    const data = await res.json()

    console.log(`Show data fetched in Players. Count: ${data.length}`)

    return {
        games: data
    }
}

export default Players;