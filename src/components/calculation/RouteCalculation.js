// Import necessary libraries
import React, { useState } from 'react';

const RouteCalculator = () => {
  const [selectedScenario, setSelectedScenario] = useState('');
  const [inputValues, setInputValues] = useState({
    startTown: '',
    endTown: '',
    maxStops: '',
    maxDistance: '',
  });
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const distances = {
    "A-B": 5,
    "B-C": 4,
    "A-C": 9,
    "B-D": 7,
    "C-D": 3,
    "A-D": 10,
    "D-E": 12,
    "A-E": 10,
    "B-E": 15,
    "C-E": 20,
  };

  const calculateDistance = (start, end) => {
    const directRoute = `${start}-${end}`;
    const reverseRoute = `${end}-${start}`;
    return distances[directRoute] || distances[reverseRoute] || null;
  };

  const handleScenarioChange = (e) => {
    setSelectedScenario(e.target.value);
    setResults([]);
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const calculateRoutes = () => {
    setError('');
    setResults([]);

    const { startTown, endTown, maxStops, maxDistance } = inputValues;

    if (!selectedScenario) {
      setError('Please select a scenario.');
      return;
    }

    // Validate required inputs
    if (
      (selectedScenario !== 'shortestRoute' && (!startTown || !endTown)) ||
      (selectedScenario === 'maxStops' && !maxStops) ||
      (selectedScenario === 'maxDistance' && !maxDistance)
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    let simulatedResults = [];

    switch (selectedScenario) {
      case 'noMoreThanThreeStops':
        simulatedResults = [
          `Route C-C with no more than 3 stops: Example Route 1, Example Route 2`,
        ];
        break;
      case 'exactlyFourStops':
        simulatedResults = [`Route A-C in exactly 4 stops: Example Route`];
        break;
      case 'shortestRoute':
        const distance = calculateDistance(startTown, endTown);
        if (distance) {
          simulatedResults = [`Shortest Route ${startTown}-${endTown}: ${distance} units`];
        } else {
          setError('No direct route found.');
          return;
        }
        break;
      case 'allRoutesUnder30':
        simulatedResults = [
          `All Routes C-C under 30 distance: Example Route 1, Example Route 2`,
        ];
        break;
      default:
        setError('Scenario not implemented yet.');
        return;
    }

    setResults(simulatedResults);
  };

  return (
    
    <div style={{height:"100%"}}>
      <h1>Route Calculator</h1>
      <div>
        <label htmlFor="scenario">Select Scenario:</label>
        <select
          id="scenario"
          value={selectedScenario}
          onChange={handleScenarioChange}
        >
          <option value="">-- Select Scenario --</option>
          <option value="noMoreThanThreeStops">
            Find routes from C to C with no more than 3 stops
          </option>
          <option value="exactlyFourStops">
            Find routes from A to C in exactly 4 stops
          </option>
          <option value="shortestRoute">
            Find the shortest route between two towns
          </option>
          <option value="allRoutesUnder30">
            Find all routes between C and C with a total distance less than 30
          </option>
        </select>
      </div>

      <div>
        <h2>Specify Details:</h2>
        <div>
          <label htmlFor="startTown">Start Town:</label>
          <input
            type="text"
            id="startTown"
            name="startTown"
            value={inputValues.startTown}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="endTown">End Town:</label>
          <input
            type="text"
            id="endTown"
            name="endTown"
            value={inputValues.endTown}
            onChange={handleInputChange}
          />
        </div>
        {selectedScenario === 'maxStops' && (
          <div>
            <label htmlFor="maxStops">Max Stops:</label>
            <input
              type="number"
              id="maxStops"
              name="maxStops"
              value={inputValues.maxStops}
              onChange={handleInputChange}
            />
          </div>
        )}
        {selectedScenario === 'maxDistance' && (
          <div>
            <label htmlFor="maxDistance">Max Distance:</label>
            <input
              type="number"
              id="maxDistance"
              name="maxDistance"
              value={inputValues.maxDistance}
              onChange={handleInputChange}
            />
          </div>
        )}
        <button onClick={calculateRoutes}>Calculate</button>
      </div>

      <div>
        <h2>Results:</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {results.length > 0 && (
          <ul>
            {results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        )}
      </div>

      {/* <div>
        <h2>Log:</h2>
        <p>Scenario: {selectedScenario}</p>
        {results.length > 0 && (
          <p>Results logged successfully.</p>
        )}
      </div> */}
    </div>
  );
};

export default RouteCalculator;
