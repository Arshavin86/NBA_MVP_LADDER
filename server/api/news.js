const { searchNews } = require('../external-requests/news')

exports.getNews = async (req, res) => {
  const query = req.params.query
  console.log('id', query)

  try {
    const response = await searchNews(query)
    res.status(200).send(response)
  } catch (e) {
    console.log(e)
  }
}
