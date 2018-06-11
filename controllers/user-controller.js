const userService = require('../service/user-service.js')
const app = require('../server');
const router = app.Router();


router.get('/users', async function (req, res) {
  try {
    let result = await userService.all();
    res.send(result);
  } catch(err) {
    res.status(500);
    res.send(err.message);
  }
});

router.put('/users', async function (req, res) {
  
});

router.post('/users/:id', async function (req, res) {

});

router.delete('/users', async function (req, res) {

});
