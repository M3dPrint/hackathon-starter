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
// exports.post('/', function (req, res) {
//     var tempPath = req.files.file.path,
//         targetPath = path.resolve('./uploads/image.png');
//     if (path.extname(req.files.file.name).toLowerCase() === '.png') {
//         fs.rename(tempPath, targetPath, function(err) {
//             if (err) throw err;
//             console.log("Upload completed!");
//         });
//     } else {
//         fs.unlink(tempPath, function () {
//             if (err) throw err;
//             console.error("Only .png files are allowed!");
//         });
//     }
//     // ...
// });
//
// exports.get('/image.png', function (req, res) {
//     res.sendfile(path.resolve('./uploads/image.png'));
// });