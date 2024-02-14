import express from 'express';

const router = express.Router();
router.get('/', (req, res) => {
  const aaa = {
    test1: 1,
    test2: 2,
    test3: 3,
  };

  res.status(200).json(aaa);
});

export default router;
