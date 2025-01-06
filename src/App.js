import './App.css';
import { DataProvider } from "./components/AppContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './components/Layout';
import SnakBar from "./components/SnakBar";
import Login from './components/Login';
import EstimatesPreview from './components/estimates/EstimatesPreview';
import EstimatesAdd from './components/estimates/EstimatesAdd';
import Estimates from './components/estimates/Estimates';
import Customers from './components/customers/Customers';  //this
import CustomerRecord from './components/customers/CustomerRecord';  //this
import CreateAccount from './components/CreateAccount';
import StaffManagement from './components/StaffManagement';



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
          <Route path="estimates/Preview/:id" element={<EstimatesPreview />} />
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


