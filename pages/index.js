/* eslint-disable func-names */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable consistent-return */
import { useState, useEffect } from 'react'
import style from 'styled-components'
import fetch from 'isomorphic-unfetch'
import PropTypes from 'prop-types'
import CalendarNav from '../components/index/side/CalendarNav'
import Layout from '../components/MyLayout'
import ScoreboardWrapper from '../components/index/side/Scoreboard_wrapper'
import ApiContext from '../components/Context'
import MainBoard from '../components/index/main/MainBoard'
import { server } from '../config.js'

const Container1 = style.div`
  display: flex; 
  color: black; 
  background: #E5E7E9;
  min-height: 100px;
`

const Container2 = style.div`
  display: flex; 
  flex-direction: row;
  margin-right: auto;
  margin-left: auto;
  max-width: none;
  text-align: left;
  vertical-align: middle;
  line-height: 40px; 
  background: #E5E7E9;
  padding: 0 15px;
  justify-content: center;
`
const Scoreboard = style.div`
  // border: 0.5px solid black;
  font-family: "Flama-Basic",sans-serif;
  width: 320px;
`
const ScoreboardNav = style.div`
  background-color: #00092D;
`

const ScoreboardBottom = style.div`
  width: 100%;
  font-family: "Flama-Basic",sans-serif;
  font-size: 100%;
  overflow-x: hidden;
  background: #CCD0D3;
`

const Main = style(ScoreboardBottom)`
  width: 640px;
  padding: 30px 30px 30px;
  background: #fefefe;
`

const formatDate = (date) => {
  const d = date ? new Date(date) : new Date()
  let month = `${d.getMonth() + 1}`
  let day = `${d.getDate()}`
  const year = d.getFullYear()

  if (month.length < 2) {
    month = `0${month}`
  }
  if (day.length < 2) {
    day = `0${day}`
  }
  return [year, month, day].join('-')
}

const Index = (props) => {
  const { games, todaysDate } = props
  const [data, setData] = useState(games)
  const [date, setDate] = useState(todaysDate)
  const [news, setNews] = useState('nba')
  const [videos, setVideo] = useState(null)
  const [videosOn, setMain] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${server}news/${news}`)
        const json = await response.json()
        setNews(json)
      } catch (e) {
        console.warn(e)
      }
    })()
  }, [])

  const handleDateChange = async (date) => {
    const ISODate = formatDate(date)
    let json
    setDate(ISODate)
    try {
      const response = await fetch(`${server}games/date/${ISODate}`)
      if (response.status === 500 || response.status === 404) {
        json = 'No games were played on this day'
      } else {
        json = await response.json()
      }
      setData(json)
    } catch (e) {
      console.warn(e)
    }
  }

  const handleVideoChange = async (query) => {
    try {
      const response = await fetch(`${server}videos/${query} ${date}`)
      const json = await response.json()
      setVideo(json)
      setMain(true)
    } catch (e) {
      console.warn(e)
    }
  }

  return (
    <Layout>
      <Container1>Here could be your advertisement </Container1>
      <Container2>
        <Scoreboard>
          <ScoreboardNav>
            <ApiContext.Provider value={[date, handleDateChange]}>
              <CalendarNav />
            </ApiContext.Provider>
          </ScoreboardNav>
          <ScoreboardBottom>
            <ApiContext.Provider value={[data, handleVideoChange]}>
              <ScoreboardWrapper />
            </ApiContext.Provider>
          </ScoreboardBottom>
        </Scoreboard>
        <Main>
          <ApiContext.Provider value={[videos, news, videosOn, date]}>
            <MainBoard />
          </ApiContext.Provider>
        </Main>
      </Container2>
    </Layout>
  )
}

Index.propTypes = {
  games: PropTypes.object,
  todaysDate: PropTypes.string
}

Index.getInitialProps = async function () {
  const date = formatDate()
  let json

  try {
    const res = await fetch(`${server}games/date/${date}`)
    if (res.status === 500 || res.status === 404) {
      json = 'No games were played on this day'
    } else {
      json = await res.json()
    }
    return {
      games: json,
      todaysDate: date
    }
  } catch (e) {
    console.warn(e)
  }
}

export default Index
