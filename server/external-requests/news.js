const NewsAPI = require('newsapi')
const { newsApiKey } = require('../../config.js')

exports.searchNews = async (query) => {
  const newsapi = new NewsAPI(newsApiKey)
  // To query /v2/top-headlines
  try {
    // console.log('query: ', query);
    const headlines = await newsapi.v2.topHeadlines({
      q: query,
      sources: 'abc-news, bleacher-report, espn, fox-sports, google-news'
    })
    // console.log('headlines: ', headlines);
    return headlines
  } catch (e) {
    console.log(e)
  }
}
