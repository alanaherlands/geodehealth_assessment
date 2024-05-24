import React, { useState, useEffect } from "react";
import ComplaintDetails from "./components/ComplaintDetails";
import Typeahead from "./components/Typeahead";
import NavBar from "./components/NavBar";
import "./App.css";
import "./components/Typeahead.css";
import SmoothScroll from 'smooth-scroll';

function App() {
  const [complaintId, setComplaintId] = useState<string>("");
  const [submittedComplaintId, setSubmittedComplaintId] = useState<string>("");

  // initialize SmoothScroll
useEffect(() => {
  const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 800,
    speedAsDuration: true
  });
  return () => scroll.destroy();
}, []);

  const handleComplaintIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComplaintId(e.target.value);
  };

  const handleComplaintIdSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedComplaintId(complaintId);
  };

  return (
    <div className="App" id="top">
      <NavBar />
      <header className="App-header">
        <h1>On your side through life’s financial moments.</h1>
        <p>We’re the Consumer Financial Protection Bureau</p>
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
        <h1>Complaints</h1>
        <Typeahead
          endpoint="/api/_suggest"
          placeholder="Search complaints"
          onSuggestionSelected={(suggestion) =>
           `Selected suggestion: {suggestion}`
          }
        />
      </section>
      <section id="section3">
        <h2>Companies</h2>
        <Typeahead
          endpoint="/api/_suggest_company"
          placeholder="Search companies"
          onSuggestionSelected={(suggestion) =>
            `Selected suggestion: {suggestion}`
          }
        />
      </section>
      <section id="section4">
        <h2>Zip Codes</h2>
        <Typeahead
          endpoint="/api/_suggest_zip"
          placeholder="Search zip codes"
          onSuggestionSelected={(suggestion) =>
            `Selected suggestion: {suggestion}`
          }
        />
      </section>
    </div>
  );
}

export default App;
