import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataProvider } from "./components/AppContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Invoice from './components/Invoice';
import Layout from './components/Layout';
import DataPreview from './components/DataPreview';
import Table from './components/Table';
import SnakBar from "./components/SnakBar";
import Login from './components/Login';



function App() {

  return (
 <>
  <DataProvider>
      <SnakBar />
      <BrowserRouter>
        <Routes>
          {/* <Route index element={<Invoice />} /> */}
          <Route index element={<Login />} />
          <Route path="/" element={<Layout />} >
          <Route path="form" element={<Invoice />} />
          <Route path="table" element={<Table />} />
          <Route path="dataPreview" element={<DataPreview />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </DataProvider>

 </>
  );
}

export default App;


