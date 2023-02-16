class PlaylistService {
  constructor({repository}) {
    this._repository = repository;
  }

  async export({ playlistId, userId }) {
    return this._repository.findByPlaylistId({ playlistId, userId });
  }
}

module.exports = PlaylistService;
