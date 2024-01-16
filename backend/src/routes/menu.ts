import { Menu } from '@/db/models/menu';
import { Store } from '@/db/models/store';
import express from 'express';
import { ObjectId } from 'mongodb';

const router = express.Router();

/**
 * 메뉴의 정보를 갖고온다
 *
 * @param menuId
 */
router.get('/:menuId', async (req, res) => {
  const { menuId } = req.params;
  try {
    const doc = await Menu.findById(menuId);
    res.status(200).json(doc);
  } catch (err) {
    console.error('getting menu error', err);
    res.sendStatus(500);
  }
});

/**
 * 특정 매장의 메뉴를 가져온다
 *
 * @param storeId
 */
router.get('/store/:storeId', async (req, res) => {
  const { storeId } = req.params;
  try {
    const docs = await Store.aggregate([
      {
        $match: { _id: new ObjectId(storeId) },
      },
      {
        $unwind: '$menus',
      },
      {
        $lookup: {
          from: 'menus',
          localField: 'menus',
          foreignField: '_id',
          as: 'menu',
        },
      },
    ]);
    console.log(docs);

    res.status(200).json(docs);
  } catch (err) {
    console.error('store lookup failed');
    res.sendStatus(500);
  }
});

export default router;
