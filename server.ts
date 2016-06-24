/// <reference path="./typings/tsd.d.ts" />
"use strict";

import express = require('express');
import tweetsDb from './db/tweets';
import tagsDb from './db/tags';

const app = express();

app.get('/tags/:tag_id/count', (req, res) => {
  const tagId = parseInt(req.params.tag_id);

  tweetsDb.getCountByTagId(tagId).then(count => {
    res.send(count);
  });
});

app.get('/tags/count', (req, res) => {
  const tagNames: string[] = req.query.tag_name

  tweetsDb.getCountByTagNames(tagNames).then(results => {
    res.send(results);
  });
});

app.get('/clear', (req, res) => {
  tweetsDb.clear().then(results => {
    res.send('Tweets cleared');
  });
});

app.get('/score.txt', (req, res) => {
  tagsDb.getAllTags().then(tags => {
    tweetsDb.getCountByTagNames(tags.map(tag => tag.name)).then(results => {
      res.send(results.map(r => r.count).join(':'));
      // res.send([1, 2].join(':'));
    });
  });
});

app.listen(8084, () => {
  console.log('Example app listening on port 8084!');
});
