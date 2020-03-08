import style from 'styled-components'

const Container = style.div`
    text-transform: uppercase;
    width: 100%;
    font-family: "Flama-Medium",sans-serif;
    display: flex;
    justify-content: space-between;
    font-size: 0.875em;
    border-bottom: solid 1px #66737C;
    padding: 0px 10px;
`

const Player = style.div`
    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 10px;

`

const Team = style.div`
    padding: 10px 10px;
`

const Headers = props => {
  return (
    <Container>
      <Player>Player Name</Player>
      <Team>Team</Team>
    </Container>
  )
}

export default Headers
