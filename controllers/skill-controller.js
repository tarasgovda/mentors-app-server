const skillService = require('../service/skill-service.js')
const express = require('express');
const router = express.Router();


router.get('/', async function (req, res) {
  try {
    let result = await skillService.all();
    res.send(result);
  } catch(err) {
    res.status(500);
    res.send(err.message);
  }
});

router.put('/', async function (req, res) {
  await skillService.create(req, res);
});

router.post('/', async function (req, res) {
  await skillService.update(req, res);
});

router.delete('/:id', async function (req, res) {
  await skillService.delete(req, res);
});

module.exports = router;
