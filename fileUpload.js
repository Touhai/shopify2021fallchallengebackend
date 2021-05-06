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

function upload (fileName){
    let uploadParams = {Bucket: BUCKET_NAME, Key:'',Body:''};
    let fileStream = fs.createReadStream(fileName);
    fileStream.on('error', function(err){
        console.log("File error", err);
    });
    uploadParams.Body = fileStream;
    uploadParams.Key = path.basename(fileName);


    s3.upload(uploadParams, function(err,data){
        if (err){
            console.log("error", err);
        } else if (data){
            console.log("Uploaded to", data.Location)
        }
    })
}


// Debug statements to see if I can auth to S3.
s3.listBuckets(function(err,data){
    if(err){
        console.log("error",err);
    }else{
        console.log("nice",data.Buckets);
    }
});

//Uploads the file
//  upload(file);

