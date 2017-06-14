const express = require('express');
const router = express.Router();

const authenticate = require('./authenticate');
const register = require('./register');
const update = require('./update');
const _delete = require('./delete');
const getAll = require('./getAll');
const getCurrent = require('./getCurrent');
const emailExists = require('./emailExists');
const getTickets = require('./tickets');
const addMoney = require('./addMoney');
const getById = require('./getById');

router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/current', getCurrent);
router.get('/:_id', getById);
router.put('/:_id', update);
router.delete('/:_id', _delete);
router.get('/emailExists', emailExists);
router.get('/', getAll);
router.get('/:id/tickets', getTickets);
router.post('/:_id/addMoney', addMoney);

module.exports = router;
