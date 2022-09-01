/*This file contains the functions used for parsing and finding data in the JSON responses*/

/*this function first determines if theres a wikipedia link and returns the answer
with either wikidata or wikipedia*/
const findWikiData = (indata) => {
    const wikipedia = indata.relations.find(entry => entry.type === "wikipedia");
    if(wikipedia !== undefined){
        const url = wikipedia.url;
        const title = url.resource.split('/')[4]; 
        return {type : "wikipedia",
                data : title};
    }
    let wikiData = indata.relations.find(entry => entry.type === "wikidata").url;
    const id = wikiData.resource.split('/')[4];
    return {type: "wikidata",
            data: id};
}

/*This function returns the description only.*/ 
const parseWikipediaData = (data) => {
    const description = data.query.pages;
    const pageid = Object.keys(description)[0];
    let result  = description[pageid].extract;
    result = result.replace('\n',''); //Remove some characters to make the result look better
    result = result.substr(31,result.length); //Remove some characters to make the result look better
    return result;
}

/*Makes a list of the albums in data and returns it*/
const parseAlbums = (data) => {
    var albums = [];
    releseG = data["release-groups"];
    for(i=0; i < releseG.length; i++){
        albums.push({title: releseG[i].title, id : releseG[i].id, image : ""});
    }
    return albums;
}

/* Locates the url to the front of the cover art and returns it*/
const findCoverArtUrl = (data) => {
    const url = data.find(entry => entry.front === true).image;
    return url;
}



module.exports = {
    findWikiData,
    parseWikipediaData,
    parseAlbums,
    findCoverArtUrl
}