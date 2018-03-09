const express = require('express');
const router = express.Router();

const todo = require('./todo/index');

router.use('/api/todo', todo);

module.exports = router;
