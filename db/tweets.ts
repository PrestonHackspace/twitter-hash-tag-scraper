/// <reference path="../typings/tsd.d.ts" />
"use strict";

import { knex } from '../config';

export interface Tweet {
  id?: number;
  tag_id: number;
  tweet: string;
  tweet_timestamp: string;
}

const insert = (tweet: Tweet) => {
  return knex('tweets').returning('id').insert(tweet).then(result => {
    const id = parseInt(result[0]);
    tweet.id = id;
    return tweet;
  });
};

export default {
  insert
}