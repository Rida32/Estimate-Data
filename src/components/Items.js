import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from './CustomButton';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


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
  const navigate=useNavigate()

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
      <div className="container">
        <table>
          <thead>
            <tr>
              <th className="text-start">Item</th>
              <th className="text-start">Description</th>
              <th className="text-center">Qty</th>
              <th className="text-end">Rate</th>
              <th className="text-end">Amount</th>
              <th className="text-end">Cost Price</th>
             
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
                <tr key={item.id}>
                <td onClick={() => handleEditField(item.id, "name")}>
                {item.item}
                </td>
                <td onClick={() => handleEditField(item.id, "description")}>
                  {editableField === "description" && editItemId === item.id ? (
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleEditValueChange(e, item.id, "description")}
                      onBlur={handleBlur}
                      autoFocus
                    />
                  ) : (
                    item.description
                  )}
                </td>
                <td className="text-center" onClick={() => handleEditField(item.id, "qty")}>
                  {editableField === "qty" && editItemId === item.id ? (
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) => handleEditValueChange(e, item.id, "qty")}
                      onBlur={handleBlur}
                      autoFocus
                    />
                  ) : (
                    item.qty
                  )}
                </td>
                <td className="text-end" onClick={() => handleEditField(item.id, "rate")}>
                  {editableField === "rate" && editItemId === item.id ? (
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => handleEditValueChange(e, item.id, "rate")}
                      onBlur={handleBlur}
                      autoFocus
                    />
                  ) : (
                    item.rate
                  )}
                </td>
                    <td className="text-end">{item.qty * item.rate}</td>
                    <td className="text-end" onClick={() => handleEditField(item.id, "costPrice")}>
                  {editableField === "costPrice" && editItemId === item.id ? (
                    <input
                      type="number"
                      value={item.costPrice}
                      onChange={(e) => handleEditValueChange(e, item.id, "costPrice")}
                      onBlur={handleBlur}
                      autoFocus
                    />
                  ) : (
                    item.costPrice
                  )}
                </td>
                   
                  <td>
                    
                    <IconButton
                         className="btn delete-icon d-flex flex-column justify-content-center" onClick={() =>
                         setItems((prevItems) => prevItems.filter((i) => i.id !== item.id)) }>
                         <DeleteIcon style={{ color: 'red', fontSize: 24 }}/>
                    </IconButton>
                  </td>
                </tr>
            ))}
          <tr>
              <td>
                <select
                  className="form-control"
                  name="item"
                  value={newItem.item}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Select Item
                  </option>
                  <option value="Laptop">Laptop</option>
                  <option value="Mouse">Mouse</option>
                  <option value="Keyboard">Keyboard</option>
                </select>
              </td>
              <td>
                <textarea
                  className="form-control"
                  rows="2"
                  cols="35"
                  placeholder="Enter description"
                  name="description"
                  value={newItem.description}
                  onChange={handleInputChange}
                ></textarea>
              </td>
              <td>
                <input
                  type="number"
                  placeholder="Qty"
                  name="qty"
                  value={newItem.qty}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="number"
                  placeholder="Rate"
                  name="rate"
                  value={newItem.rate}
                  onChange={handleInputChange}
                />
              </td>
              <td>{newItem.qty && newItem.rate ? newItem.qty * newItem.rate : 0}</td>
              <td>
                <input
                  type="number"
                  placeholder="Cost Price"
                  name="costPrice"
                  value={newItem.costPrice}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <CustomButton className="btn" onClick={addItem}
                >
                  Add
                </CustomButton>
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
