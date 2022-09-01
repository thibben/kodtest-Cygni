const express = require('express');
const musicB = require('../src/musicB');
const wikipedia = require('../src/wikipediaData');
const wikidata = require('../src/wikiData');
const coverart = require('../src/coverArtApi');

/*start point of the request that gets description and albums */
const getArtistDetails = async(req, res) => {
    if(!req.query.artistID){
        return res.status(404).json({error: "Missing artistID"});
    }
    const mbib  = req.query.artistID;
    const albums =  getAlbums(mbib);
    const description = getDescription(mbib);
    let answers;
    try{
        answers = await Promise.all([description,albums]);
    }catch(err){
        /*Not that descriptive but I don't want to include/inform the user of what actually went wrong
        in the code. */
        console.log(err);
        return res.status(500).json({Error: 'Could not retreive data'}); 
    } 
    let result = {
        mbid : req.query.artistID,
        description : answers[0],
        albums : answers[1]
    };
    return res.status(200).json(result);
} 

/* Retrieves albums then the coverart for them. Returns list of album entries*/
const getAlbums = async (mbid) => {
    let albums, albumsWcoverart;
    try{
         albums = await musicB.getAlbums(mbid);
         albumsWcoverart = await coverart.getCoverArt(albums);
    }catch(err){
        throw err;
    }
    return albumsWcoverart;
}

/*Retrieves and returns the description, either directly from wikipedia if link exists or through wikidata*/
const getDescription = async (mbib) => {
    let wikidataID,wikipediaTitle,description;
    try {
        wikidataID = await wikidata.getWikiData(mbib);
        if(wikidataID.type === "wikipedia"){
            description = await wikipedia.getWikipediaDes(encodeURI(wikidataID.data));
        }else{
            wikipediaTitle = await wikidata.getWikpediaTitle(wikidataID.data);
            description = await wikipedia.getWikipediaDes(wikipediaTitle);
        }   
    } catch (err) {
        throw err;
    }
    return description;
}

/*Create a specific route for artist info*/
const router = express.Router();

router.get('/info', getArtistDetails);

module.exports.router = router;