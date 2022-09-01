const config = require('../config');
const parser = require('./parsers');
const axios = require('axios');
/*Retrieves albums data from musicbrainz*/
const getAlbumsByArtist = async (artistID) => {
    let res;
    try{
        res = await axios.get(config.musicBAlbumsUrl(artistID));
    }catch(err){
        throw err;
    }
    return res.data
}

/*returns the response data from Musicbrainz*/
const getAlbums = async (mbid) => {
    let data;
    try{
        data = await getAlbumsByArtist(mbid);
    }catch(err){
        throw err;
    }
    const albums = parser.parseAlbums(data);
    return albums;
}


module.exports = {
    getAlbums
}

