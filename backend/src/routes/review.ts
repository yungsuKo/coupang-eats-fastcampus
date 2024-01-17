import { Review } from '@/db/models/review';
import express from 'express';
import z from 'zod';
const router = express.Router();
const Sort = z.enum(['RECENT', 'RATING_DESC', 'RATING_ASC']);

const SortQuery = {
  [Sort.Enum.RECENT]: { createAt: -1 },
  [Sort.Enum.RATING_DESC]: { rating: -1 },
  [Sort.Enum.RATING_ASC]: { rating: 1 },
} as const;

/**
 * 매장별 리뷰를 가져온다
 *
 * @param storeId - 매장 id
 * @param photo - 포토리뷰 필터 여부, 0-false 1-true
 * @param sort - 정렬 순서
 * @param page
 * @param limit
 */
router.get('/store/:storeId', async (req, res) => {
  const { storeId } = req.params;
  const querySchema = z.object({
    photo: z.string().optional(),
    sort: Sort.optional().default(Sort.Enum.RECENT),
    page: z.coerce.number().optional().default(1),
    limit: z.coerce.number().optional().default(10),
  });

  const parsedQuery = querySchema.safeParse(req.query);
  if (!parsedQuery.success) {
    res.sendStatus(500);
    return;
  }

  const { photo, sort, page, limit } = parsedQuery.data;
  const query: Record<string, string | object> = { store: storeId };
  if (photo === 'true') {
    query.image = {
      $exists: true,
      $type: 'string',
      $ne: '',
    };
  }

  try {
    const docs = await Review.find(query)
      .sort(SortQuery[sort])
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    res.status(200).json(docs);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
router.post('/', async (req, res) => {});

export default router;
