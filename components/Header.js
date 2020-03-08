import Link from 'next/link'
import style from 'styled-components'

const Container = style.div`
  display: flex; 
  flex-direction: row;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  text-align: center;
  vertical-align: middle;
  line-height: 40px; 
  background: #1D428A;
  position: fixed;
  z-index: 1;
  justify-content: center;
`

const Image = style.img`
  height: 40px;
  padding: 0px 10px 0px 10px;
`

const linkStyle = {
  marginRight: 15,
  color: 'white',
  marginLeft: 15
}

const Header = () => (
  <Container>
    <Image src='../static/MVP_logo.png' />
    <Link href='/'>
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href='/players'>
      <a style={linkStyle}>Players</a>
    </Link>
    <Link href='/'>
      <a style={linkStyle}>Teams</a>
    </Link>
    <Link href='/seasons'>
      <a style={linkStyle}>Seasons</a>
    </Link>
    <Link href='/'>
      <a style={linkStyle}>Playoffs</a>
    </Link>
    <Link href='/'>
      <a style={linkStyle}>Leaders</a>
    </Link>
  </Container>
)

export default Header
