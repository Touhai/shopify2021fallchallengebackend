let router = require('express').Router();
const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null, './images')
    },
    filename:(req,file,cb) =>{
        cb(null,file.originalname)
    }
})

const upload = multer({storage: fileStorageEngine})

router.get('/', function(req,res){
    res.json({
        message:"welcome to the API landing page, refer to github for more info."
    })
})


//Importing controller
const photoController = require('./photoController');

//Importing routes
router.route('/photo/:id').get(photoController.getPhoto);
router.route('/upload').post(upload.single("image"),photoController.handleFileUpload);



module.exports = router;