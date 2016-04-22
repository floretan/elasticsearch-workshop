#!/bin/bash

wget https://download.elastic.co/elasticsearch/release/org/elasticsearch/distribution/tar/elasticsearch/2.3.1/elasticsearch-2.3.1.tar.gz
tar xf elasticsearch-2.3.1.tar.gz
rm elasticsearch-2.3.1.tar.gz
mv elasticsearch-2.3.1 elasticsearch

# Add the kopf plugin, which will be available under http://localhost:9200/_plugin/kopf/
./elasticsearch/bin/plugin install lmenezes/elasticsearch-kopf/2.0


# For other platforms, check out https://www.elastic.co/downloads/kibana
wget https://download.elastic.co/kibana/kibana/kibana-4.5.0-darwin-x64.tar.gz
tar xf kibana-4.5.0-darwin-x64.tar.gz
rm kibana-4.5.0-darwin-x64.tar.gz
mv kibana-4.5.0-darwin-x64 kibana

# Downloading datasets
mkdir datasets
wget http://world.openfoodfacts.org/data/en.openfoodfacts.org.products.csv
mv en.openfoodfacts.org.products.csv datasets/
wget http://openrecipes.s3.amazonaws.com/recipeitems-latest.json.gz
gunzip recipeitems-latest.json.gz
mv recipeitems-latest.json datasets/

# Get javascript dependencies.
npm install