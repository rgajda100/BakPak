const express = require('express');
const router = express.Router();


router.use('/alt', require('./alt'));
router.use('/', require('./home'));
router.use('/sign-up', require('./sign-up'));
router.use('/discussion-board', require('./discussion-board'));
router.use('/debug', require('./debug'));



module.exports = router;
