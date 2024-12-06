import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Items({items, setItems}) {
 

  const [newItem, setNewItem] = useState({
    item: "",
    description: "",
    qty: "",
    rate: "",
    costPrice: "",
  });
  const navigate=useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  
  const addItem = () => {
    if (
      newItem.item &&
      newItem.description &&
      newItem.qty &&
      newItem.rate &&
      newItem.costPrice
    ) {
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

      
      setNewItem({
        item: "",
        description: "",
        qty: "",
        rate: "",
        costPrice: "",
      });
      
    } else {
      alert("Please fill in all fields before adding the item.");
    }
    
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
                    <td>{item.item}</td>
                    <td>
                       {item.description}
                    </td>
                    <td className="text-center">
                       {item.qty} 
                    </td>
                    <td className="text-end">
                        {item.rate}
                    </td>
                    <td className="text-end">{item.qty * item.rate}</td>
                    <td className="text-end">
                      {item.costPrice} 
                    </td>
                   
                    <td>
                        <button className="btn btn-danger" onClick={() => setItems((prevItems) =>prevItems.filter((i) => i.id !== item.id))} >Delete</button>
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
                <button className="btn btn-success" onClick={addItem}>
                  Add
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Items;
