var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


// Routes for users
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.getOneUser)

router
  .route('/:id')
  .get(userController.getOneUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser)



module.exports = router;
