import express from 'express';
import routes from './routes/index';
import cors from 'cors';

const app = express();
app.use(cors());
const port = 3000;

//we want our endpoint api to use routes as a middleware
app.use('/api', routes);

app.listen(port, () => {
  console.log(`server started http://localhost:${port}`);
});

export default app;
