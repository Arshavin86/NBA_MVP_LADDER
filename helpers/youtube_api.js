const {YoutubeAPI_Key, CLIENT_ID, CLIENT_SECRET, REDIRECT_URL} = require ('../config/youtube');
//get Node.js client library for using Google APIs
const {google} = require('googleapis');

const searchYouTube = async (query) => {
  
    const youtube = google.youtube({
      version: 'v3',
      auth: YoutubeAPI_Key,
    });

    const params = {
      part: 'snippet',
      maxResults: 5,
      order: 'viewCount',
      q: query,
      chart: 'mostPopular',
      type: 'video',
      key: YoutubeAPI_Key,
    };
    try {
      const response = await youtube.search.list(params);
  
      if (response.status === 500 || response.status === 404) {
        response = 'No videos!';
        console.log('res in searchYouTube: ', response)
      } else {
        // console.log('res in searchYouTube: ', response.data.items[0]);
        return response.data.items[0];
      } 
    } catch (e) {
      console.log(e); 
    }
}

module.exports = searchYouTube;


