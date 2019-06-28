import {useContext} from 'react';
import ApiContext from '../../Context';
import Videoboard from './Videoboard';
import NewsBoard from './NewsBoard';

const MainBoard = () => {
    const [videos, news, videosOn] = useContext(ApiContext);
    // console.log(video[0].items);
    console.log("videos: ", videos, 'news: ', news, 'videosOn: ', videosOn)

    if (videosOn) {
        return (
            <div>
                <Videoboard/>
            </div>
        )
    } else {
        return (
            <div>    
                <NewsBoard/>
            </div>
        );
    }
}

export default MainBoard;