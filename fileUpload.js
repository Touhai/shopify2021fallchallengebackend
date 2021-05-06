//Manages the file upload to S3

const fs = require('fs');
const AWS = require('aws-sdk');
require('dotenv').config();

const BUCKET_NAME = "bryan-shopify-challenge-2021";
const IAM_USER_KEY = process.env.AWS_USERKEY;
const IAM_USER_SECRET = process.env.AWS_SECRET;

AWS.config.update({region: 'us-east-1'});

const s3 = new AWS.S3();



s3.listBuckets(function(err,data){
    if(err){
        console.log("error",err);
    }else{
        console.log("nice",data.Buckets);
    }
});




