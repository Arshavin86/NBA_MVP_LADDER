import {useContext} from 'react';
import style from 'styled-components';
import ApiContext from './Context';


//filter the wrong videos (from another game) by comparing publishedDate from resourse video and date of the game from my DB
const filterVideos = (publishedAt, date) => {
    const date1 = new Date (publishedAt);
    const date2 = new Date (date);
    //get the difference in days between two dates
    return Math.abs((date1.getTime() - date2.getTime()) / 86400000);

} 

const renderVideos = (videos, date) => {
    let list = [];

    videos.map(video => {
        const difference = filterVideos (video.snippet.publishedAt, date);
        console.log('difference:', difference);
        if (difference < 3) {
            list.push( <div key={video.snippet.publishedAt}>    
                <div>
                    <iframe src={'https://www.youtube.com/embed/' + video.id.videoId} allowFullScreen={true} >
                    </iframe>
                </div>
                <div>
                    <h3>
                        {video.snippet.title}
                    </h3>
                </div>
            </div>)
        }
    })
    return list;
}

const Videoboard = props => {
    const [videos, news, videosOn, date] = useContext(ApiContext);
    // console.log(video[0].items);
    console.log("videos", videos)

    if (!videos) {
        return (
            <div>
                Video will be here
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