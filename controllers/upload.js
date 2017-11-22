
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+'.jpg')
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

            console.log(" everything is working");



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
