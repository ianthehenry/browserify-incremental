var browserifyIncremental = require('../');
var fs = require('fs');

var counter = 10;
var testTimeout = 1000;

var b = browserifyIncremental()
b.on('log', function(msg){ console.log(msg) })
b.add(__dirname + '/test-module')

run() // start test

function run() {
  b.bundle()
    .on('end', next)
    .on('update', function(updated) { console.log(updated) })
    .pipe(fs.createWriteStream(__dirname + '/output/bundle.js'))
}

function next() {
  if (counter-- > 0) setTimeout(run, testTimeout)
  else console.log('done')
}
