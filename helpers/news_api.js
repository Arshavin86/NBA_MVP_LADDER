const {NewsAPI_Key} = require ('../config/news');
const NewsAPI = require('newsapi');

const searchNews = async (query) => {
    const newsapi = new NewsAPI(NewsAPI_Key);
// To query /v2/top-headlines
    try {
        console.log('query: ', query);
        const headlines = await newsapi.v2.topHeadlines({
            q: query,
            sources: 'abc-news, bleacher-report, espn, fox-sports, google-news',
        });
        console.log('headlines: ', headlines);
        return headlines;
    } catch (e) {
        console.log(e); 
    }
}
  
  module.exports = searchNews;
  
  
//   abc-news, bleacher-report, espn, fox-sports, google-news