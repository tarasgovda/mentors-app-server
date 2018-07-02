const userService = require('../service/user-service.js')
const express = require('express');
const router = express.Router();


router.get('/', async function (req, res) {
  try {
    let result = await userService.all();
    res.send(result);
  } catch(err) {
    res.status(500);
    res.send(err.message);
  }
});

router.get('/:id', async function (req, res) {
  await userService.findById(req, res);
})

router.put('/', async function (req, res) {
  await userService.create(req, res);
});

router.post('/', async function (req, res) {
  await userService.update(req, res);
});

router.delete('/:id', async function (req, res) {
  await userService.delete(req, res);
});

module.exports = router;
