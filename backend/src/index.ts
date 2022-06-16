import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import userRoute from './routes/userRoute';

export const app = express();

app.use(express.json());
app.use(cors());

app.use('/user', userRoute.router);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`),
);
