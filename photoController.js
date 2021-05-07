// API Backend for photocontroller

const PhotoModel = require('./dataModel');


exports.index = function (req, res) {
    res.json({
        message: "Main API test lol XD"
    });
}

exports.postPhoto = function (req, res) {

    // Creates a document that 
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
            data:data,
        })
    }).catch((err) => {
        res.json({
            error: err,
        })
    })

}

exports.handleFileUpload = function (req,res){
    console.log(req.file);
    res.send("Single fild upload success");
}