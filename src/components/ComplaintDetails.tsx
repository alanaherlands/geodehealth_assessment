import React, { useState, useEffect } from 'react';
import { ComplaintData } from '../types/Complaint'
import { ApiResponse } from '../types/ApiResponse';

const ComplaintDetails: React.FC<{ complaintId: string }> = ({ complaintId }) => {
  const [data, setData] = useState<ComplaintData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!complaintId) return;

    const fetchData = async () => {
      console.log('Fetching data for complaint ID:', complaintId);
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/${complaintId}`);
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const result: ApiResponse = await response.json();
        console.log('Data received:', result);
        // extract relevant data from hits array
        if (result.hits && result.hits.hits && result.hits.hits.length > 0) {
          const complaintData = result.hits.hits[0]._source;
          setData(complaintData);
        } else {
          setError('No data found');
        }
      } catch (err) {
        console.error('Error:', (err as Error).message);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [complaintId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data found.</div>;
  }

  return (
    <div>
      <h2>Complaint Details</h2>
      <ul>
        <li><strong>Company:</strong> {data.company}</li>
        <li><strong>Company Public Response:</strong> {data.company_public_response}</li>
        <li><strong>Company Response:</strong> {data.company_response}</li>
        <li><strong>Complaint ID:</strong> {data.complaint_id}</li>
        <li><strong>Complaint What Happened:</strong> {data.complaint_what_happened}</li>
        <li><strong>Consumer Consent Provided:</strong> {data.consumer_consent_provided}</li>
        <li><strong>Consumer Disputed:</strong> {data.consumer_disputed}</li>
        <li><strong>Date Received:</strong> {data.date_received}</li>
        <li><strong>Date Sent to Company:</strong> {data.date_sent_to_company}</li>
        <li><strong>Has Narrative:</strong> {data.has_narrative ? 'Yes' : 'No'}</li>
        <li><strong>Issue:</strong> {data.issue}</li>
        <li><strong>Product:</strong> {data.product}</li>
        <li><strong>State:</strong> {data.state}</li>
        <li><strong>Sub Issue:</strong> {data.sub_issue}</li>
        <li><strong>Sub Product:</strong> {data.sub_product}</li>
        <li><strong>Submitted Via:</strong> {data.submitted_via}</li>
        <li><strong>Tags:</strong> {data.tags}</li>
        <li><strong>Timely:</strong> {data.timely}</li>
        <li><strong>Zip Code:</strong> {data.zip_code}</li>
      </ul>
    </div>
  );
};

export default ComplaintDetails;