import Header from './Header';
import style from 'styled-components';

const LayoutStyle = style.div `
  height: auto,
  margin: 0;
  padding: 0;
  background: #fefefe;
  font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif;
  font-weight: normal;
  line-height: 1.5;
  color: #0a0a0a;
`

const Layout = props => (
  <LayoutStyle>
    <Header />
    {props.children}
  </LayoutStyle>
)

export default Layout;