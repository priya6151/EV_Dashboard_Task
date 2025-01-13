import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function Filters({ region, handleRegionChange }) {
  return (
    <FormControl fullWidth>
      <InputLabel>Region</InputLabel>
      <Select
        value={region}
        onChange={(e) => handleRegionChange(e.target.value)}
        label="Region"
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="North America">North America</MenuItem>
        <MenuItem value="Europe">Europe</MenuItem>
        <MenuItem value="Asia">Asia</MenuItem>
        {/* Add more regions as needed */}
      </Select>
    </FormControl>
  );
}

export default Filters;
