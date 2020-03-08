import { useContext } from 'react'
import ApiContext from '../Context'
import style from 'styled-components'

const Wrapper = style.section` 
    padding: 20px;
    border-right: 1px solid #CCD0D3;
    width: 50%;
`

const Heading = style.span` 
    margin: 7px 0 0 0;
    line-height: 1;
    font-size: 0.75em;
    font-family: "Flama-Bold",sans-serif;
    color: #66737C;
    width: 50%;
    text-transform: uppercase;
`

const Info = style(Heading)` 
    font-family: "Flama-Basic",sans-serif;
    font-size: 1em;
    text-transform: none;
`

const List = style.ul` 
    margin: 0;
    padding: 0;
`

const Item = style.li` 
    padding: 4px 0;
    border-bottom: 1px solid #CCD0D3;
    display: flex;
`

const Vitals = () => {
  const [player] = useContext(ApiContext)
  const { collegename, country, dateofbirth, heightinmeters, weightinkilograms, startnba, name } = player

  return (
    <Wrapper>
      <List>
        <Item>
          <Heading>
                    born
          </Heading>
          <Info>
            {dateofbirth}
          </Info>
        </Item>
        <Item>
          <Heading>
                    country
          </Heading>
          <Info>
            {country}
          </Info>
        </Item>
        <Item>
          <Heading>
                    college
          </Heading>
          <Info>
            {collegename}
          </Info>
        </Item>
        <Item>
          <Heading>
                    NBA debut
          </Heading>
          <Info>
            {startnba}
          </Info>
        </Item>
        <Item>
          <Heading>
                    height
          </Heading>
          <Info>
            {heightinmeters} m
          </Info>
        </Item>
        <Item>
          <Heading>
                    weight
          </Heading>
          <Info>
            {weightinkilograms} kg
          </Info>
        </Item>
        <Item>
          <Heading>
                    team
          </Heading>
          <Info>
            {name}
          </Info>
        </Item>
      </List>
    </Wrapper>
  )
}

export default Vitals
