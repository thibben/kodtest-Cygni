const express = require('express');
const app = express();

/*Creates a router to be able to "re-route" incoming calls*/
const r1 = express.Router();

app.use('/api/',r1);

/*Specific route for artist*/
const artistRoute = require('./routes/artist');
r1.use('/artist', artistRoute.router);

/*Listen on defined port or 3000*/
app.listen(process.env.PORT || 3000);

