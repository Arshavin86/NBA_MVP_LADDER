import style from 'styled-components';
import Link from 'next/link'


const StyledLink = style.a`
  color: black;
  background: gray;
`

export default ({ href, name }) => (
  <Link prefetch href={href} passHref>
    <StyledLink>{name}</StyledLink>
  </Link>
)