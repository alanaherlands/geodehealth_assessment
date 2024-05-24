const express = require('express');
// const fetch = require('node-fetch');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3001;

const apiURL = 'https://www.consumerfinance.gov/data-research/consumer-complaints/search/api/v1/';

// proxy requests to /api to the external API
app.use(
  '/api',
  createProxyMiddleware({
    target: apiURL,
    changeOrigin: true,
    pathRewrite: {
      '^/api': '' // remove /api from the beginning of the path
    }
  })
);

// parse JSON from incoming request
app.use(express.json());

// route to handle API requests
app.get('/custom/:complaintId', async (req, res) => {
    try {
      const { complaintId } = req.params;
      const encodedComplaintId = encodeURIComponent(complaintId);
      const response = await fetch(`${apiURL}${encodedComplaintId}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching complaint data:', error);
      res.status(400).json({ error: 'Failed to fetch complaint data' });
    }
  });
  
  // server
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });