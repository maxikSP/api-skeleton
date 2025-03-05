const path = require('path');
const dotenv = require('dotenv-flow');
const { DataSource } = require('typeorm');

dotenv.config({
  path: path.resolve('.', 'config/'),
  default_node_env: 'local',
});

module.exports = [
  new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    url: process.env.TYPEORM_URL,
    logging: process.env.TYPEORM_LOGGING,
    entities: [process.env.TYPEORM_ENTITIES],
    migrations: [process.env.TYPEORM_MIGRATIONS],
    subscribers: [process.env.TYPEORM_SUBSCRIBERS],
  }),
];
