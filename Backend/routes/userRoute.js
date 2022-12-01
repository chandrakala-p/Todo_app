const express = require('express');
const { createUser, loginUser, getUser } = require('../controllers/user');
const userAuth = require('../middleware/userAuth');
const router = express.Router();

router.post("/createUser", createUser)
router.post('/login', loginUser)
router.get('/getUser', userAuth, getUser)
router.get('/getAllUser', getUser)


module.exports = router;