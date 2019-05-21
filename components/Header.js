import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const Header = () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/players">
      <a style={linkStyle}>Players</a>
    </Link>
    <Link href="/teams">
      <a style={linkStyle}>Teams</a>
    </Link>
    <Link href="/seasons">
      <a style={linkStyle}>Seasons</a>
    </Link>
    <Link href="/playoffs">
      <a style={linkStyle}>Playoffs</a>
    </Link>
    <Link href="/leaders">
      <a style={linkStyle}>Leaders</a>
    </Link>
  </div>
)

export default Header;