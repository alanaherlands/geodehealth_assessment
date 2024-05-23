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
        <div><strong>Company:</strong> {data.company}</div>
        <div><strong>Company Public Response:</strong> {data.company_public_response}</div>
        <div><strong>Company Response:</strong> {data.company_response}</div>
        <div><strong>Complaint ID:</strong> {data.complaint_id}</div>
        <div><strong>Complaint What Happened:</strong> {data.complaint_what_happened}</div>
        <div><strong>Consumer Consent Provided:</strong> {data.consumer_consent_provided}</div>
        <div><strong>Consumer Disputed:</strong> {data.consumer_disputed}</div>
        <div><strong>Date Received:</strong> {data.date_received}</div>
        <div> <strong>Date Sent to Company:</strong> {data.date_sent_to_company}</div>
        <div> <strong>Has Narrative:</strong> {data.has_narrative ? 'Yes' : 'No'}</div>
        <div> <strong>Issue:</strong> {data.issue} </div>
           {data.sub_issue && (
            <div style={{ marginLeft: '20px' }}><em>Sub Issue:</em> {data.sub_issue}</div>
          )}
        <div><strong>Product:</strong> {data.product} </div> {data.sub_product && (
        <div style={{ marginLeft: '20px' }}><em>Sub Product:</em> {data.sub_product}</div>
      )}
        <div><strong>State:</strong> {data.state}</div>
        <div><strong>Submitted Via:</strong> {data.submitted_via}</div>
        <div><strong>Tags:</strong> {data.tags}</div>
        <div><strong>Timely:</strong> {data.timely}</div>
        <div><strong>Zip Code:</strong> {data.zip_code}</div>
      </ul>
    </div>
  );
};

export default ComplaintDetails;