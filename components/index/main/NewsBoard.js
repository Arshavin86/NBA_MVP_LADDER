import {useContext} from 'react';
import style from 'styled-components';
import ApiContext from '../../Context';

const Image = style.img`
    max-height: 1000px;
    width: 80%;
    margin-top: 23px;
`;

const Title = style.div`
    margin-bottom: 13px;
    color: #11202B;
    font-size: 28px;
    font-family: "Flama-Bold", sans-serif;
    font-weight: bold; 
`;

const Description = style.div`
    color: #11202B;
    font-family: "Flama-Bold", sans-serif;
    font-size: 14px;
`;


const articlesListing = articles => {
    let context = [];

    articles.map (article => {
        context.push (
        <div key={article.publishedAt}>
            <Image src={article.urlToImage} alt="my image"/>
            <Title>{article.title}</Title>
            <Description>{article.description}</Description>
            <div>Read more</div>
        </div>
        )
    })
    return context;
}

const NewsBoard = props => {
    const [videos, news, videosOn] = useContext(ApiContext);
    // console.log(video[0].items);
    console.log("videos: ", videos, 'news: ', news, 'videosOn: ', videosOn)

    if (news === 'nba') {
        return (
            <div>
                News will be here
            </div>
        )
    } else {
        return (
            <div>    
                {articlesListing(news.articles)}
            </div>
        );
    }
}

export default NewsBoard;