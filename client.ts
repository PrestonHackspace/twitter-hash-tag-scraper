/// <reference path="./typings/tsd.d.ts" />
"use strict";

const Twitter = require('twitter');

import { twitterCredentials } from './config';
import tweetsDb from './db/tweets';
import { default as tagsDb, Tag } from './db/tags';

const client = new Twitter(twitterCredentials);

const startStream = (hashTag: Tag) => {
  client.stream('statuses/filter', { track: hashTag.name }, function (stream: any) {
    stream.on('data', function (tweet: any) {
      tweetsDb.insert({
        tag_id: hashTag.id,
        tweet: tweet.text,
        tweet_timestamp: new Date().toISOString()
      });
    });

    stream.on('error', function (error: any) {
      throw error;
    });
  });
};

tagsDb.getAllTags().then(tags => {
  tags.forEach(startStream);
});

