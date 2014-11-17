/**
 * Created by rbailey on 15/07/14.
 *
 * Shows how to stream XML into node in a SAX kind of event driven way.
 * This allows very large files to be processed (as entire XML not read into RAM)
 * and is also Node Event Loop friendly, in that event based for each read.
 *
 * Specify your file in the last line of code below.
 */
var fs = require('fs');
var sax = require('sax');

var saxStream = sax.createStream();
var learnerCount = 0;

saxStream.onopentag = function (node) {
    //console.log(node.name);
    if (node.name === 'LEARNER') {
        console.log(node);
        learnerCount++;
    }
};

saxStream.on("end", function() {
    console.log('Stream processed: ' + learnerCount + ' learners found');
    console.log('Done');
});

fs.createReadStream('xml/SampleXmlToParse.xml').pipe(saxStream);

