"use strict";
var fs = require('fs');
var ImageTracer = require("imagetracerjs");
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+'.png')
    }
});
// console.log(Date.now());
var upload = multer({ storage: storage }).array('file');

exports.upload = (req, res) => {
 upload(req, res,function (err) {
        // console.log();
        // console.log(req.files[0].filename);
        if (err) {
            // An error occurred when uploading
            return res.json({
                err: err

            })
        }else{

            return res.json({file:req.files[0].filename})
             console.log(" everything is working")


        }
 });
}



exports.uploadFinal = (req, res) => {

    // console.log()

    upload(req, res, function (err) {
        // console.log(arguments);
        console.log(req.files, req.body)
        // console.log(file);
        if (false) {
            // An error occurred when uploading
            return res.json({
                err: err
            })
            console.log("upload final working");
        }
        else {
            // return res.json({file: ""})

            var PNGReader = require('../node_modules/imagetracerjs/nodetest/PNGReader');
            fs.readFile(require("path").join(__dirname,"/../public/uploads/"+ req.files[0].filename), // Input file path
                function (err, bytes) {
                    if (err) {
                        throw err;
                    }

                    var reader = new PNGReader(bytes);
                    reader.parse(function (err, png) {
                        if (err) {
                            throw err;
                        }
                        // creating an ImageData object
                        var myImageData = {width: png.width, height: png.height, data: png.pixels};
                        // tracing to SVG string
                        var options = {ltres: 0.1}; // optional
                        var svgstring = ImageTracer.imagedataToSVG(myImageData, options);
                        // writing to file
                        fs.writeFile(
                            './public/downloads' + '/test1.svg', // Output file path
                            svgstring,
                            function (err) {
                                if (err) {
                                    throw err;
                                }
                                console.log('public/downloads' + '/test1.svg was saved!');
                            }
                        );
                    });// End of reader.parse()
                }// End of readFile callback()
            );// End of fs.readFile()
        }
    });
}


























//
// const bodyParser = require("body-parser");
//
// // exports.index = (req, res) => {
// //     res.render('upload', {
// //         title: 'Customize your phone cases'
// //     });
// // };
//
//
// var path = require('path'),
//     fs = require('fs');
// // ...
// exports.post = function (req, res) {
//     var tempPath = req.files.file.path;
//         // targetPath = path.resolve('./uploads/image.png');
//     if (path.extname(req.files.file.name).toLowerCase() === '.png') {
//         fs.rename(tempPath, targetPath, function (err) {
//             if (err) throw err;
//             console.log("Upload completed!");
//         });
//     } else {
//         fs.unlink(tempPath, function () {
//             if (err) throw err;
//             console.error("Only .png files are allowed!");
//         });
//     }
// }
//
//
// exports.upload = function (req, res) {
//     res.sendfile(path.resolve('./uploads/image.png'));
// }
//
//
