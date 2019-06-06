import {useContext} from 'react';
import style from 'styled-components';
import ApiContext from './Context';

const renderVideos = videos => {
    let list = [];

    videos.map(video => {
        console.log('video:', video);
    })
}

const Videoboard = props => {
    const videos = useContext(ApiContext);
    // console.log(video[0].items);
    console.log("videos", videos)

    if (!videos[0]) {
        return (
            <div>
                Video will be here
            </div>
        )
    } else {
        return (
            <div>    
                <div>
                    <iframe className="embed-responsive-item" src={'https://www.youtube.com/embed/' + videos[0].id.videoId} allowFullScreen={true} >
                    </iframe>
                </div>
                <div>
                    <h3>
                        {videos[0].snippet.title}
                    </h3>
                    <div>
                        {videos[0].snippet.description}
                    </div>
                </div>
            </div>
        );
    }
}

export default Videoboard;