import React, { useState } from 'react';
import ComplaintDetails from './components/ComplaintDetails';
import cfpb_logo from './cfpb_logo.png';
import './App.css';

function App() {
  const [complaintId, setComplaintId] = useState<string>('');
  const [submittedComplaintId, setSubmittedComplaintId] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComplaintId(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedComplaintId(complaintId);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={cfpb_logo} className="App-logo" alt="logo" />
        <p>Consumer Complaints</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={complaintId}
            onChange={handleChange}
            placeholder="Enter complaint ID"
          />
          <button type="submit">Search</button>
        </form>
        {submittedComplaintId && <ComplaintDetails complaintId={submittedComplaintId} />}
      </header>
    </div>
  );
}

export default App;