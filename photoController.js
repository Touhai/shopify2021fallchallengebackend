// API Backend for photocontroller

const PhotoModel = require('./dataModel');
const fileUpload = require('./fileUpload');
const fsExtra = require('fs-extra');


exports.getPhoto = function (req, res) {
    const field = "path";
    const query = {_id: req.params.id};

    PhotoModel.find(query,field,function(err,data){
        if(err){
            res.status(400).send({
                error:err
            });
        }else{
            res.status(200).send(data[0].path);
        }
    })
 
}

exports.handleFileUpload = function (req, res) {
    console.log(req.file);
    try {
        fileUpload.validate(req.file.path)
        fileUpload.upload(req.file.path).then((imageURL) => {
            const doc = new PhotoModel({
                path: imageURL,
            })

            doc.save().then((data) => {
                res.status(200).send({
                    data: data,
                });
            }).catch((e) => {
                res.status(400).send({
                    error: e
                })
            })
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
        //  fsExtra.emptyDirSync('./images')
    }
}