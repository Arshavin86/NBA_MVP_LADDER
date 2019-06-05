const $ = require('jquery');

const searchYouTube = async options => {
    try {
        const response = await $.ajax({
            url: 'https://www.googleapis.com/youtube/v3/search',
            data: {
              part: 'snippet',
              q: options.query,
              maxResults: options.max,
              key: options.key.YoutubeAPI_Key,
              type: 'video'
            },
            contentType: 'application/json'
        });
        if (response.status === 500 || response.status === 404) {
          response = 'No videos!';
        } else {
          console.log('res', response)
        }
        return response;
    } catch (e) {
    console.log(e);
    }
  };
  
  export default searchYouTube;