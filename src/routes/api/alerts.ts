import express from 'express';
import processAlerts from '../../utilities/process_alerts';
// import WebSocket from 'ws';

const alerts = express.Router();

alerts.get('/', async (req: express.Request, res: express.Response) => {
  const alertsReceived: string = processAlerts(1);
  res.send('alert processed: ' + alertsReceived);
});

/* it can be extended to support endpoint www.exampl.com/api/alerts/user/1234
 alerts.get("/users/:id", show); 
 to check what the alert would be for different users
*/

export default alerts;
