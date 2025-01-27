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

  const [clickedButtons, setClickedButtons] = useState({});
  const [customCalculation, setCustomCalculation] = useState("");
  const [actionLogs, setActionLogs] = useState([]);

  // code for routes
  const [selectedScenario, setSelectedScenario] = useState(""); //code for dropdown
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [inputValues, setInputValues] = useState({
    startTown: "",
    endTown: "",
    maxStops: "",
    maxDistance: "",
  });

  const calculateDistanceRoute = (start, end) => {
    const directRoute = `${start}-${end}`;
    const reverseRoute = `${end}-${start}`;
    return distances[directRoute] || distances[reverseRoute] || null;
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
      if (isValidPath) {
        addLog(
          `Custom calculation for route: ${route} Total Distance: ${totalDistance}`
        );
      } else {
        addLog("Error: Invalid custom calculation");
      }
    } else {
      setCustomCalculation("Please Select at least two towns");
    }
  };

  const handleScenarioChange = (e) => {
    setSelectedScenario(e.target.value);
    setResults([]);
    setError("");
    //  addLog(`Scenario selected: ${e.target.value}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const calculateRoutes = () => {
    setError("");
    setResults([]);

    const { startTown, endTown, maxStops, maxDistance } = inputValues;

    if (!selectedScenario) {
      setError("Please select a scenario.");
      return;
    }

    // Validate required inputs
    if (
      (selectedScenario !== "shortestRoute" && (!startTown || !endTown)) ||
      (selectedScenario === "maxStops" && !maxStops) ||
      (selectedScenario === "maxDistance" && !maxDistance)
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    let simulatedResults = [];

    switch (selectedScenario) {
      case "noMoreThanThreeStops":
        simulatedResults = [
          `Route C-C with no more than 3 stops: Example Route 1, Example Route 2`,
        ];
        break;
      case "exactlyFourStops":
        simulatedResults = [`Route A-C in exactly 4 stops: Example Route`];
        break;
      case "shortestRoute":
        const distance = calculateDistanceRoute(startTown, endTown);
        if (distance) {
          simulatedResults = [
            `Shortest Route ${startTown}-${endTown}: ${distance} units`,
          ];
        } else {
          setError("No direct route found.");
          return;
        }
        break;
      case "allRoutesUnder30":
        simulatedResults = [
          `All Routes C-C under 30 distance: Example Route 1, Example Route 2`,
        ];
        break;
      default:
        setError("Scenario not implemented yet.");
        return;
    }

    setResults(simulatedResults);
    addLog(`Routes calculated for scenario: ${selectedScenario}`);
  };
  const addLog = (message) => {
    setActionLogs((prevLogs) => [...prevLogs, message]);
  };

  return (
    <>
      <div className="container-fluid h-100 bg-light py-4">
        <div
          className="container"
          style={{ padding: "20px", fontFamily: "Arial" }}
        >
          <h1 className="text-center mb-4">Route Calculator</h1>
          <div className="card p-4 bg-opacity-25">
           
            <div className="d-flex ">
              {/* route selection */}
              <div className="col-md-5">
                <h2>Specify Details:</h2>
                <div className="mb-3">
              <label htmlFor="scenario" className="form-label">
                Select Scenario:
              </label>
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
                  Find all routes between C and C with a total distance less
                  than 30
                </option>
              </select>
            </div>
                <div className="mb-3">
                  <label htmlFor="startTown" className="form-label">
                    Start Town:
                  </label>
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
                  <label htmlFor="endTown" className="form-label">
                    End Town:
                  </label>
                  <input
                    type="text"
                    id="endTown"
                    name="endTown"
                    value={inputValues.endTown}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                {selectedScenario === "maxStops" && (
                  <div>
                    <label htmlFor="maxStops" className="form-label">
                      Max Stops:
                    </label>
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
                {selectedScenario === "maxDistance" && (
                  <div>
                    <label htmlFor="maxDistance" className="form-label">
                      Max Distance:
                    </label>
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
              <div className="col-md-5">
                <h2>Select Towns:</h2>
                <div className="row justify-content-between">
                  <button
                    onClick={() => handleButtonClick("A")}
                    className={`btn ${
                      clickedButtons.A ? "btn-primary" : "btn-outline-secondary"
                    }`}
                    style={{ width: "50px", height: "60px", marginLeft:"20px" }}
                  >
                    A
                  </button>
                  <button
                    onClick={() => handleButtonClick("B")}
                    className={`btn ${
                      clickedButtons.B ? "btn-primary" : "btn-outline-secondary"
                    }`}
                    style={{ width: "50px", height: "60px", marginRight:"20px" }}
                  >
                    B
                  </button>
                </div>
                <div className="row justify-content-center">
                  <button
                    onClick={() => handleButtonClick("C")}
                    className={`btn ${
                      clickedButtons.C ? "btn-primary" : "btn-outline-secondary"
                    }`}
                    style={{ width: "50px", height: "60px" }}
                  >
                    C
                  </button>{" "}
                </div>
                <div className="row justify-content-between">
                  <button
                    onClick={() => handleButtonClick("D")}
                    className={`btn ${
                      clickedButtons.D ? "btn-primary" : "btn-outline-secondary"
                    }`}
                    style={{ width: "50px", height: "60px", marginLeft:"20px" }}
                  >
                    D
                  </button>{" "}
                  <button
                    onClick={() => handleButtonClick("E")}
                    className={`btn ${
                      clickedButtons.E ? "btn-primary" : "btn-outline-secondary"
                    }`}
                    style={{ width: "50px", height: "60px", marginRight:"20px" }}
                  >
                    E
                  </button>
                </div>
                
              </div>
            </div>
          </div>
          {/* Added div to show custom calculation */}
          <div className="mt-4">
            <button
              onClick={() => {
                calculateRoutes();
                handleCustomCalculation();
              }}
              className="btn btn-success mb-3 ms-4"
            >
              Calculate
            </button>
             <div className="row justify-content-evenly">
            <div style={{
              background: '#D3D3D3',
              padding: '30px',
              marginBottom: '10px',
              borderRadius: '5px',
              fontWeight:"bold",
              textAlign: 'center',
              color: '#fff',
              width:"40%",
              height:"200px",
              // marginLeft:"60px",
            }}>
            <p style={{ margin: 0 , color:"black"}}>Distance Calculation:</p>
              <h3 style={{ margin: 0 }}> <ul>
              <span
                style={{
                  color:
                    customCalculation === "Please Select at least two towns"
                      ? "red"
                      : "black",
                      fontSize:"15px",
                }}
              >
                {customCalculation}
              </span>
              </ul></h3>
              
            </div>
            <div style={{
              background: '#D3D3D3',
              padding: '30px',
              marginBottom: '10px',
              borderRadius: '5px',
              fontWeight:"bold",
              textAlign: 'center',
              color: '#fff',
              width:"40%",
              height:"200px",
              // marginLeft:"60px",
            }}>
            <p style={{ margin: 0 , color:"black"}}>Route Calculation:</p>
              <h3 style={{ margin: 0,}}>
               <ul>
              {error && <p style={{ color: "red", fontSize: "15px", }}>{error}</p>}
              {results.length > 0 &&  ( 
                <ul> 
                  {results.map((result, index) => (
                    <ui key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                     color: "black", 
                     fontSize: "15px",
                     
                     }}
                    >{result}</ui>
                  ))}
                </ul>
              )}
              </ul></h3>  
            </div>
            </div>
          </div>
          <div className="col-6 mt-4">
            <h3 className="ms-3">Action Logs:</h3>
            <div className="card p-3 bg-light">
              <ul>
                {actionLogs.map((log, index) => (
                  <li key={index}>{log}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DistanceCalculation;
