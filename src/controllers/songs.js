const { Artist } = require('../models');
const { Album } = require('../models');
const { Song } = require('../models');
const album = require('../models/album');
const artist = require('../models/artist');

exports.createSong = (req, res) => {
    const { albumId } = req.params;
    Album.findByPk(albumId).then(album => {
      if (!album) {
        res.status(404).json({ error: 'This album does not exist.' });
      } else {
        const songInfo = {
            name: req.body.name,
            albumId: album.id,
            artistId: album.artistId,
        };
        Song.create(songInfo).then(song => {
            res.status(201).json(song);
        }).catch(err => console.log(err))
      };
    });
};

exports.listSongs = (_, res) => {
    Song.findAll({}).then(songs => res.status(200).json(songs))
};

exports.getSongsByAlbum = (req, res) => {
    const { albumId } = req.params;
    Album.findByPk(albumId).then(album => {
        if(!album) {
            res.status(404).json({ error: 'This album does not exist.' });
        } else {
            Song.findAll({ where: { albumId } })
            .then(songs => { 
                res.status(200).json(songs)
                })
        }
    });
};

exports.getSongsByArtist = (req, res) => {
    const { artistId } = req.params;
    Artist.findByPk(artistId).then(artist => {
        if(!artist) {
            res.status(404).json({ error: 'This artist does not exist.' });
        } else {
            Song.findAll({ where: { artistId }})
            .then(songs => {
                res.status(200).json(songs)
            })
        }
    });
};

exports.findSongById = (req, res) => {
    const { songId } = req.params;
    Song.findByPk(songId).then(song => {
        if(!song) {
            res.status(404).json({ error: 'The song could not be found.'});
        } else {
            res.status(200).json(song);
        }
    })
    .catch(err => console.log(err))
};

exports.updateSong = (req, res) => {
    const { songId } = req.params;
    Song.update(req.body, { where: { id: songId } }).then(([rowsUpdated]) => {
        if (!rowsUpdated) {
            res.status(404).json({ error: 'This song does not exist.' });
        } else {
            res.status(200).json(rowsUpdated);
        }
    })
    .catch(err => console.log(err))
};

exports.removeSong = (req, res) => {
    const { songId } = req.params;
    Song.destroy({ where: { id: songId } }).then(rowsDeleted => {
        if(!rowsDeleted) {
            res.status(404).json({ error: 'This song does not exist.'});
        } else {
            res.status(204).json(rowsDeleted);
        }
    })
    .catch(err => console.log(err))
};