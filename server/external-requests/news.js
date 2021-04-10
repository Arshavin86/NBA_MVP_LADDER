const NewsAPI = require('newsapi')
const { newsApiKey } = require('../../config.js')

exports.searchNews = async (query) => {
  const newsapi = new NewsAPI(newsApiKey)
  try {
    const headlines = await newsapi.v2.topHeadlines({
      q: query,
      sources: 'abc-news, bleacher-report, espn, fox-sports, google-news'
    })
    return headlines
  } catch (e) {
    console.error(e)
  }
}
