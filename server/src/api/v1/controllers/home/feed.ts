import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/feed', async (req: Request, res: Response) => {
  res.send('HELLO');
});

module.exports = router;
