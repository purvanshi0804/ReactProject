// src/components/AddDataComponent.js
import React, { useState } from 'react';
import axios from 'axios';

const AddDataComponent = () => {
  const [itemName, setItemName] = useState('');

  const handleAddItem = () => {
    // Add data to dbs.json using POST request
    axios.post('/dbs.json', { name: itemName })
      .then(response => console.log('Item added successfully:', response.data))
      .catch(error => console.error('Error adding item:', error));
  };

  return (
    <div>
      <h2>Add Item to dbs.json:</h2>
      <input
        type="text"
        placeholder="Enter item name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
};

export default AddDataComponent;
