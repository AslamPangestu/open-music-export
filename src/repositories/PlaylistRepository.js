const { Pool } = require('pg');

const TABLE_NAME = 'playlists_songs';

class PlaylistRepository {
  constructor() {
    this._db = new Pool();
  }

  async findByPlaylistId(playlistId, userId) {
    const query = {
      text: `SELECT playlists.id AS playlist_id, playlists.name AS playlist_name, 
      owner_user.id AS owner, collaboration_user.id AS user_id, 
      songs.id AS song_id, songs.title AS song_title, songs.performer AS song_performer 
      FROM ${TABLE_NAME} 
      INNER JOIN playlists ON ${TABLE_NAME}.playlist_id = playlists.id
      INNER JOIN songs ON ${TABLE_NAME}.song_id = songs.id
      LEFT JOIN collaborations ON playlists.id = collaborations.playlist_id 
      INNER JOIN users collaboration_user ON collaborations.user_id = collaboration_user.id 
      INNER JOIN users owner_user ON playlists.owner = owner_user.id
      WHERE playlists.id = $1`,
      values: [playlistId],
    };

    const result = await this._db.query(query);
    const index = result.rows.findIndex((item) => item.user_id === userId);
    const data = result.rows[index];

    const finalResult = {
      id: data.playlist_id,
      name: data.playlist_name,
      songs: data?.song_id ? result.rows.filter((item) => item.user_id === userId)
        .map((item) => ({
          id: item.song_id,
          title: item.song_title,
          performer: item.song_performer,
        })) : [],
    };

    return finalResult;
  }
}

module.exports = PlaylistRepository;
