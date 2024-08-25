import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleJsonInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await axios.post('https://bajajfinserv21bhi10008-1.onrender.com/bfhl', parsedInput);
      setResponse(res.data);
    } catch (error) {
      alert('Invalid JSON or server error.');
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <div>
        {selectedOptions.includes('Alphabets') && (
          <div>Alphabets: {JSON.stringify(response.alphabets)}</div>
        )}
        {selectedOptions.includes('Numbers') && (
          <div>Numbers: {JSON.stringify(response.numbers)}</div>
        )}
        {selectedOptions.includes('Highest lowercase alphabet') && (
          <div>Highest Lowercase Alphabet: {JSON.stringify(response.highest_lowercase_alphabet)}</div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>ABCD123</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          JSON Input:
          <textarea value={jsonInput} onChange={handleJsonInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>

      {response && (
        <>
          <label>
            Select options:
            <select multiple onChange={handleOptionChange}>
              <option value="Alphabets">Alphabets</option>
              <option value="Numbers">Numbers</option>
              <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
            </select>
          </label>
          {renderResponse()}
        </>
      )}
    </div>
  );
}

export default App;

