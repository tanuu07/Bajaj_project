import React, { useState } from 'react';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const parsedJson = JSON.parse(jsonInput);

      if (!parsedJson || !Array.isArray(parsedJson.data)) {
        setError('Invalid JSON format: "data" should be an array');
        return;
      }

      const res = await fetch('http://127.0.0.1:5000/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedJson),
      });

      if (!res.ok) {
        setError('Failed to fetch from backend');
        return;
      }

      const result = await res.json();
      setResponse(result);
    } catch (err) {
      setError('Invalid JSON format. Please ensure the JSON is correctly formatted.');
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    setSelectedOptions(prevOptions =>
      checked ? [...prevOptions, value] : prevOptions.filter(option => option !== value)
    );
  };

  const renderResponse = () => {
    if (!response) return null;
    const { numbers, alphabets, highest_alphabet } = response;
    return (
      <div className="response-container">
        {selectedOptions.includes('Numbers') && (
          <div className="response-item">
            <h3>Numbers:</h3>
            <p>{numbers.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('Alphabets') && (
          <div className="response-item">
            <h3>Alphabets:</h3>
            <p>{alphabets.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('Highest Alphabet') && highest_alphabet.length > 0 && (
          <div className="response-item">
            <h3>Highest Alphabet:</h3>
            <p>{highest_alphabet.join(', ')}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
      <h1 className="roll-number-heading">RA2111030010155</h1>
        <form onSubmit={handleSubmit} className="form-container">
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='Enter JSON here'
            rows="5"
            className="input-textarea"
          />
          <br />
          <button type="submit" className="submit-button">Submit</button>
        </form>
        {error && <p className="error-text">{error}</p>}
        {response && (
          <>
            <div className="filter-container">
              <label>
                <input
                  type="checkbox"
                  value="Numbers"
                  onChange={handleOptionChange}
                />
                Numbers
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Alphabets"
                  onChange={handleOptionChange}
                />
                Alphabets
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Highest Alphabet"
                  onChange={handleOptionChange}
                />
                Highest Alphabet
              </label>
            </div>
            {renderResponse()}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
