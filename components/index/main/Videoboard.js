import {useContext} from 'react';
import ApiContext from '../../Context';
import style from 'styled-components';

//filter the wrong videos (from another game) by comparing publishedDate from resourse video and date of the game from my DB
const filterVideos = (publishedAt, date) => {
    const date1 = new Date (publishedAt);
    const date2 = new Date (date);
    //get the difference in days between two dates
    return Math.abs((date1.getTime() - date2.getTime()) / 86400000);

} 

const Video = style.div`
    border-bottom: 1px solid #CCD0D3;  
`;

const renderVideos = (videos, date) => {
    let list = [];

    videos.map(video => {
        const difference = filterVideos (video.snippet.publishedAt, date);
        if (difference < 3) {
            list.push( <Video key={video.snippet.publishedAt}>    
                <div>
                    <iframe src={'https://www.youtube.com/embed/' + video.id.videoId} allowFullScreen={true} >
                    </iframe>
                </div>
                <div>
                    <h3>
                        {video.snippet.title}
                    </h3>
                </div>
            </Video>)
        }
    })
    return list;
}

const Videoboard = () => {
    const [videos, news, videosOn, date] = useContext(ApiContext);

    if (!videos) {
        return (
            <div>
                Video will be here
            </div>
        )
    } if (!videos.length) { 
        return (
            <div>
                There are no videos of this game available
            </div>
        )
    } else {
        return (
            <div>    
                {renderVideos(videos, date)}
            </div>
        );
    }
}

export default Videoboard;