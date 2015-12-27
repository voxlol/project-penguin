import express from 'express';
var router = express.Router();

router.route('/')
.all((req,res,next) => {
  next();
})
.get((req,res,next) => {
  res.send('Gotcha!');
});

export default router;
