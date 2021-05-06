//Manages the file upload to S3

const fs = require('fs');
const AWS = require('aws-sdk');
const path = require('path');
require('dotenv').config();

const BUCKET_NAME = "bryan-shopify-challenge-2021";

AWS.config.update({region: 'us-east-1'});

//Creates an S3 bucket
const s3 = new AWS.S3();

// const file = "InsertFileNameHere"

exports.validate = function(filePath){

    const allowedExtensions = ['jpg','png','jpeg'];
    const sizeLimit = 10000000;
    const stats = fs.statSync(filePath);
    const fileExtension = filePath.split(".").pop();
    return allowedExtensions.includes(fileExtension) && stats.size <= sizeLimit;
}   


/*
    @param {String} filePath    Path to the file
    @return {Promise<String>}   If file is uploaded
*/
exports.upload = function (filePath){
    let uploadParams = {Bucket: BUCKET_NAME, Key:'',Body:''};
    let fileStream = fs.createReadStream(filePath);
    fileStream.on('error', function(err){
        console.log("File error", err);
    });
    uploadParams.Body = fileStream;
    uploadParams.Key = path.basename(filePath);

    return new Promise((resolve,reject) =>{
        s3.upload(uploadParams, function(err,data){
            if (err){
                console.log("error", err);
                reject(err);
            } else if (data){
                console.log("Uploaded to", data.Location)
                resolve("Uploaded")
            }
        })
    })
 
}


