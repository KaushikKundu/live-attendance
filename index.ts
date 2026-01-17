import express from 'express';
import authRouter from './routes/auth';
import classRouter from './routes/classRouter';
const app = express();
const port = 3000;

app.use(express.json());
app.use('/auth', authRouter);
app.use('/class', classRouter);
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});