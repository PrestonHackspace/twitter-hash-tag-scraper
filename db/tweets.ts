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

const getCountByTagId = (tagId: number) => {
  return knex('tweets').where({ tag_id: tagId }).count().then((results: { count: number }[]) => {
    return results[0].count;
  });
};

const getCountByTagNames = (tagNames: string[]) => {
  return knex('tweets')
    .innerJoin('tags', 'tweets.tag_id', 'tags.id')
    .whereIn('tags.name', tagNames)
    .select('tags.name')
    .groupBy('tweets.tag_id')
    .groupBy('tags.name')
    .count()
    .then((results: { name: string, count: number }[]) => {
      return results;
    });
};

const clear = () => {
  return knex('tweets').delete();
};

export default {
  insert,
  getCountByTagId,
  getCountByTagNames,
  clear
}