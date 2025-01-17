import './App.css';
import { DataProvider } from "./components/AppContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './components/Layout';
import SnakBar from "./components/SnakBar";
import Login from './components/Login';
import EstimatesPreview from './components/estimates/EstimatesPreview';
import EstimatesAdd from './components/estimates/EstimatesAdd';
import Estimates from './components/estimates/Estimates';
import Customers from './components/customers/Customers';  
import CustomerRecord from './components/customers/CustomerRecord'; 
import CreateAccount from './components/CreateAccount';
import StaffManagement from './components/StaffManagement';
import Invoice from './components/invoice/Invoice';
import InvoiceAdd from './components/invoice/InvoiceAdd';
import InvoicePreview from './components/invoice/InvoicePreview';
import ItemsRecord from './components/items/ItemsRecord';
import ItemsAdd from './components/items/ItemsAdd';
import DummyData from './components/quickbooks/DummyData';
import SalesDashboard from './components/quickbooks/SalesDashboard';
import Card from './components/quickbooks/Card';



function App() {

  return (
 <>
  <DataProvider>
      <SnakBar />
      <BrowserRouter>
        <Routes>

          {/* <Route index element={<Login />} /> */}
          <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path="/" element={<Layout />} >
          <Route path="estimates/add" element={<EstimatesAdd />} />
          <Route path="estimates" element={<Estimates />} />
          <Route path="estimates/Preview/:id" element={<EstimatesPreview />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customerRecord" element={<CustomerRecord />} />
          <Route path="staffmanagement" element={<StaffManagement />} />
          <Route path="Invoice" element={<Invoice />} />
          <Route path="InvoiceAdd" element={<InvoiceAdd />} />
          <Route path="InvoicePreview/:id" element={<InvoicePreview />} />
          <Route path="ItemsAdd" element={<ItemsAdd />} />
          <Route path="ItemsRecord" element={<ItemsRecord />} />
          <Route path="DummyData" element={<DummyData />} />
          <Route path="SalesDashboard" element={<SalesDashboard />} />
          <Route path="Card" element={<Card />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </DataProvider>

 </>
  );
}

export default App;


