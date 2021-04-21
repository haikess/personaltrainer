import './App.css';
import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Customers from './components/Customers';
import Trainings from './components/Trainings';

function App() {
  const[value, setValue] = useState('one');

  const handleChange = (event, value) => {
    setValue(value);
};
  return (
    <div className="App">
      <AppBar position="static">
          
          <Tabs value={value} onChange={handleChange}>
          <Tab value="one" label="Trainings" />
          <Tab value="two" label="Customers" />
          </Tabs>
          
      </AppBar>
      {value === 'one' && <Trainings/>}
      {value === 'two' && <Customers/>}
    </div>
  );
}

export default App;
