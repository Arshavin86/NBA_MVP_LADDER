const youtube = require ('../helpers/youtube_api');
const searchYouTubeForGames = youtube.searchYouTubeForGames;
const searchYouTubeForPlayer = youtube.searchYouTubeForPlayer;

exports.getGameVideos = async (req, res) => {
    const query = req.params.query.slice(0, -10);
  
    //get finish date for search
    const dateFinish = req.params.query.slice(-10);
    let dFN = new Date(dateFinish);
    dFN.setDate(dFN.getDate() + 1)
  
    //get start date for search
    let dateStart = new Date(dateFinish);
    dateStart.setDate(dateStart.getDate() - 1);
    const dST = new Date(dateStart);
    
  
    //convert both dates to ISO format
    const StartISO = dST.toISOString();
    const FinishISO = dFN.toISOString();
  
    // console.log('query on BE: ', query );
    console.log('dates on BE: ', StartISO, FinishISO);
  
      try {
        const response = await searchYouTubeForGames (query, StartISO, FinishISO);
        // console.log('Youtube data on BE:', response);
        res.status(200).send(response);
      } catch (e) {
        console.log(e);
      }
  }

  exports.getPlayerVideos = async (req, res) => {
    const query = req.params.query;
  
      try {
        const response = await searchYouTubeForPlayer (query);
        console.log('Youtube data on BE:', response);
        res.status(200).send(response);
      } catch (e) {
        console.log(e);
      }
  }