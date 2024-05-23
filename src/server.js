import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3001;

const apiURL = 'https://www.consumerfinance.gov/data-research/consumer-complaints/search/api/v1/';

// middleware to handle CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

// parse JSON from incoming request
app.use(express.json());

// route to handle API requests
app.get('/:complaintId', async (req, res) => {
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