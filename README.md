
# Elasticsearch Workshop

This is a basic setup for our ElasticSearch workshop. It includes some sample data to be used for our workshop.

# Prerequisites
- node.js should be installed (tested with v5.10.1)
- java 8 should be installed
- run setup.sh, which will download elasticsearch, kibana and the datasets

# Up and running

## Elasticsearch
To run elasticsearch, run `./elasticsearch/bin/elasticsearch`. Elasticsearch will then be reachable under `localhost:9200`

## Kibana
To run kibana, run elasticsearch then `./kibana/bin/kibana`. Kibana will then be reachable under `localhost:5601`

## Importing data
Run the importer with `node cli.js index -d openrecipes datasets/recipeitems-latest.json`

## Running the app
Run `node server.js` and open `http://localhost:3000` in a browser.
