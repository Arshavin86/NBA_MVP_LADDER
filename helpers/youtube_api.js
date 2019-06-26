const {YoutubeAPI_Key, CLIENT_ID, CLIENT_SECRET, REDIRECT_URL} = require ('../config/youtube');
//get Node.js client library for using Google APIs
const {google} = require('googleapis');

const searchYouTube = async (query, date1, date2) => {

    const youtube = google.youtube({
      version: 'v3',
      auth: YoutubeAPI_Key,
    });

    const setParams = channelID => {
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
        key: YoutubeAPI_Key,
      };
      return params;
    }
    
    const paramsXimoPierto = setParams('UCS7kvhJx431xCKuSgkBaUWw');
    // const paramsFreeDawkins = setParams('UCEjOSbbaOfgnfRODEEMYlCw');
    // const paramsHouseOfHighlights = setParams('UCqQo7ewe87aYAe7ub5UqXMw');
    // const paramsNBA = setParams('UCWJ2lWNubArHWmf3FIHbfcQ');

    try {
      const response1 = await youtube.search.list(paramsXimoPierto);
      
      // const response2 = await youtube.search.list(paramsFreeDawkins);
      // const response3 = await youtube.search.list(paramsHouseOfHighlights);
      // const response4 = await youtube.search.list(paramsNBA);
      // const res = response2.data.items.concat(response3.data.items, response4.data.items);
      // const res = response1.data.items.concat(response2.data.items, response3.data.items, response4.data.items);

      return response1.data.items;

      // console.log('res in searchYouTube: ', res.length);
      //   return res; 
    } catch (e) {
      console.log(e); 
    }
}

module.exports = searchYouTube;
