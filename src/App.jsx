import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Container, Grid, Card, Typography } from '@mui/material';
import Filters from './Filters';
import Charts from './Charts';
import DataTable from './DataTable';

function App() {
  const [evData, setEvData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [region, setRegion] = useState('All');

  // Load and parse CSV data
  useEffect(() => {
    fetch('/ev_population.csv')
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true, // Treat the first row as headers
          skipEmptyLines: true,
          complete: (result) => {
            const data = result.data.map((row) => ({
              ...row,
              count: Number(row.count), // Convert count to number
            }));
            setEvData(data);
            setFilteredData(data); // Initially, show all data
          },
        });
      })
      .catch((err) => console.error('Error loading CSV:', err));
  }, []);

  // Handle region filter
  const handleRegionChange = (region) => {
    setRegion(region);
    const filtered = region === 'All' ? evData : evData.filter((item) => item.region === region);
    setFilteredData(filtered);
  };

  // Calculate key metrics
  const totalEVs = filteredData.reduce((sum, item) => sum + item.count, 0);
  const growthRate = calculateGrowthRate(filteredData);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Electric Vehicle Population Dashboard
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Filters region={region} handleRegionChange={handleRegionChange} />
        </Grid>

        <Grid item xs={12} md={9}>
          <Card>
            <Typography variant="h6" style={{ padding: '16px' }}>
              Total EVs: {totalEVs} | Growth Rate: {growthRate}%
            </Typography>
            <Charts data={filteredData} />
            <DataTable data={filteredData} />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

// Function to calculate growth rate
function calculateGrowthRate(data) {
  if (data.length < 2) return 0;
  const firstYearData = data.filter((d) => d.year === data[0].year);
  const lastYearData = data.filter((d) => d.year === data[data.length - 1].year);
  const firstYearSum = firstYearData.reduce((sum, d) => sum + d.count, 0);
  const lastYearSum = lastYearData.reduce((sum, d) => sum + d.count, 0);
  return ((lastYearSum - firstYearSum) / firstYearSum) * 100;
}

export default App;
