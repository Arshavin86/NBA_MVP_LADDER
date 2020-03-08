const searchNews = require('../helpers/news_api')

exports.getNews = async (req, res) => {
  const query = req.params.query
  console.log('id', query)

  try {
    const response = await searchNews(query)
    // console.log('News data on BE:', response);
    res.status(200).send(response)
  } catch (e) {
    console.log(e)
  }
}
