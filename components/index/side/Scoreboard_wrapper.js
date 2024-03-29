import { useContext } from 'react'
import style from 'styled-components'
import ApiContext from '../../Context'

const Section = style.section`
    order: initial;
    max-width: 375px;
    margin: 0 auto;
`

const ScoreTitle = style.div`
    margin: 10px auto;
    background: #fff;
    color: #11202B;
    font-family: "Flama-Medium",sans-serif;
    font-size: 14px;
    line-height: initial;
`

const ScoreTitleWrapper = style.div`
    padding: 6px 10px 7px 3px;
`

const Team = style.div`
    display: flex;
    align-items: left;
    margin: 0;
    min-height: 34px;
    justify-content: space-between;
`

const TeamLogo = style.div`
    // flex: 1 1 0;
    text-align: center;
    padding: 6px 10px 7px 3px;
`

const TeamName = style.div`
    text-align: center;
    padding: 15px 0 0 0;
`

const TeamScore = style.div`
    font-family: "Flama-Basic",sans-serif;
    font-size: 24px;
    text-align: right;
    line-height: initial;
    padding: 10px 0 0 0;
`

const GameMVP = style.div`
    border-top: 1px solid #e6e8ea;
    text-align: center;
    background: #F3F4F5;
    font-size: 13px;
    font-family: "Flama-Basic",sans-serif;
    height: 30px;
    line-height: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 5px;
`

const Bottom = style.div`
    display: flex; 
    flex-direction: row;
    padding: 6px 0px;
    border-top: 1px solid #e6e8ea;
    width: 100%;
    text-align: center;
`

const Watch = style.div`
    border-right: 1px solid #e6e8ea;
    &: hover {
        background: #F3F4F5;
    }
`

const WatchButton = style.div`
    display: block;
    padding: 10px 10px;
    font-size: 12px;
    text-transform: uppercase;
    cursor: pointer;
`
const HiddenText = style.span`
    font-color: black;
    font-size: 0px;
`

const Boxscore = style(Watch)`
    border-right: 1px solid #e6e8ea;
`
const BoxscoreButton = style(WatchButton)`
    padding: 10px 10px 0px 10px; 
`

const MVP = style(Watch)`
    border-right: 0px solid #e6e8ea;
`
const MVPButton = style(WatchButton)`
    padding: 10px 10px 0px 10px; 
`

const gamesListing = (data, handleVideoChange) => {
  const context = []
  let visitorLogo
  let visitorName
  let homelogo
  let homeName
  const stats = []
  let statsLine

  // I use textContent here instead of {visitorName} and {homeName} variables cause by the end of the mapping there values are equal to the names from last element of data array
  const changeVideo = (e) => {
    e.preventDefault()
    const query = e.currentTarget.textContent.slice(5)
    console.log(query)
    handleVideoChange(query)
  }

  if (data === 'No games were played on this day') return data

  data.map(game => {
    visitorLogo = Number(game.score[0]) > Number(game.score[1])
      ? game.logo
      : game.losingTeam[0].logo

    visitorName = Number(game.score[0]) > Number(game.score[1])
      ? game.name
      : game.losingTeam[0].name

    homelogo = Number(game.score[0]) < Number(game.score[1])
      ? game.logo
      : game.losingTeam[0].logo

    homeName = Number(game.score[0]) < Number(game.score[1])
      ? game.name
      : game.losingTeam[0].name

    stats[0] = Number(game.statsbp1[0]) > 14
      ? Number(game.statsbp1[0]) + ' pts '
      : undefined

    stats[1] = Number(game.statsbp1[1]) > 4
      ? Number(game.statsbp1[1]) + ' ast '
      : undefined

    stats[2] = Number(game.statsbp1[2]) > 4
      ? Number(game.statsbp1[2]) + ' reb '
      : undefined

    stats[3] = Number(game.statsbp1[3]) > 2
      ? Number(game.statsbp1[3]) + ' stl '
      : undefined

    stats[4] = Number(game.statsbp1[4]) > 2
      ? Number(game.statsbp1[4]) + ' blk '
      : undefined

    stats[5] = Number(game.statsbp1[5]) > 9
      ? Number(game.statsbp1[5]) + ' tov '
      : undefined

    stats[6] = Number(game.statsbp1[6]) > 19
      ? +Number(game.statsbp1[6]) + ' plusMinus '
      : undefined

    stats[7] = Number(game.statsbp1[7]) > 59.9
      ? Number(game.statsbp1[7]) + ' fgp '
      : undefined

    const firstname = game.bestPlayerName[0].firstname
    let lastname = game.bestPlayerName[0].lastname
    let space = ' '
    // get rid of this unpronounced name
    if (lastname === 'Antetokounmpo') {
      lastname = ''
      space = ''
    }
    statsLine = firstname + space + lastname + ': ' + stats.map(stat => {
      if (stat) return stat
    }).join('')

    context.push(
      <Section key={game.id}>
        <ScoreTitle>
          <ScoreTitleWrapper>
            <Team>
              <TeamLogo>
                <img src={visitorLogo} height='34px' />
              </TeamLogo>
              <TeamName>
                {visitorName}
              </TeamName>
              <TeamScore>
                {game.score[0]}
              </TeamScore>
            </Team>
            <Team>
              <TeamLogo>
                <img src={homelogo} height='34px' />
              </TeamLogo>
              <TeamName>
                {homeName}
              </TeamName>
              <TeamScore>
                {game.score[1]}
              </TeamScore>
            </Team>
          </ScoreTitleWrapper>
          <GameMVP>
            {statsLine}
          </GameMVP>
          <Bottom>
            <Watch>
              <WatchButton onClick={changeVideo}>
                            Watch
                <HiddenText>
                  {visitorName} - {homeName}
                </HiddenText>
              </WatchButton>
            </Watch>
            <Boxscore>
              <BoxscoreButton>
                            Boxscore
              </BoxscoreButton>
            </Boxscore>
            <MVP>
              <MVPButton>
                            MVP of the game
              </MVPButton>
            </MVP>
          </Bottom>
        </ScoreTitle>
      </Section>
    )
  })
  return context
}

const Wrapper = props => {
  const [data, handleVideoChange] = useContext(ApiContext)

  return gamesListing(data, handleVideoChange)
}

export default Wrapper
