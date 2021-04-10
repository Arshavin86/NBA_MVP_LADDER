import Layout from '../components/MyLayout.js'
// import a simple implementation of the browser fetch API, which works both in client and server environments
import fetch from 'isomorphic-unfetch'
import { serverHost } from '../config.js'

const Boxscore = (props) => (
  <Layout>
    <p>Here come our Boxscore!</p>
    <ul>
      {props.games.map(game => (
        <li key={game.id}>
          <a>{game.bestplayer1}</a>
        </li>
      ))}
    </ul>
  </Layout>
)

Boxscore.getInitialProps = async function () {
  const date = '2018-10-17'
  const res = await fetch(`${serverHost}/api/games/date/${date}`)
  const data = await res.json()

  console.log(`Show data fetched in Boxscore. Count: ${data.length}`)

  return {
    games: data
  }
}

export default Boxscore
