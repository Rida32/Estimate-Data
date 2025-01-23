import React, { useState } from "react";

const DistanceCalculation = () => {
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

  const [inputPath, setInputPath] = useState("");
  const [result, setResult] = useState("");
  const [log, setLog] = useState([]);
  const [clickedButtons, setClickedButtons] = useState({});
  const [customCalculation, setCustomCalculation] = useState("");
  
  // code for routes
  const [selectedScenario, setSelectedScenario] = useState('');    //code for dropdown
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [inputValues, setInputValues] = useState({
    startTown: '',
    endTown: '',
    maxStops: '',
    maxDistance: '',
  });
   
  const calculateDistanceRoute = (start, end) => {
    const directRoute = `${start}-${end}`;
    const reverseRoute = `${end}-${start}`;
    return distances[directRoute] || distances[reverseRoute] || null;
  };

  const calculateDistance = () => {
    const towns = inputPath.trim().split("-");
    let totalDistance = 0;
    let isValidPath = true;

    for (let i = 0; i < towns.length - 1; i++) {
      const segment = `${towns[i]}-${towns[i + 1]}`;
      const reverseSegment = `${towns[i + 1]}-${towns[i]}`;

      if (distances[segment] !== undefined) {
        totalDistance += distances[segment];
      } else if (distances[reverseSegment] !== undefined) {
        totalDistance += distances[reverseSegment];
      } else {
        isValidPath = false;
        break;
      }
    }

    if (isValidPath) {
      setResult(`Total Distance: ${totalDistance}`);
      setLog((prevLog) => [
        ...prevLog,
        { path: inputPath, distance: totalDistance },
      ]);
    } else {
      setResult("Error: Invalid Path");
    }
  };

  const handleButtonClick = (button) => {
    setClickedButtons((prevState) => ({
      ...prevState,
      [button]: !prevState[button],
    }));
  };

  const handleCustomCalculation = () => {
    const activeButtons = Object.keys(clickedButtons).filter(
      (key) => clickedButtons[key]
    );

    if (activeButtons.length >= 2) {
      let totalDistance = 0;
      let isValidPath = true;
      let route = "";
      for (let i = 0; i < activeButtons.length - 1; i++) {
        const segment = `${activeButtons[i]}-${activeButtons[i + 1]}`;
        const reverseSegment = `${activeButtons[i + 1]}-${activeButtons[i]}`;
        if (distances[segment] !== undefined) {
          totalDistance += distances[segment];
          route += `${segment} (${distances[segment]}), `;
        } else if (distances[reverseSegment] !== undefined) {
          totalDistance += distances[reverseSegment];
          route += `${reverseSegment} (${distances[reverseSegment]}), `;
        } else {
          isValidPath = false;
          break;
        }
      }
      setCustomCalculation(
        isValidPath
          ? `Route: ${route} Total Distance: ${totalDistance}`
          : "Error: Invalid Path"
      );
    } else {
      setCustomCalculation("Please Select at least two towns");
    }
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
        const distance = calculateDistanceRoute(startTown, endTown);
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
    <>
      <div className="container-fluid h-100 bg-light py-4">
        <div className="container" style={{ padding: "20px", fontFamily: "Arial" }}>
        
          <h1 className="text-center mb-4">Route Calculator</h1>
          <div className="card p-4 bg-opacity-25">
      <div className="mb-3">
        <label htmlFor="scenario" className="form-label">Select Scenario:</label>
        <select
          id="scenario"
          value={selectedScenario}
          onChange={handleScenarioChange}
          className="form-select"
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
      <div className="row g-4">
          {/* route selection */}
      <div className="col-md-6">
        <h2>Specify Details:</h2>
        <div className="mb-3">
          <label htmlFor="startTown" className="form-label">Start Town:</label>
          <input
            type="text"
            id="startTown"
            name="startTown"
            value={inputValues.startTown}
            onChange={handleInputChange}
             className="form-control"
          />
        </div>
        <div>
          <label htmlFor="endTown" className="form-label">End Town:</label>
          <input
            type="text"
            id="endTown"
            name="endTown"
            value={inputValues.endTown}
            onChange={handleInputChange}
             className="form-control"
          />
        </div>
        {selectedScenario === 'maxStops' && (
          <div>
            <label htmlFor="maxStops" className="form-label">Max Stops:</label>
            <input
              type="number"
              id="maxStops"
              name="maxStops"
              value={inputValues.maxStops}
              onChange={handleInputChange}
               className="form-control"
            />
          </div>
        )}
        {selectedScenario === 'maxDistance' && (
          <div>
            <label htmlFor="maxDistance" className="form-label">Max Distance:</label>
            <input
              type="number"
              id="maxDistance"
              name="maxDistance"
              value={inputValues.maxDistance}
              onChange={handleInputChange}
               className="form-control"
            />
          </div>
        )}
        
      </div>
          {/* Added buttons for towns */}
          <div className="col-md-6 d-flex flex-column align-items-center">
          <h2>Select Towns:</h2>
            {/* <div className="row">
              <button
                onClick={() => handleButtonClick("A")}
                style={{
                  backgroundColor: clickedButtons["A"] ? "lightblue" : "white",
                  padding: "15px",
                  cursor: "pointer",
                }}
              >
              A
              </button>
              <button
                onClick={() => handleButtonClick("B")}
                style={{
                  backgroundColor: clickedButtons["B"] ? "lightblue" : "white",
                  padding: "15px",
                  cursor: "pointer",
                }}
              >
                B
              </button>
            </div>
            <div className="row">
              <button
                onClick={() => handleButtonClick("E")}
                style={{
                  backgroundColor: clickedButtons["E"] ? "lightblue" : "white",
                  padding: "15px",
                  cursor: "pointer",
                }}
              >
                E
              </button>

            </div>
            <div className="row">
              <button
                onClick={() => handleButtonClick("C")}
                style={{
                  backgroundColor: clickedButtons["C"] ? "lightblue" : "white",
                  padding: "15px",
                  cursor: "pointer",
                }}
              >
                C
              </button>
              <button
                onClick={() => handleButtonClick("D")}
                style={{
                  backgroundColor: clickedButtons["D"] ? "lightblue" : "white",
                  padding: "15px",
                  cursor: "pointer",
                }}
              >
                D
              </button> 
            </div>*/}
            <div className="d-flex flex-wrap gap-2">
              {['A', 'B', 'C', 'D', 'E'].map((town) => (
                <button
                  key={town}
                  onClick={() => handleButtonClick(town)}
                  className={`btn ${
                    clickedButtons[town] ? 'btn-primary' : 'btn-outline-secondary'
                  }`}
                  style={{ width: '60px', height: '60px' }}
                >
                  {town}
                </button>
              ))}
            </div>
          </div>
          </div>
          </div>
          {/* Added div to show custom calculation */}
          <div className="mt-4">
            <button
              onClick={() => { calculateRoutes(); handleCustomCalculation(); }}
              className="btn btn-success mb-3"
            >
              Calculate 
            </button>
            <div className="card p-3 bg-light" >
              {/* <strong> Calculation:</strong>
              {error && <p style={{ color: 'red' }}>{error}</p>}
               {customCalculation}   */}
               <span
                style={{color: customCalculation === "Please Select at least two towns" ? "red" : "inherit",
                    }}
                      >
                {customCalculation}
                        </span>
            </div>
            <div className="card p-3 bg-light">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {results.length > 0 && (
          <ul>
            {results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        )}
      </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DistanceCalculation;
