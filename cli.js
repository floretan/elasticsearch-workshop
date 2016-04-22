'use strict';

var program = require('commander');
const config = require('config');
const elasticsearch = require('elasticsearch');
let esclient = new elasticsearch.Client({host: 'localhost:9200'});

program
  .version('0.0.1')
  .usage('[command] dataset')

program
  .command('index [dataset] [filename]')
  .description('run setup commands for all envs')
  .option("-d, --delete", "Delete the index before importing data")
  .action(function(dataset, filename, options){

    let d = require('./src/import/' + dataset);

    esclient.indices.exists({
      index: d.indexName
    })
    .then((exists) => {
      if (exists && options.delete) {
        return esclient.indices.delete({
          index: d.indexName
        }).then((response) => {
          console.log('Index deleted');
        });
      }
      else {
        return;
      }
    }).then(() => {
      console.log('Setting up index');
      // Setup the elasticsearch index and mapping.
      d.setupIndex();
    }).then(() => {
      // Import the data.
      d.importData(filename);
    }).catch(console.log);
  });

program
  .command('exec <cmd>')
  .alias('ex')
  .description('execute the given remote cmd')
  .option("-e, --exec_mode <mode>", "Which exec mode to use")
  .action(function(cmd, options){
    console.log('exec "%s" using %s mode', cmd, options.exec_mode);
  })

program.parse(process.argv);

