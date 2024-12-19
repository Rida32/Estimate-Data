import logo from './logo.svg';
import './App.css';
import { DataProvider } from "./components/AppContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './components/Layout';
import SnakBar from "./components/SnakBar";
import Login from './components/Login';
import EstimatesPreview from './components/EstimatesPreview';
import EstimatesAdd from './components/EstimatesAdd';
import Estimates from './components/Estimates';
import Customers from './components/Customers';
import CustomerRecord from './components/CustomerRecord';
import CreateAccount from './components/CreateAccount';
import StaffManagement from './StaffManagement';





function App() {

  return (
 <>
  <DataProvider>
      <SnakBar />
      <BrowserRouter>
        <Routes>
         
          
          <Route index element={<Login />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path="/" element={<Layout />} >
          <Route path="estimates/add" element={<EstimatesAdd />} />
          <Route path="estimates" element={<Estimates />} />
          <Route path="estimates/Preview" element={<EstimatesPreview />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customerRecord" element={<CustomerRecord />} />
          <Route path="staffmanagement" element={<StaffManagement />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </DataProvider>

 </>
  );
}

export default App;


