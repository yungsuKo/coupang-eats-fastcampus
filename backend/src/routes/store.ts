import express from 'express';
import { Store } from '@/db/models/store';
import { z } from 'zod';
import { PipelineStage } from 'mongoose';
const router = express.Router();

const DOC_IN_PAGE = 5;
const Sort = z.enum(['RATING', 'REVIEW', 'DELIVERY']);
const SortQuery = {
  [Sort.Enum.RATING]: { rating: -1 },
  [Sort.Enum.REVIEW]: { reviewCount: -1 },
  [Sort.Enum.DELIVERY]: { deliveryPrice: 1 },
} as const;

/**
 * 매장 목록을 받아온다.
 *
 * 다음과 같은 Query parameter를 허용한다.
 * @param sort - 정렬 방식
 * @param page - 요청하는 페이지
 * @param limit - 한 페이지에 보여질 매장수 default = 1
 * @param maxDeliveryPrice - 배달비 최댓값
 * @param minOrderPrice - 최소주문금액
 */
router.get('/', async (req, res) => {
  const querySchema = z.object({
    sort: Sort.optional().default('RATING'),
    page: z.coerce.number().optional().default(1),
    maxDeliveryPrice: z.coerce.number().optional(),
    minOrderPrice: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
  });

  const parsedQuery = querySchema.safeParse(req.query);

  if (!parsedQuery.success) {
    res.sendStatus(400);
    return;
  }

  const { sort, page, maxDeliveryPrice, minOrderPrice, limit } =
    parsedQuery.data;
  const query: Record<string, string | object> = {};
  if (typeof maxDeliveryPrice === 'number') {
    query.deliveryPrice = { $lte: maxDeliveryPrice };
  }
  if (typeof minOrderPrice === 'number')
    query.minimumOrderPrice = { $gte: minOrderPrice };

  const storeLimit = limit || DOC_IN_PAGE;
  try {
    const docs = await Store.find(query)
      .sort(SortQuery[sort])
      .limit(storeLimit)
      .skip((page - 1) * storeLimit)
      .exec();

    res.status(200).json(docs);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Store.findById(id);
    res.status(200).json(doc);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/**
 * 매장 검색 api
 *
 * @param query - 검색어
 */
router.get('/search/:query', async (req, res) => {
  const { query } = req.params;
  console.log('search requested 검색어 :', query);
  const querySchema = z.object({
    sort: Sort.optional().default('RATING'),
    maxDeliveryPrice: z.coerce.number().optional(),
    minOrderPrice: z.coerce.number().optional(),
  });

  const parsedQuery = querySchema.safeParse(req.query);

  if (!parsedQuery.success) {
    res.sendStatus(500);
    return;
  }

  const { sort, maxDeliveryPrice, minOrderPrice } = parsedQuery.data;

  try {
    const aggregationPipeline: PipelineStage[] = [
      {
        $search: {
          index: 'search_store',
          text: {
            query: query,
            path: {
              wildcard: '*',
            },
          },
        },
      },
    ];
    if (typeof maxDeliveryPrice === 'number') {
      aggregationPipeline.push({
        $match: { deliveryPrice: { $lte: maxDeliveryPrice } },
      });
    }
    if (typeof minOrderPrice === 'number') {
      aggregationPipeline.push({
        $match: { minimumOrderPrice: { $gte: minOrderPrice } },
      });
    }

    aggregationPipeline.push({
      $sort: SortQuery[sort],
    });

    const docs = await Store.aggregate(aggregationPipeline);
    res.status(200).json(docs);
  } catch (err) {
    console.log(err);
  }
});

/**
 * 카테고리별로 매장 목록을 받아온다
 *
 * @param category - 카테고리
 */
router.get('/category/:category', async (req, res) => {
  const { category } = req.params;

  const querySchema = z.object({
    sort: Sort.optional().default('RATING'),
    page: z.coerce.number().optional().default(1),
    maxDeliveryPrice: z.coerce.number().optional(),
    minOrderPrice: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
  });
  const parsedQuery = querySchema.safeParse(req.query);
  if (!parsedQuery.success) {
    res.sendStatus(500);
    return;
  }

  const { sort, page, limit, maxDeliveryPrice, minOrderPrice } =
    parsedQuery.data;
  const query: Record<string, string | object> = { category: category };
  if (typeof maxDeliveryPrice === 'number') {
    query.deliveryPrice = { $lte: maxDeliveryPrice };
  }
  if (typeof minOrderPrice === 'number') {
    query.minimumOrderPrice = { $gte: minOrderPrice };
  }
  const storeLimit = limit || DOC_IN_PAGE;
  try {
    const docs = await Store.find(query)
      .sort(SortQuery[sort])
      .limit(storeLimit)
      .skip((page - 1) * storeLimit)
      .exec();

    res.send(200).json(docs);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export default router;
