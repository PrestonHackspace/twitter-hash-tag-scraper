twitter-hash-tag-scraper
==============

This is simple project to stream twitter data from certain tags to a database and then allows the database to be queried remotely to get the count of various tags

This is part of system which will allow twitter voting results to be displayed on an internet connected device, such as the ESP8266

More info and links to come as the other parts are built.

## The Twitter Client

The Twitter client part retrieves a list of tags that it should be monitoring from the tags table and then opens a stream from twitter to be sent messages that contain those tags.

It then saves those tweets to the tweets table.

An example of the tweet structure can be found in the db dump in db/schema.sql

## The Twitter Results Server

The server acts to enable querying the results of a twitter voting really easily over HTTP:

A request is made to .../tags/count with `tag_name` URL parameters for each tag that results are needed for.

Example:

```
    # request to: .../tags/count?tag_name=php&tag_name=javascript
    results:
    [
    {
        tag_name: "javascript",
        count: 52
    }
    {
        tag_name: "php",
        count: 451
    }
    ]

```
