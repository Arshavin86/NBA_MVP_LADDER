import style from 'styled-components';
import {useContext} from 'react';
import ApiContext from '../Context';
import ReactTooltip from 'react-tooltip';

const Wrapper = style.section` 
    padding: 20px 0 0 0;  
    width: 50%;
`;

const Header = style.header` 
    margin: 0 0 10px 20px;
    font-size: 1em;
    font-family: "Flama-Bold",sans-serif;  
`;

const List = style.section` 
    padding: 0 10px;
    overflow-y: auto;
    min-height: 285px;
    display: flex;
    flex-flow: row wrap;
`;

const Video = style.div`
    width: 100%;  
    height: 100%;  
    margin: auto;  
`;

const Frame = style.iframe`
`;

const renderVideos = videos => {
    let list = [];

    videos.map(video => {
            list.push(   
                <Video key={video.snippet.publishedAt}>
                    <Frame src={'https://www.youtube.com/embed/' + video.id.videoId} allowFullScreen={true} data-tip={video.snippet.title}>
                    </Frame>
                    <ReactTooltip />
                </Video>)
    })
    return list;
}

const Videoboard = () => {
    const [player, videos] = useContext(ApiContext);

    if (!videos) {
        return (
            <Wrapper>
                Video will be here
            </Wrapper>
        )
    } if (!videos.length) { 
        return (
            <Wrapper>
                <Header>
                    There are no videos related to this player available
                </Header>
            </Wrapper>
        )
    } else {
        return (
            <Wrapper>  
                <Header>
                    RELATED VIDEOS
                </Header>  
                <List>
                    {renderVideos(videos)}
                </List>
            </Wrapper>
        );
    }
}

export default Videoboard;