// API Backend for photocontroller

const PhotoModel = require('./dataModel');
const fileUpload = require('./fileUpload');
const fsExtra = require('fs-extra');


exports.index = function (req, res) {
    res.json({
        message: "Main API test lol XD"
    });
}

exports.postPhoto = function (req, res) {

    // Creates a document that creates metadata for the file.
    const doc = new PhotoModel({
        title: req.params.title,
        fileName: req.params.fileName,
        filePath: req.params.filePath,
        visible: req.params.visible
    })

    doc.save().then((data) => {
        res.json({
            message: "Image uploaded!",
            url: "your link to the image",
            data: data,
        })
    }).catch((err) => {
        res.json({
            error: err,
        })
    })

}

exports.handleFileUpload = function (req, res) {
    console.log(req.file);
    try {
        fileUpload.validate(req.file.path)
        fileUpload.upload(req.file.path).then((imageURL) => {
            console.log(imageURL);
            res.status(200).send({
                image: imageURL,
            });
        }).catch((e) => {
            res.status(400).send({
                error: e,
            });
        });
    } catch (e) {
        res.status(400).send({
            error: e,
        })
    } finally {
        //clean up the cache folder
        fsExtra.emptyDirSync('./images')
    }
}