import express from 'express';
const router = express.Router();

router.get('/', function (req, res, next: express.NextFunction) {
  return res.send(`asd `);
});


export default router;
