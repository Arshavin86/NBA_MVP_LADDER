import { useContext, useState } from 'react'
import style from 'styled-components'
import ApiContext from '../../Context'
import ReactTooltip from 'react-tooltip'

const Article = style.div`
    border-bottom: 1px solid #e6e8ea;
`

const Image = style.img`
    max-height: 1000px;
    width: 80%;
    margin-top: 23px;
`

const Title = style.div`
    margin-bottom: 13px;
    color: #11202B;
    font-size: 24px;
    font-family: "Flama-Bold", sans-serif;
    font-weight: bold; 
`

const Description = style.div`
    color: #11202B;
    font-family: "Flama-Bold", sans-serif;
    font-size: 14px;
`

const articlesListing = articles => {
  const context = []

  articles.map(article => {
    const tip = `Continue reading on ${article.source.name}`
    context.push(
      <Article key={article.publishedAt}>
        <Image src={article.urlToImage} alt="Article's image" />
        <Title>{article.title}</Title>
        <Description>{article.description}</Description>
        <a href={article.url} data-tip={tip}>Read more</a>
        <ReactTooltip />
      </Article>
    )
  })
  return context
}

const NewsBoard = () => {
  const [videos, news, videosOn] = useContext(ApiContext)
  // console.log(video[0].items);
  // console.log("videos: ", videos, 'news: ', news, 'videosOn: ', videosOn)

  if (news === 'nba') {
    return (
      <div>
                News will be here
      </div>
    )
  } else if (news.articles.length) {
    return (
      <div>
        {articlesListing(news.articles)}
      </div>
    )
  } else {
    return (
      <div>
                Sorry. There are currently no news available.
        <p>This is the offseason, dude.</p>
      </div>
    )
  }
}

export default NewsBoard
