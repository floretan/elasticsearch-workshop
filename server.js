'use strict';

let express = require('express');
let app = express();

const elasticsearch = require('elasticsearch');
let esclient = new elasticsearch.Client({host: 'localhost:9200'});
let url = require('url');


/**
 * The endpoint that will deliver search results.
 */
app.get('/api/search', function (req, res) {

  // Get query parameters
  let url_parts = url.parse(req.url, true);
  let query = url_parts.query;

  // If no query was specified, return nothing.
  if (!query.input) {
    res.json({
      total: 0,
      hits: [],
    });
    return;
  }

  // TODO: improve this query.
  let searchQuery = {
    index: 'openrecipes',
    body: {
      query: {
        match: {
          '_all': {
            query: query.input,
          }
        }
      },
      // TODO: add aggregations.
    }
  };

  if (query.ingredients) {
    if (typeof query.ingredients == 'string') {
      query.ingredients = [query.ingredients];
    }

    // TODO: add the ingredients from the request to filter the query.
  }

  if (query.sources) {
    if (typeof query.sources == 'string') {
      query.sources = [query.sources];
    }

    // TODO: add the sources from the request to filter the query.
  }

  // Add paging information to the query.
  searchQuery.from = query.from || 0;

  esclient.search(searchQuery).then(function(result) {
    res.json({
      total: result.hits.total,
      hits: result.hits.hits.map((hit) => hit._source),
      sourceFacet: [{key: 'bacon', doc_count: 10000}], // TODO get this data from an aggregation.
      ingredientsFacet: [{key: 'tastykitchen', doc_count: 10000}], // TODO get this data from an aggregation.
    });
  }).catch(console.log)
});


/**
 * The endpoint that will deliver search suggestions.
 */
app.get('/api/suggest', function (req, res) {

  // Get query parameters
  let url_parts = url.parse(req.url, true);
  let query = url_parts.query;

  // If no query was specified, return nothing.
  if (!query.input) {
    res.json([]);
    return;
  }

  // TODO: Build this query.
  // let searchQuery = {
  //   index: 'openrecipes',
  //   size: 0,
  //   body: {...}
  // };

  // TODO: remove this stub.
  res.json([
    {label: 'Bacon'},
    {label: 'More bacon'},
  ]);

  // TODO: uncomment the lines below to execute the query and return the results.
  // esclient.search(searchQuery).then(function(result) {
  //   res.json(result.aggregations.ingredients.buckets.map((bucket) => ({label: bucket.key})));
  // }).catch(console.log)
});

app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(express.static('node_modules/angular'));
app.use(express.static('node_modules/angular-aria'));
app.use(express.static('node_modules/angular-animate'));
app.use(express.static('node_modules/angular-material'));
app.use(express.static('node_modules/angular-messages'));
app.use(express.static('node_modules/angular-resource'));


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

