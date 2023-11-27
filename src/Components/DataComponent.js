import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    
    axios.get('/dbs.json')
      .then(response => setData(response.data.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataComponent;
