'use strict'

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { default: axios } = require('axios');
const server = express();

const PORT = process.env.PORT;

server.use(cors());

server.get('/', homeRoute);
server.get('/getLocation', getLocation);
server.get('*', notFound);

function homeRoute(req, res) {
    res.send('Working..')
}


async function getLocation(req, res) {
    // res.send('Location..')
    let searchQuery = req.query.q;
    let locationURL = `https://eu1.locationiq.com/v1/search.php?key=${process.env.LOCATIONIQ_KEY}&q=${searchQuery}&format=json`
    console.log(locationURL);
    let result = await axios.get(locationURL);
    let resultArr = result.data.map(attr => {
        return new City(attr)
    })
    res.send(resultArr);
}

function notFound(req, res) {
    res.send('404 (Page not found)')
}

class City{
    constructor(selectedAttr) {
        this.display_name = selectedAttr.display_name;
        this.type = selectedAttr.type;
        this.lat = selectedAttr.lat;
        this.lon = selectedAttr.lon;
    }
}

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})