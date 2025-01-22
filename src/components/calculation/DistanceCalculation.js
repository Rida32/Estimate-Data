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
      setCustomCalculation("Error: Select at least two towns");
    }
  };


  return (
    <>
      <div style={{ height: "100%" }}>
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
          <h2>Distance Calculator</h2>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              value={inputPath}
              placeholder="Enter path (e.g., A-B-C)"
              onChange={(e) => setInputPath(e.target.value)}
              style={{ padding: "10px", width: "300px" }}
            />
            <button
              onClick={calculateDistance}
              style={{
                marginLeft: "10px",
                padding: "10px 20px",
                cursor: "pointer",
              }}
            >
              Calculate
            </button>
          </div>
          <div>
            <strong>Result:</strong> {result}
          </div>
          <div style={{ marginTop: "20px" }}>
            <h3>Logs</h3>
            <ul>
              {log.map((entry, index) => (
                <li key={index}>
                  Path: {entry.path}, Distance: {entry.distance}
                </li>
              ))}
            </ul>
          </div>
          {/* Added buttons for towns */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "40px",

              alignItems: "center",
            }}
          >
            <div className="row">
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
            </div>
          </div>
          {/* Added div to show custom calculation */}
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={handleCustomCalculation}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                cursor: "pointer",
              }}
            >
              Calculate Selected
            </button>
            <div
              style={{
                marginTop: "10px",
                padding: "10px",
                border: "1px solid #ccc",
                backgroundColor: "#f9f9f9",
              }}
            >
              <strong>Custom Calculation:</strong> {customCalculation}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DistanceCalculation;
