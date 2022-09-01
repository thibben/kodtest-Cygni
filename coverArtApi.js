const config = require('../config');
const axios = require('axios');
const parseUrl = require('./parsers');


/* Retrieves a link to the cover art(front) for a specific album and appends it to the album entry*/
const getCoverArtUrl = async (album) => {
    let returnAlbum = album;
    let res;
    try {
        res = await axios.get(config.coverArtUrl(album.id));    
    } catch (err) {
        /*Maybe not the prettiest way to handle this but I unfortunately did not have time
        to implement anything better*/
        returnAlbum.image = "NOT AWAILABLE"; 
        return returnAlbum;
    }
    const url = parseUrl.findCoverArtUrl(res.data.images);
    returnAlbum.image = url;
    return returnAlbum;
}

/* Retrieves cover art for all albums in the album list*/
const getCoverArt = async (albums) => {
    const albumsPromiseList = albums.map(a => getCoverArtUrl(a)); //Group all promises together in a list
    let ret;
    try {
        ret = Promise.all(albumsPromiseList); //make the calls asynchronously    
    } catch (err) {
        throw err;
    }
    return ret;
}

module.exports = {
    getCoverArt
}