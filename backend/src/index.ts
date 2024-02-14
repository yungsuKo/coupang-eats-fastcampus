import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectToDB } from './db/mongoClient';
import menuRouter from './routes/menu';
import orderRouter from './routes/order';
import reviewRouter from './routes/review';
import storeRouter from './routes/store';
import imageRouter from './routes/image';
import userRouter from './routes/user';
import testRouter from './routes/test';

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/menu', menuRouter);
app.use('/order', orderRouter);
app.use('/review', reviewRouter);
app.use('/store', storeRouter);
app.use('/image', imageRouter);
app.use('/user', userRouter);
app.use('/test', testRouter);

connectToDB();

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
