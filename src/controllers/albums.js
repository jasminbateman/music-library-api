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

exports.listAlbums = (_, res) => {
    Album.findAll({}).then(albums => res.status(200).json(albums))
};

exports.getAlbumById = (req, res) => {
    const { id } = req.params;
    Album.findByPk(id).then(album => {
      if (!album) {
        res.status(404).json({ error: 'The album could not be found.' });
      } else {
        res.status(200).json(album);
      }
    })
    .catch(err => console.log(err))
};

exports.updateAlbum = (req, res) => {
    const { id } = req.params;
    Album.update(req.body, { where: { id } }).then(([rowsUpdated]) => {
        if (!rowsUpdated) {
            res.status(404).json({ error: 'The album could not be found.' });
        } else {
            res.status(200).json(rowsUpdated);
        }
    })
    .catch(err => console.log(err))
};

exports.removeAlbum = (req, res) => {
    const { id } = req.params;
    Album.destroy({ where: { id } }).then(rowsDeleted => {
        if (!rowsDeleted) {
            res.status(404).json({ error: 'The album could not be found.' });
        } else {
            res.status(204).json(rowsDeleted);
        }
    })
    .catch(err => console.log(err))
};