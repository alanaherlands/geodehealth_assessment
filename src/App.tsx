import React, { useState } from "react";
import ComplaintDetails from "./components/ComplaintDetails";
import Typeahead from "./components/Typeahead";
import NavBar from "./components/NavBar";
import cfpb_logo from "./cfpb_logo.png";
import "./App.css";
import "./components/Typeahead.css";

// const searchEndpoints = {
//   complaint: '/api/_suggest',
//   companyName: '/api/_suggest_company',
//   zipCode: '/api/_suggest_zip',
//   state: '/api/geo/states'
// }

function App() {
  const [complaintId, setComplaintId] = useState<string>("");
  const [submittedComplaintId, setSubmittedComplaintId] = useState<string>("");
  // const [selectedCompany, setSelectedCompany] = useState<string>('');
  // const [selectedZip, setSelectedZip] = useState<string>('');

  const handleComplaintIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComplaintId(e.target.value);
  };

  const handleComplaintIdSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedComplaintId(complaintId);
  };

  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <img src={cfpb_logo} className="App-logo" alt="logo" />
        <p>Consumer Complaints</p>
      </header>
      <section id="section1">
        <h2>Complaint Details</h2>
        <form onSubmit={handleComplaintIdSubmit}>
          <input
            type="text"
            value={complaintId}
            onChange={handleComplaintIdChange}
            placeholder="Enter complaint ID"
          />
          <button type="submit">Search</button>
        </form>
        {submittedComplaintId && (
          <ComplaintDetails complaintId={submittedComplaintId} />
        )}
        <div className="typeahead-section"></div>{" "}
      </section>
      <section id="section2">
        <h2>Complaints</h2>
        <Typeahead
          endpoint="/api/_suggest"
          placeholder="Search complaints"
          onSuggestionSelected={(suggestion) =>
            console.log("Selected suggestion:", suggestion)
          }
        />
      </section>
      <section id="section3">
        <h2>Companies</h2>
        <Typeahead
          endpoint="/api/_suggest_company"
          placeholder="Search companies"
          onSuggestionSelected={(suggestion) =>
            console.log("Selected company:", suggestion)
          }
        />
      </section>
      <section id="section4">
        <h2>Zip Codes</h2>
        <Typeahead
          endpoint="/api/_suggest_zip"
          placeholder="Search zip codes"
          onSuggestionSelected={(suggestion) =>
            console.log("Selected zip:", suggestion)
          }
        />
      </section>
    </div>
  );
}

export default App;
