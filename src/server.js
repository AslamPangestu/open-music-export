require('dotenv').config();

const MessageBroker = require('./core/MessageBroker');
const Mail = require('./core/Mail');

const PlaylistModule = require('./modules/playlist');

const init = async () => {
  const mail = new Mail();

  const mq = new MessageBroker();
  await mq.init();
  mq.listenMessage('export:playlist', PlaylistModule(mail));
};

init();
