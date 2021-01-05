const express = require('express')

const app = express()

const { createArtist, 
        listArtists,
        getArtistById,
        updateArtist,
        removeArtist
    } = require('./controllers/artists');

const {  createAlbum,
         listAlbums,
         getAlbumById,
         updateAlbum,
         removeAlbum
    } = require('./controllers/albums');

app.use(express.json())

// app.get('/', (req, res) => {
//     res.send('Hello World')
// });

app.post('/artists', createArtist);

app.get('/artists', listArtists);

app.get('/artists/:id', getArtistById);

app.patch('/artists/:id', updateArtist);

app.delete('/artists/:id', removeArtist);

//albums

app.post('/artists/:artistId/albums', createAlbum);

app.get('/albums', listAlbums);

app.get('/albums/:id', getAlbumById);

app.patch('/albums/:id', updateAlbum);

app.delete('/albums/:id', removeAlbum);

module.exports = app