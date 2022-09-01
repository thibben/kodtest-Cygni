/*Urls to the used APIs*/

const musicBAlbumsUrl = (artistID) => 
`http://musicbrainz.org/ws/2/release-group?artist=${artistID}&type=album&fmt=json`

const wikiDataUrl = (wikiDataID) => 
`https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${wikiDataID}&format=json&props=sitelinks&sitefilter=enwiki`

const musicBUrl = (artistID) =>
`http://musicbrainz.org/ws/2/artist/${artistID}?&fmt=json&inc=url-rels`

const wikipediaUrl = (title) => 
    `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&redirects=true&titles=${title}`


const coverArtUrl = (id) => `http://coverartarchive.org/release-group/${id}`


module.exports = {
    musicBAlbumsUrl,
    wikiDataUrl,
    musicBUrl,
    wikipediaUrl,
    coverArtUrl
}