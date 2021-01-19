module.exports = (connection, DataTypes) => {
    const schema = {
        name: DataTypes.STRING,
        year: DataTypes.INTEGER(4),
    };

    const AlbumModel = connection.define('Album', schema);
    return AlbumModel;
};