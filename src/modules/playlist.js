const Listener = require('../listeners/PlaylistListener');
const Service = require('../services/PlaylistService');
const Repository = require('../repositories/PlaylistRepository');

const PlaylistModule = (mail) => {
  const repository = new Repository();
  const service = new Service(repository);
  return new Listener(service,mail)
};

module.exports = PlaylistModule;
