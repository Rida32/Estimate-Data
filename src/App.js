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


function App() {

  return (
 <>
  <DataProvider>
      <SnakBar />
      <BrowserRouter>
        <Routes>
          {/* <Route index element={<Invoice />} /> */}
          <Route path="/" element={<Layout />} >
          <Route path="form" element={<Invoice />} />
          <Route path="dataPreview" element={<DataPreview />} />
          <Route index element={<Table />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </DataProvider>

 </>
  );
}

export default App;


