import { User } from '@/db/models/user';
import express from 'express';
const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const doc = await User.findById(id);
    res.status(200).json(doc);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export default router;
