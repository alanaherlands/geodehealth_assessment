import React, { useState, useEffect } from 'react';

interface TypeaheadProps {
  endpoint: string;
  placeholder: string;
  onSuggestionSelected: (suggestion: string) => void;
}

const Typeahead: React.FC<TypeaheadProps> = ({ endpoint, placeholder, onSuggestionSelected }) => {
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${endpoint}?text=${encodeURIComponent(query)}&size=10`);
        const rawResult = await response.text();
        console.log('Raw response:', rawResult);
        const result = JSON.parse(rawResult);
        console.log('Parsed response:', rawResult);
        // check if the result is an array before setting it to suggestions
        if (Array.isArray(result)) {
            setSuggestions(result);
        } else {
            setSuggestions([]);
            console.error('Unexpected response format:', result);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [query, endpoint]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value === "") {
      setSuggestions([]);
    }
  };

  const handleSelect = (suggestion: string) => {
    setQuery(suggestion);
    onSuggestionSelected(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="typeahead-container">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="typeahead-input"
      />
      {loading && <div>Loading...</div>}
      <ul className="suggestions-list">
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSelect(suggestion)} className="suggestion-item">
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Typeahead;