import { useContext } from 'react'
import ApiContext from '../Context'
import style from 'styled-components'

const Wrapper = style.div`
    position: absolute;
    right: 20px;
    bottom: 0;
    height: 50%;
    color: #fff;
    font-size: 1rem;
`

const Top = style.div`
    font-size: 0.875em;
`

const Bottom = style.div`
    font-size: 0.875em;
`

const First = style.p`
    font-size: 1.25em;
    font-family: "Flama-Medium",sans-serif;
    margin: 8px 0 0 0;
`

const Last = style.p`
    font-size: 1.5625em;
    font-family: "Flama-Bold",sans-serif;
    margin: 0;
`

const Details = () => {
  const [player] = useContext(ApiContext)
  const { lastname, firstname, jersey, pos } = player

  return (
    <Wrapper>
      <Top>
        <span>#{jersey} | {pos}</span>
      </Top>
      <Bottom>
        <First>
          {firstname}
        </First>
        <Last>
          {lastname}
        </Last>
      </Bottom>
    </Wrapper>
  )
}

export default Details
