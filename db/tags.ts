/// <reference path="../typings/tsd.d.ts" />
"use strict";

import { knex } from '../config';

export interface Tag {
  id: number;
  name: string;
}

const getAllTags = () => {
  return knex('tags').select('*').then((results: Tag[]) => {
    return results;
  });
};

export default {
  getAllTags
}
