#!/usr/bin/env node

/*
 * Module dependencies.
 */

var fs = require('fs');
var path = require('path');
var program = require('commander');
var web2splash = require('./../lib/web2splash');

/*
 * Load package.json
 */

var packageJSON = JSON.parse(fs.readFileSync(path.join(__dirname,'..','package.json'), 'utf8'));

/*
 * Command-line usage
 */

program
    .version(packageJSON.version)
    .usage('[options] <html uri> [output dir]');

/*
 * Command-line help
 */

program.on('--help', function(){
    console.log('  Examples:');
    console.log('');
    console.log('    $', program.name, 'http://example.com/');
    console.log('    $', program.name, '/path/to/splash.html');
    console.log('    $', program.name, '/path/to/splash.html /path/to/output/');
    console.log('');
});

/*
 * Parse the command-line
 */

program.parse(process.argv);
program.input = program.args[0];
program.output = program.args[1] || './';

if (!program.input) {
    program.outputHelp();
    process.exit();
}

/*
 * Render an HTML document to a set of splash screen images
 */

web2splash.onRenderImage = function(image) {
    console.log('  rendered: %s (%d x %dpx)', image.name, image.width, image.height);
};

web2splash.render(program.input, program.output, function(e, images) {
    process.exit();
});
