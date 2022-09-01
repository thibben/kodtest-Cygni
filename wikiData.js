const config = require('../config');
const axios = require('axios');
const parser = require('./parsers');

/*Retrieves data from wikidata*/
const getWikiDataByID = async (wikiDataID) => {
    let res;
    try{
        res = await axios.get(config.wikiDataUrl(wikiDataID));
    }catch(err){
        throw err;
    }
    return res.data;
}

/*Retrieves wikipedia title from wikidata and returns it*/
const getWikpediaTitle = async (wikidataID) => {
    let data;
    try{
         data = await getWikiDataByID(wikidataID);
    }catch(err){
        throw err;
    }
    const wikipediaTitle = encodeURI(data.entities[wikidataID].sitelinks.enwiki.title);
    return wikipediaTitle;
}

/*Retrieves the JSON data from musicbrainz*/
const getURLbyID = async (artistID) => {
    let res;
    try {
        res = await axios.get(config.musicBUrl(artistID));
    } catch (err) {
        throw err;
    }
    return res.data
}

//returns the response data from Musicbrainz
const getWikiData = async (mbid) => {
    let data;
    try {
        data = await getURLbyID(mbid);    
    } catch (err) {
        throw err;
    }
    const wikipediaOrWikidata = parser.findWikiData(data);  
    return wikipediaOrWikidata;
}

module.exports = {
    getWikpediaTitle,
    getWikiData
}