"use strict";

var fs = require('fs');

var ImageTracer = require("imagetracerjs");
console.log(ImageTracer)
// This example uses https://github.com/arian/pngjs
// , but other libraries can be used to load an image file to an ImageData object.
var PNGReader = require( __dirname + '/PNGReader' );

fs.readFile(__dirname + 'public/uploads/file-1511345393078.jpg', // Input file path

    function( err, bytes ){
        if(err){ throw err; }

        var reader = new PNGReader(bytes);

        reader.parse( function( err, png ){
            if(err){ throw err; }

            // creating an ImageData object
            var myImageData = { width:png.width, height:png.height, data:png.pixels };

            // tracing to SVG string
            var options = { ltres:0.1 }; // optional
            var svgstring = ImageTracer.imagedataToSVG( myImageData, options );

            // writing to file
            fs.writeFile(
                __dirname + '/test.svg', // Output file path
                svgstring,
                function(err){ if(err){ throw err; } console.log( __dirname + '/test.svg was saved!' ); }
            );

        });// End of reader.parse()

    }// End of readFile callback()

);// End of fs.readFile()