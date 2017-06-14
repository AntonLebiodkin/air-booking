const express = require('express');
const router = express.Router();

const create = require('./create');
const getAll = require('./getAll');
const getById = require('./getById');


router.post('/create', create);
router.get('/', getAll);
router.get('/:_id', getById);

module.exports = router;
