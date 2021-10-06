import express from 'express';
import alerts from './api/alerts';

//routes object that will be applied to endpoint /api
const routes = express.Router();

routes.get('/', (req: express.Request, res: express.Response): void => {
  res.send('endpoint currently available is alerts');
});

routes.use('/alerts', alerts);

export default routes;
