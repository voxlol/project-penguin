import express from 'express';
var router = express.Router();

router.route('/')
.all((req,res,next) => {
  next();
})
.get((req,res,next) => {
  res.send('Gotcha!');
})
.post((req, res, next) => {
  console.log('huh?');
  res.send('ok');
});

export default router;
