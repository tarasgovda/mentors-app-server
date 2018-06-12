const questionService = require('../service/question-service.js')
const express = require('express');
const router = express.Router();


router.get('/', async function (req, res) {
  try {
    let result = await questionService.all();
    res.send(result);
  } catch(err) {
    res.status(500);
    res.send(err.message);
  }
});

router.put('/', async function (req, res) {
  await questionService.create(req, res);
});

router.post('/', async function (req, res) {
  await questionService.update(req, res);
});

router.delete('/:id', async function (req, res) {
  await questionService.delete(req, res);
});

module.exports = router;
