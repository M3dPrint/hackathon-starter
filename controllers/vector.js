
// console.log(ImageTracer)
// // This example uses https://github.com/arian/pngjs
// // , but other libraries can be used to load an image file to an ImageData object.
// var PNGReader = require( '../node_modules/imagetracerjs/nodetest/PNGReader' );
// // /home/mohammed/WebstormProjects/untitled1/mobile3d/hackathon-starter/node_modules/imagetracerjs/nodetest/PNGReader.js
//
// fs.readFile("./public/uploads/file-1511446858749.png", // Input file path
//
//     function( err, bytes ){
//         if(err){ throw err; }
//
//         var reader = new PNGReader(bytes);
//
//         reader.parse( function( err, png ){
//             if(err){ throw err; }
//
//             // creating an ImageData object
//             var myImageData = { width:png.width, height:png.height, data:png.pixels };
//
//             // tracing to SVG string
//             var options = { ltres:0.1 }; // optional
//             var svgstring = ImageTracer.imagedataToSVG( myImageData, options );
//
//             // writing to file
//             fs.writeFile(
//                 './public/downloads' + '/test1.svg', // Output file path
//                 svgstring,
//                 function(err){ if(err){ throw err; } console.log( 'public/downloads' + '/test1.svg was saved!' ); }
//             );
//
//         });// End of reader.parse()
//
//     }// End of readFile callback()
//
// );// End of fs.readFile()
