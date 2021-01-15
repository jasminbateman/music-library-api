const { Artist } = require('../models');
const { Album } = require('../models');
const { Song } = require('../models');
const album = require('../models/album');
const artist = require('../models/artist');

exports.createSong = (req, res) => {
    const { albumId } = req.params;
    Album.findByPk(albumId).then(album => {
      if (!album) {
        res.status(404).json({ error: 'The album could not be found.' });
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
            return res.status(404).json({ error: 'This album does not exist.' })
        } else {
            Song.findAll({ where: { albumId } })
            .then(songs => 
                
                { if(songs.length === 0) { 
                    res.status(200).json({ message: "There are no songs in this album" } )}
                else {
                    res.status(200).json(songs)
                }
                })

        }
    });
};