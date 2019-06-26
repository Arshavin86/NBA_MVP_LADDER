const request = require('request-promise');
const URL = `https://nba-players.herokuapp.com`;

const getImages = async (firstName, lastName) => {
    const options = {
        url: `${URL}/players/${lastName}/${firstName}`,
        // encoding: null,
        // resolveWithFullResponse: true,
        headers: {
            "content-type": "image/png"
        },
        // json: true,
    };
    return await request(options);
};

module.exports = getImages;