const express=require('express')
const axios=require('axios')

const dotenv=require('dotenv')
dotenv.config();

const router = express.Router();

let accessToken = '';
let tenantId = '';

/**
 * Route: Redirect to Xero for Authorization
 * This route opens the Xero authorization URL in the browser.
 */
router.get('/connect', async (req, res) => {
  const authUrl = `https://login.xero.com/identity/connect/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=offline_access accounting.reports.read&state=12345`;
  const open = (await import('open')).default;
  await open(authUrl); // Opens the URL in the browser
  res.send('Redirecting to Xero for authorization...');
});

/**
 * Route: Handle Callback from Xero
 * This route receives the authorization code and exchanges it for an access token.
 */
router.get('/callback', async (req, res) => {
  const authCode = req.query.code;
  

  try {
    const response = await axios.post(
      'https://identity.xero.com/connect/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: authCode,
        redirect_uri: process.env.REDIRECT_URI,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      }).toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    accessToken = response.data.access_token;


 
    res.send('Successfully authenticated! You can now fetch data from Xero.');
  } catch (error) {
   
    res.status(500).send('Failed to authenticate.');
  }
});

/**
 * Route: Get Tenant ID
 * This route retrieves the tenant ID required for API requests.
 */
router.get('/tenants', async (req, res) => {
  try {
    const response = await axios.get('https://api.xero.com/connections', {
      headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' },
    });
    tenantId = response.data[0]?.tenantId;
    res.json(response.data);
  } catch (error) {
   console.log(error)
    res.status(500).send('Failed to fetch tenants.');
  }
});

/**
 * Route: Fetch BalanceSheet Report
 * This route retrieves the BalanceSheet report from Xero.
 */
router.get('/balancesheet', async (req, res) => {
  try {
    const response = await axios.get('https://api.xero.com/api.xro/2.0/Reports/BalanceSheet', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Xero-tenant-id': tenantId,
        Accept: 'application/json',
      },
    });
   
    res.json(response.data);
  } catch (error) {
    
    res.status(500).send('Failed to fetch BalanceSheet.');
  }
});

module.exports=router
