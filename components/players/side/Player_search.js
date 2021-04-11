import { useContext, useState, useEffect } from 'react'
import style from 'styled-components'
import ApiContext from '../../Context'

const Container = style.div`
    width: 100%;
    height: 33px;
    background-color: #CCD0D3;
    padding: 5px 5px 5px 0px;
    border-bottom: 1px solid #B3C1CA;
`

const Input = style.input`
    // position: fixed;
    z-index: 2;
    height: 25px;
    border-radius: 4px;
    padding-top: 0;
    padding-bottom: 0;
`

const Search = () => {
  const [setPlayers, fullList] = useContext(ApiContext)
  const [value, setValue] = useState('')

  const onSubmit = event => {
    event.preventDefault()
  }

  useEffect(() => {
    // filter players in list when value changes
    const filteredPlayers = fullList.filter(player => {
      return player.name.includes(value)
    })
    setPlayers(filteredPlayers)
  }, [value])

  const onChange = event => {
    event.preventDefault()
    setValue(event.target.value)
  }

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Input
          type='text'
          placeholder='Search Player'
          onChange={onChange}
          value={value}
        />
      </form>
    </Container>
  )
}

export default Search
