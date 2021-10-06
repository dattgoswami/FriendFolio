import supertest from 'supertest';
import app from '../../../src/index';

const request = supertest(app);

describe('alerts endpoint response test suite', () => {
  it('process alerts ', async () => {
    const res = await request.get('/api/alerts');
    expect(res.status).toBe(200);
    // expect(res.body).toEqual('4,BUY,GOOG_4,SELL,FB_');
  });
});
