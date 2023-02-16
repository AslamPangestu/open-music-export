const amqp = require('amqplib');

const Config = require('./Config');

class MessageBroker {
  constructor() {
    this._connection = null;
    this._channels = null;
  }

  async init(){
    this._connection = await amqp.connect(Config.mq.RABBITMQ_SERVER);
    this._channels = await this._connection.createChannel();
  }

  async listenMessage(queue, listener) {
    await this._channels.assertQueue(queue, {
      durable: true,
    });

    this._channels.consume(queue, listener.listen, { noAck: true });
  }
}

module.exports = MessageBroker;