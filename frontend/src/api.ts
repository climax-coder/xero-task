import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; 

// Function to connect to Xero
export const connectToXero = async () => {
  const response = await axios.get(`${API_BASE_URL}/connect`);
 
  return response.data;
};

// Function to handle the callback from Xero
export const handleCallback = async (code: string) => {
  const response = await axios.get(`${API_BASE_URL}/callback?code=${code}`);
  return response.data;
};

// Function to get the tenant ID
export const getTenants = async () => {
  const response = await axios.get(`${API_BASE_URL}/tenants`);
  return response.data;
};

// Function to fetch the BalanceSheet report
export const fetchBalanceSheet = async () => {
  const response = await axios.get(`${API_BASE_URL}/balancesheet`);
 
  return response.data;
};
