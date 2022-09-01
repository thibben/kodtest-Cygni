const config = require('../config');
const axios = require('axios');
const parser  = require('./parsers');

/*Retrieves data from wikipedia api with the defined title */
const getWikipediaDataByID = async (title) => {
    let res;
    try {
        res = await axios.get(config.wikipediaUrl(title));    
    } catch (err) {
        throw err;
    }
    return res.data;
}
/*Retrieves data from wikipedia and uses a parser to retrieve description
only */
const getWikipediaDes = async (wikipediaTitle) => {
    let data;
    try {
        data = await getWikipediaDataByID(wikipediaTitle);    
    } catch (err) {
        throw err;
    }
    const description = parser.parseWikipediaData(data);
    return description;
}



module.exports = {
    getWikipediaDes
}