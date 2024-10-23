const request = require('supertest');
const app = require('../index');



jest.mock('open', () => {
    return jest.fn(() => Promise.resolve());
});
describe('GET /api/connect', () => {
    it('should redirect to Xero for authorization', async () => {
        const response = await request(app).get('/api/connect');
   
        // Verify status code
        expect(response.statusCode).toBe(200);
      
        // Verify response text
        expect(response.text).toBe('Redirecting to Xero for authorization...');
      }, 10000); 

});


