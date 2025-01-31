import React, {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from './CustomButton';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Autocomplete, TextField } from "@mui/material";
import useAPiAuth from "../../src/components/hooks/useApiAuth";


function Items({items, setItems}) {
 
  const [newItem, setNewItem] = useState({
    item: "",
    description: "",
    qty: "",
    rate: "",
    costPrice: "",
  });
  const [editItemId, setEditItemId] = useState(null);
  const [editableField, setEditableField] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [itemOptions, setItemOptions] = useState([]); 
  const { getData } = useAPiAuth(); 
  const navigate = useNavigate();
 
  const fetchItems = () => {
    getData(
      `/items/get-all`, 
      (data) => {
        setItemOptions(data.data || []); 
      },
      (error) => {
        console.error("Error fetching items:", error);
      }
    );
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleEditField = (itemId, fieldName) => {
    setEditItemId(itemId);
    setEditableField(fieldName);
  };

  const handleBlur = () => {
    setEditableField(null);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  
  // Function to handle item selection from dropdown and append it to the row
const handleItemSelection = (event, selectedItem) => {
  if (selectedItem) {
    // Find the full item data based on the selected label
    const selectedItemData = itemOptions.find((item) => item.item === selectedItem.label);

    if (selectedItemData) {
      // Check if the item already exists in the table
      const existingItem = items.find((item) => item.item === selectedItemData.item);

      if (!existingItem) {
        // If not existing, add it as a new row with fetched data
        const newItemData = {
          id: items.length + 1,
          item: selectedItemData.item,  // Use item name from API
          description: selectedItemData.description,  // Fetch description
          qty: 1, // Default quantity
          rate: parseFloat(selectedItemData.rate), // Fetch rate
          amount: 1 * parseFloat(selectedItemData.rate), // Calculate amount
          costPrice: parseFloat(selectedItemData.costPrice), // Fetch cost price
          isMisc: false,
        };

        setItems((prevItems) => [...prevItems, newItemData]);
      }
    }
  }
};

  
  const addItem = () => {
    if (
      newItem.item &&
      newItem.description &&
      newItem.qty &&
      newItem.rate &&
      newItem.costPrice
    ) {
      if (editItemId !== null) {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === editItemId
              ? {
                  ...item,
                  item: newItem.item,
                  description: newItem.description,
                  qty: parseInt(newItem.qty),
                  rate: parseFloat(newItem.rate),
                  amount: parseInt(newItem.qty) * parseFloat(newItem.rate),
                  costPrice: parseFloat(newItem.costPrice),
                }
              : item
          )
        );
        setEditItemId(null);
      } else {

      const newItemData = {
        id: items.length + 1,
        item: newItem.item,
        description: newItem.description,
        qty: parseInt(newItem.qty),
        rate: parseFloat(newItem.rate),
        amount: parseInt(newItem.qty) * parseFloat(newItem.rate),
        costPrice: parseFloat(newItem.costPrice),
        isMisc: false,
      };

      setItems((prevItems) => [...prevItems, newItemData]);
    }
      
      setNewItem({
        item: "",
        description: "",
        qty: "",
        rate: "",
        costPrice: "",
      });
      
    } else {
      setSnackbarOpen(true);
    }
    
  };
  const handleEditValueChange = (e, itemId, fieldName) => {
    const value = e.target.value;
  
  setItems((prevItems) =>
    prevItems.map((item) =>
      item.id === itemId
        ? {
            ...item,
            [fieldName]: fieldName === "qty" || fieldName === "rate" || fieldName === "costPrice"
              ? parseFloat(value)
              : value,
          }
        : item
    )
  );
};

  return (
    <div className="card">
      <div className="card-header">Items</div>
      <div className="container table-responsive">
        <table>
          <thead >
            <tr>
              <th className="text-start " style={{width:"13em"}}>Item</th>
              <th className="text-start">Description</th>
              <th className="text-start">Qty</th>
              <th className="text-start">Rate</th>
              <th className="text-start">Amount</th>
              <th className="text-center">Cost Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.item}</td>
                <td>
                  {editableField === "description" && editItemId === item.id ? (
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleInputChange(e, item.id, "description")}
                      onBlur={handleBlur}
                      autoFocus
                    />
                  ) : (
                    item.description
                  )}
                </td>
                <td className="text-center">{item.qty}</td>
                <td className="text-center">{item.rate}</td>
                <td className="text-center">{item.qty * item.rate}</td>
                <td className="text-center">{item.costPrice}</td>
                <td>
                  <IconButton
                    className="btn delete-icon d-flex flex-column justify-content-center"
                    onClick={() => setItems((prevItems) => prevItems.filter((i) => i.id !== item.id))}
                  >
                    <DeleteIcon style={{ color: 'red', fontSize: 24 }}/>
                  </IconButton>
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <Autocomplete
                  size="small"
                  fullWidth
                  options={itemOptions.map((item) => ({
                    id: item.id,
                    label: item.item,
                  }))}
                  getOptionLabel={(option) => option.label || ""}
                  onChange={handleItemSelection} 
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select or Add Item"
                      className="d-flex align-content-center"
                    />
                  )}
                />
              </td>
              <td>
                <textarea
                  className="form-control"
                  rows="2"
                  cols="35"
                  placeholder="Enter description"
                  name="description"
                  value={newItem.description}
                  // onChange={handleInputChange}
                ></textarea>
              </td>
              <td>
                <input
                  type="number"
                  placeholder="Qty"
                  name="qty"
                  value={newItem.qty}
                  // onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="number"
                  placeholder="Rate"
                  name="rate"
                  value={newItem.rate}
                  // onChange={handleInputChange}
                />
              </td>
              <td className="text-center">{newItem.qty && newItem.rate ? newItem.qty * newItem.rate : 0}</td>
              <td>
                <input
                  type="number"
                  placeholder="Cost Price"
                  name="costPrice"
                  value={newItem.costPrice}
                  // onChange={handleInputChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
     
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{ zIndex: 9999 }}
      >
        <MuiAlert
         variant="filled"
          onClose={handleSnackbarClose}
          severity="warning"
          sx={{ width: '100%' }}
        >
          Please fill in all fields before adding the item.
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default Items;
