let router = require('express').Router();

router.get('/', function(req,res){
    res.json({
        message:"welcome to the API landing page, refer to github for more info."
    })
})


//Importing controller
const photoController = require('./photoController');

//Importing routes
router.route('/photo').get(photoController.index);
router.route('/photo/:title/:fileName/:filePath/:visible').post(photoController.postPhoto);


module.exports = router;44444444444