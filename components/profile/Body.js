import style from 'styled-components'
import Vitals from './Body_Vitals'
import Video from './Body_Video'

const Wrapper = style.section` 
    display: flex;
    flex-direction: row;
`

const Body = () => {
  return (
    <Wrapper>
      <Vitals />
      <Video />
    </Wrapper>
  )
}

export default Body
