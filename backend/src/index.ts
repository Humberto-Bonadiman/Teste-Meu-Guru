import express from 'express';
import cors from 'cors';
import userRoute from './routes/userRoute';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/user', userRoute.router);

app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
);
