const { google } = require('googleapis')
const {
  YoutubeAPI_Key, CLIENT_ID, CLIENT_SECRET, REDIRECT_URL
} = require('../../config/youtube')
// get Node.js client library for using Google APIs
module.exports = {
  searchYouTubeForGames,
  searchYouTubeForPlayer
}

async function searchYouTubeForGames (query, date1, date2) {
  const youtube = google.youtube({
    version: 'v3',
    auth: YoutubeAPI_Key
  })

  const setParams = (channelID) => {
    const params = {
      part: 'snippet',
      maxResults: 5,
      order: 'viewCount',
      q: query,
      chart: 'mostPopular',
      type: 'video',
      channelId: channelID,
      publishedAfter: date1,
      publishedBefore: date2,
      key: YoutubeAPI_Key
    }
    return params
  }

  const paramsXimoPierto = setParams('UCCT8U1RXajYmc2kruJbSmyg')
  const paramsFreeDawkins = setParams('UCEjOSbbaOfgnfRODEEMYlCw')
  const paramsHouseOfHighlights = setParams('UCqQo7ewe87aYAe7ub5UqXMw')
  const paramsNBA = setParams('UCWJ2lWNubArHWmf3FIHbfcQ')

  try {
    // const response1 = await youtube.search.list(paramsXimoPierto);

    // const response2 = await youtube.search.list(paramsFreeDawkins);
    const response3 = await youtube.search.list(paramsHouseOfHighlights)
    // const response4 = await youtube.search.list(paramsNBA);
    // const res = response2.data.items.concat(response3.data.items, response4.data.items);
    // const res = response1.data.items.concat(response2.data.items, response3.data.items, response4.data.items);

    return response3.data.items

    // console.log('res in searchYouTube: ', res.length);
    //   return res;
  } catch (e) {
    console.log(e)
  }
}

async function searchYouTubeForPlayer (query) {
  const youtube = google.youtube({
    version: 'v3',
    auth: YoutubeAPI_Key
  })

  const setParams = (channelID) => {
    const params = {
      part: 'snippet',
      maxResults: 2,
      order: 'viewCount',
      q: query,
      chart: 'mostPopular',
      type: 'video',
      channelId: channelID,
      key: YoutubeAPI_Key
    }
    return params
  }

  const NBA = setParams('UCWJ2lWNubArHWmf3FIHbfcQ')

  try {
    const response1 = await youtube.search.list(NBA)

    return response1.data.items

    // console.log('res in searchYouTube: ', res.length);
    //   return res;
  } catch (e) {
    console.log(e)
  }
}
