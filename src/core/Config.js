module.exports = {
    mail: {
      HOST: process.env.MAIL_HOST,
      PORT: process.env.MAIL_PORT,
      ADDRESS: process.env.MAIL_ADDRESS,
      PASSWORD: process.env.MAIL_PASSWORD,
    },
    mq: {
      RABBITMQ_SERVER: process.env.RABBITMQ_SERVER,
    },
  };
  