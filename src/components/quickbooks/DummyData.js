import React, { useState } from "react";
import ReportTable from "./ReportTable";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const DummyData = () => {
  const [toggle, setToggle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("A-Z");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const data = [
    {
      name: "John",
      current: 123,
      range1: 456,
      range2: 789,
      range3: 987,
      range4: 654,
      total: 321,
    },
    {
      name: "Maria",
      current: 135,
      range1: 246,
      range2: 789,
      range3: 879,
      range4: 345,
      total: 765,
    },
    {
      name: "Tom",
      current: 567,
      range1: 456,
      range2: 765,
      range3: 876,
      range4: 987,
      total: 978,
    },
    {
      name: "Danny",
      current: 876,
      range1: 453,
      range2: 987,
      range3: 678,
      range4: 678,
      total: 765,
    },
    {
      name: "Bella",
      current: 135,
      range1: 246,
      range2: 789,
      range3: 879,
      range4: 345,
      total: 765,
    },
    {
      name: "Sonny",
      current: 876,
      range1: 453,
      range2: 987,
      range3: 678,
      range4: 678,
      total: 765,
    },
    {
      name: "Sony",
      current: 123,
      range1: 456,
      range2: 789,
      range3: 987,
      range4: 654,
      total: 321,
    },
    {
      name: "Lara",
      current: 135,
      range1: 246,
      range2: 789,
      range3: 879,
      range4: 345,
      total: 765,
    },
    {
      name: "Eva",
      current: 135,
      range1: 246,
      range2: 789,
      range3: 879,
      range4: 345,
      total: 765,
    },
    {
      name: "Emilly",
      current: 135,
      range1: 246,
      range2: 789,
      range3: 879,
      range4: 345,
      total: 765,
    },
    {
      name: "Lilly",
      current: 135,
      range1: 246,
      range2: 789,
      range3: 879,
      range4: 345,
      total: 765,
    },
    {
      name: "Sofia",
      current: 135,
      range1: 246,
      range2: 789,
      range3: 879,
      range4: 345,
      total: 765,
    },
    {
      name: "Max",
      current: 135,
      range1: 246,
      range2: 789,
      range3: 879,
      range4: 345,
      total: 765,
    },
    {
      name: "Lucy",
      current: 135,
      range1: 246,
      range2: 789,
      range3: 879,
      range4: 345,
      total: 765,
    },
  ];

  // const filteredData = data.filter(item =>
  //     item.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  const filteredData = data
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "A-Z") return a.name.localeCompare(b.name);
      if (sortOrder === "Z-A") return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <div style={{ height: "100%" }}>
      <div className="container">
        {/* <div style={{ backgroundColor:"#DCDCDC" }}> */}
        <div className="d-flex align-items-center mb-3">
          <div>
            <ToggleButtonGroup
              value={toggle}
              exclusive

              onChange={(event, newToggle) => { 
                if (!newToggle){
                  return
                };
                setToggle(newToggle);

                console.log("toogle", newToggle)
              }}
              aria-label="Report Toggle"
            >
              <ToggleButton
                value="QB"
                aria-label="Report by QB"
                sx={{
                  backgroundColor: toggle === "QB" ? "#198754" : "#B0B0B0",
                  color: toggle === "QB" ? "white" : "black",
                  fontFamily: "Arial, sans-serif",
                  "&:hover": {
                    backgroundColor: toggle === "QB" ? "#157347" : "#A9A9A9",
                  },
                }}
              >
                Report by QB
              </ToggleButton>
              <ToggleButton
                value="Earthco"
                aria-label="Report by Earthco"
                sx={{
                  backgroundColor: toggle === "Earthco" ? "#198754" : "#B0B0B0",
                  color: toggle === "Earthco" ? "white" : "black",
                  fontFamily: "Arial, sans-serif",
                  "&:hover": {
                    backgroundColor:
                      toggle === "Earthco" ? "#157347" : "#A9A9A9",
                  },
                }}
              >
                Report by Earthco
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>

        {toggle === "Earthco" && <ReportTable data={data} />}

        {toggle === "QB" && (
          <>
            <div>
              <h4>Quickbook Report</h4>
              <div
                className="d-flex align-items-center "
                style={{ justifyContent: "space-between" }}
              >
                <input
                  type="text"
                  className="form-control "
                  style={{ width: "30%" }}
                  placeholder="Search Customer"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <button
                    className="btn"
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "20px",
                      padding: "6px 12px",
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                      color: "#000",
                      backgroundColor: "#f0f0f0",
                    }}
                  >
                    Run report
                  </button>
                  <div style={{ position: "relative" }}>
                    <button
                      className="btn btn-light"
                      style={{
                        border: "1px solid #ccc",
                        padding: "5px",
                        fontSize: "1.2rem",
                      }}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      Sort by
                    </button>
                    {dropdownOpen && (
                      <div
                        className="dropdown-menu"
                        style={{
                          position: "absolute",
                          right: "0",
                          zIndex: 1000,
                          display: "block",
                        }}
                      >
                        <button
                          className="dropdown-item"
                          onClick={() => setSortOrder("A-Z")}
                        >
                          A-Z
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={() => setSortOrder("Z-A")}
                        >
                          Z-A
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <table className="table table-striped" style={{ marginTop: "0px" }}>
              <thead>
                <tr>
                  <th className="text-start">Customer</th>
                  <th className="text-start">Current</th>
                  <th className="text-start">1 - 30</th>
                  <th className="text-start">31 - 60</th>
                  <th className="text-start">61 - 90</th>
                  <th className="text-start">91 and over</th>
                  <th className="text-start">Total</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index}>
                    <td className="text-start">{item.name}</td>
                    <td className="text-start">{item.current}</td>
                    <td className="text-start">{item.range1}</td>
                    <td className="text-start">{item.range2}</td>
                    <td className="text-start">{item.range3}</td>
                    <td className="text-start">{item.range4}</td>
                    <td className="text-start">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default DummyData;
