module.exports = (connection, DataTypes) => {
    const schema = {
        artistName: DataTypes.STRING,
        name: DataTypes.STRING,
        year: DataTypes.INTEGER(4),
    };

    const AlbumModel = connection.define('Album', schema);
    return AlbumModel;
};