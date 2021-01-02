const express = require('express')

const app = express()

const { createArtist, 
        listArtists,
        getArtistById
    } = require('./controllers/artists');

app.use(express.json())

// app.get('/', (req, res) => {
//     res.send('Hello World')
// });

app.post('/artists', createArtist);

app.get('/artists', listArtists);

app.get('/artists/:id', getArtistById);

module.exports = app