const { Artist } = require('../models');
const { Album } = require('../models');

exports.createAlbum = (req, res) => {
    const { artistId } = req.params;
    Artist.findByPk(artistId).then(artist => {
      if (!artist) {
        res.status(404).json({ error: 'The artist could not be found.' });
      } else {
        const albumInfo = {
            name: req.body.name,
            year: req.body.year,
            artistId: artist.id,
        };
        Album.create(albumInfo).then(album => {
            res.status(201).json(album);
        })
      };
    })
    .catch(err => console.log(err))
};