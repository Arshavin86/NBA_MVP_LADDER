import { useRouter } from 'next/router'
import Layout from '../../components/MyLayout'
import { useState, useEffect } from 'react'
import { serverHost } from '../../config.js'
import style from 'styled-components'
import ApiContext from '../../components/Context'
import Header from '../../components/profile/Header'
import Body from '../../components/profile/Body'

const Container1 = style.div` 
  color: black; 
  background: #E5E7E9;
  min-height: 100px;
`

const Container2 = style.div`
  display: flex; 
  flex-direction: row;
  margin-right: auto;
  margin-left: auto;
  height: 100vh;
  background: #E5E7E9;
  justify-content: center;
  padding: 0 30px;
`

const Main = style.div`
  width: 640px;
  padding: 30px 30px 30px;
  background: #fefefe;
  font-family: "Flama-Basic",sans-serif;
  font-size: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`

export default function Post (props) {
  const router = useRouter()
  const [player, setPlayer] = useState(props.player[0])
  const [videos, setVideo] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${serverHost}/api/videosPlayer/${player.firstname} ${player.lastname}`)
        const json = await response.json()
        setVideo(json)
      } catch (e) {
        console.warn(e)
      }
    })()
  }, [])

  return (
    <Layout>
      <Container1>Here could be your advertisement </Container1>
      <Container2>
        <Main>
          <ApiContext.Provider value={[player, videos]}>
            <Header />
            <Body />
          </ApiContext.Provider>
        </Main>
      </Container2>
    </Layout>
  )
};

Post.getInitialProps = async function (router) {
  try {
    const response = await fetch(server + 'players/' + router.query.id)
    const json = await response.json()
    
    return {
      player: json
    }
  } catch (e) {
    console.warn(e)
  }
}
