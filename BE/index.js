import express from 'express';
import userRouter from './routers/user';
import postRouter from './routers/postRouter';
import fileUpload from 'express-fileupload';
import cors from 'cors';

const app = express();
const port = 8080;

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cors());
app.use(fileUpload());

app.use('/user', userRouter);
app.use('/post', postRouter);

app.get('/', (req, res) => {
  res.send();
});

app.get('*', (req, res) => {
  res.send('404');
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});