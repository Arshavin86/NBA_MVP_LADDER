import {useContext, useState} from 'react';
import ApiContext from '../../Context';
import Videoboard from './Videoboard';
import NewsBoard from './NewsBoard';

const MainBoard = () => {
    const [videos, news, videosOn] = useContext(ApiContext);
    
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