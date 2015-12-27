import express from 'express';
const router = express.Router();

router.route('/')
.all((req,res,next) => {
  next();
})
.get((req,res,next) => {
  res.send('Gotcha!');
});

export default router;
