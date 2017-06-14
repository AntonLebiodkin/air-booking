const express = require('express');
const router = express.Router();

const create = require('./create');
const _delete = require('./delete');
const getAll = require('./getAll');
const getById = require('./getById');
const update = require('./update');
const findByCountries = require('./findByCountries');
const getRaceWithPlacesCount = require('./getRaceWithPlacesCount');
const book = require('./book');


router.get('/find', findByCountries);
router.post('/create', create);
router.get('/getRaceWithPlacesCount/:_id', getRaceWithPlacesCount);
router.get('/:_id', getById);
router.get('/', getAll);
router.delete('/:_id', _delete);
router.put('/:_id', update);
router.post('/book', book);

module.exports = router;
