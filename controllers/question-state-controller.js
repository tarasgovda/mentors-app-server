const questionStateService = require('../service/question-state-service.js')
const express = require('express');
const router = express.Router();


router.get('/', async function (req, res) {
  try {
    let result = await questionStateService.all();
    res.send(result);
  } catch(err) {
    res.status(500);
    res.send(err.message);
  }
});

router.put('/', async function (req, res) {
  await questionStateService.create(req, res);
});

router.post('/', async function (req, res) {
  await questionStateService.update(req, res);
});

router.delete('/:id', async function (req, res) {
  await questionStateService.delete(req, res);
});

module.exports = router;
