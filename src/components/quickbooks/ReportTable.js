import React, { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { InputLabel } from "@mui/material";


const ReportTable = ({ data }) => {
  const [reportPeriod, setReportPeriod] = useState("Today");
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

 
  const filteredData = data.map((item) => ({
    ...item,
    date: new Date().toISOString().split("T")[0], 
  }));

  return (
    <div>
      <h4>Earthco Report</h4>
      {/* <div className=" align-items-left flex-column text-start mt-3"> */}
      <div className="d-flex justify-content-between align-items-center ">
      <div className="align-items-left flex-row text-start">
      <label htmlFor="report-period" className="me-2 ">Report Period:</label>
      <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">report-period</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleChange}
          label="report-period"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Today">Today</MenuItem>
          <MenuItem value="Yesterday">Yesterday</MenuItem>
          <MenuItem value="This Week">This Week</MenuItem>
          <MenuItem value="Last Week">Last Week</MenuItem>
          <MenuItem value="This Month">This Month</MenuItem>
          <MenuItem value="Last Month">Last Month</MenuItem>
        </Select>
      </FormControl>
    </div>
     
      </div>
        {/* radio buttons  */}
        <div className="d-flex align-items-center mb-0" style={{  display: "flex", flexDirection: "row", gap: "20px" }}>
        <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Aging method</FormLabel>
      <RadioGroup
       row 
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="Current" />
        <FormControlLabel value="male" control={<Radio />} label="Report date" />
      </RadioGroup>
    </FormControl>
      </div> 
      </div>
      <TableContainer>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell align="left">Customer</TableCell>
        <TableCell align="left">Current</TableCell>
        <TableCell align="left">1 - 30</TableCell>
        <TableCell align="left">31 - 60</TableCell>
        <TableCell align="left">61 - 90</TableCell>
        <TableCell align="left">91 and over</TableCell>
        <TableCell align="left">Total</TableCell>
        <TableCell align="left">Date</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {filteredData.map((row, index) => (
        <TableRow key={index}>
          <TableCell align="left">{row.name}</TableCell>
          <TableCell align="left">{row.current}</TableCell>
          <TableCell align="left">{row.range1}</TableCell>
          <TableCell align="left">{row.range2}</TableCell>
          <TableCell align="left">{row.range3}</TableCell>
          <TableCell align="left">{row.range4}</TableCell>
          <TableCell align="left">{row.total}</TableCell>
          <TableCell align="left">{row.date}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

    </div>
  );
};

export default ReportTable;
