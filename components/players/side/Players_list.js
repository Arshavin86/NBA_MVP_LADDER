import { useContext } from 'react'
import style from 'styled-components'
import ApiContext from '../../Context'
import Link from 'next/link'

const abbreviation = {
  'Brooklyn Nets': 'BKN',
  'Philadelphia 76ers': 'PHI',
  'Orlando Magic': 'ORL',
  'Toronto Raptors': 'TOR',
  'LA Clippers': 'LAC',
  'Golden State Warriors': 'GSW',
  'San Antonio Spurs': 'SAS',
  'Denver Nuggets': 'DEN',
  'Indiana Pacers': 'IND',
  'Boston Celtics': 'BOS',
  'Portland Trail Blazers': 'POR',
  'Oklahoma City Thunder': 'OKC',
  'Detroit Pistons': 'DET',
  'Milwaukee Bucks': 'MIL',
  'Utah Jazz': 'UTA',
  'Houston Rockets': 'HOU',
  'Miami Heat': 'MIA',
  'Charlotte Hornets': 'CHA',
  'Atlanta Hawks': 'ATL',
  'Memphis Grizzlies': 'MEM',
  'New York Knicks': 'NYK',
  'Cleveland Cavaliers': 'CLE',
  'New Orleans Pelicans': 'NOP',
  'Minnesota Timberwolves': 'MIN',
  'Sacramento Kings': 'SAC',
  'Dallas Mavericks': 'DAL',
  'Phoenix Suns': 'PHX',
  'Chicago Bulls': 'CHI',
  'Los Angeles Lakers': 'LAL',
  'Washington Wizards': 'WAS'
}

const Container = style.section`
    padding-left: 10px;
    font-size: 12px;
`

const List = style.div`
    position: relative;
    padding: 13px 0;
    border-bottom: solid 1px #66737C;
    display: flex;
    justify-content: space-around;
`

const Name = style.div`
    color: #0B5BE1;
    flex: 0 0 83.33333%;
    max-width: 83.33333%;
    padding-right: .9375rem;
    padding-left: .9375rem;
    cursor: pointer;
`

const Abbr = style.abbr`
    color: #11202B;
    padding: 0 20px 0 0;
`

const playersListing = (players, letter) => {
  const context = []

  players.sort((a, b) => {
    if (a.name < b.name) { return -1 }
    if (a.name > b.name) { return 1 }
    return 0
  })

  players.map(player => {
    const PostLink = props => (
      <Name>
        <Link href='/profile/[id]' as={`/profile/${props.id.name}`}>
          <div>{props.id.name}</div>
        </Link>
      </Name>
    )

    if (player.name[0] === letter) {
      context.push(
        <List key={player.id}>
          <PostLink id={player} />
          <Abbr tittle={player.team}>{abbreviation[player.team]}</Abbr>
        </List>
      )
    }
  })
  return context
}

const PlayersList = props => {
  const [players] = useContext(ApiContext)

  return (
    <Container>
      {playersListing(players, props.letter)}
    </Container>
  )
}

export default PlayersList
