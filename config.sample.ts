/// <reference path="./typings/tsd.d.ts" />
"use strict";

import knexLib = require('knex');

const knex = knexLib({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    database: 'twitter-hash-tag-scrapper'
  },
  migrations: {
    tableName: 'migrations'
  }
});

const twitterCredentials = {
  consumer_key: 'xxxx',
  consumer_secret: 'xxxx',
  access_token_key: 'xxxx',
  access_token_secret: 'xxxx'
};

export {
knex,
twitterCredentials
}
