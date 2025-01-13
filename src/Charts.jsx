import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie } from 'recharts';

function Charts({ data }) {
  const growthData = data.map(item => ({ year: item.year, count: item.count }));
  const regionData = getRegionData(data);
  const brandData = getBrandData(data);

  return (
    <div>
      <LineChart width={600} height={300} data={growthData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
      </LineChart>

      <BarChart width={600} height={300} data={regionData}>
        <XAxis dataKey="region" />
        <YAxis />
        <Bar dataKey="count" fill="#82ca9d" />
        <Tooltip />
        <Legend />
      </BarChart>

      <PieChart width={400} height={400}>
        <Pie dataKey="count" data={brandData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label />
        <Tooltip />
      </PieChart>
    </div>
  );
}

// Aggregate data for regions and brands
function getRegionData(data) {
  const regions = {};
  data.forEach(item => {
    regions[item.region] = (regions[item.region] || 0) + Number(item.count);
  });
  return Object.keys(regions).map(region => ({ region, count: regions[region] }));
}

function getBrandData(data) {
  const brands = {};
  data.forEach(item => {
    brands[item.brand] = (brands[item.brand] || 0) + Number(item.count);
  });
  return Object.keys(brands).map(brand => ({ brand, count: brands[brand] }));
}

export default Charts;
