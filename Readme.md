This readme-file describes how to use the API.

1. Installation
2. Usage


1. Installation

Before first use some installation is required. First of all, Node package manager(npm) is required to install
packages.

in the current folder run the following lines in cmd to install express and axios:

npm i axios@0.26.1

npm i axpress@4.17.3

2. Usage
When the required packages are installed with npm the app/api can be started by running the following command in cmd:

npm run start

This will start the express app listening to either port 3000 or .env specified PORT. If you want to use another
port than 3000 please define the environment PORT or change the port number from 3000 in index.js.

After starting the app the API can be used. 

The app is listening on the defined port and answers to get-requests to the following address:

localhost:<Defined Port>/api/artist/info

The API expects a query named artistID and the following line is an example of how to get information:

localhost:<Defined Port>/api/artist/info?artistID=<MbID>

The MbID can be retreived from https://musicbrainz.org/ and the following example displays information for Frank Ocean:

localhost:<Defined Port>/api/artist/info?artistID=e520459c-dff4-491d-a6e4-c97be35e0044


