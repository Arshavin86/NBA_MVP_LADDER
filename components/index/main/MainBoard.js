import { useContext } from 'react'
import ApiContext from '../../Context'
import Videoboard from './Videoboard'
import NewsBoard from './NewsBoard'

const MainBoard = () => {
  const [videosOn] = useContext(ApiContext)

  if (videosOn) {
    return (
      <div>
        <Videoboard />
      </div>
    )
  }
  return (
    <div>
      <NewsBoard />
    </div>
  )
}

export default MainBoard
