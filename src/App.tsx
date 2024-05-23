import React, { useState } from 'react';
import ComplaintDetails from './components/ComplaintDetails';
import Typeahead from './components/Typeahead';
import cfpb_logo from './cfpb_logo.png';
import './App.css';
import './Typeahead.css';

function App() {
  const [complaintId, setComplaintId] = useState<string>('');
  const [submittedComplaintId, setSubmittedComplaintId] = useState<string>('');
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [selectedZip, setSelectedZip] = useState<string>('');

  const handleComplaintIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComplaintId(e.target.value);
  };

  const handleComplaintIdSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedComplaintId(complaintId);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={cfpb_logo} className="App-logo" alt="logo" />
        <p>Consumer Complaints</p>
        <form onSubmit={handleComplaintIdSubmit}>
          <input
            type="text"
            value={complaintId}
            onChange={handleComplaintIdChange}
            placeholder="Enter complaint ID"
          />
          <button type="submit">Search</button>
        </form>
        {submittedComplaintId && <ComplaintDetails complaintId={submittedComplaintId} />}
        <div className="typeahead-section">
          <Typeahead
            endpoint="/api/_suggest"
            placeholder="Search complaints"
            onSuggestionSelected={(suggestion) => console.log('Selected suggestion:', suggestion)}
          />
          <Typeahead
            endpoint="/api/_suggest_company"
            placeholder="Search companies"
            onSuggestionSelected={(suggestion) => setSelectedCompany(suggestion)}
          />
          <Typeahead
            endpoint="/api/_suggest_zip"
            placeholder="Search zip codes"
            onSuggestionSelected={(suggestion) => setSelectedZip(suggestion)}
          />
        </div>
      </header>
    </div>
  );
}

export default App;