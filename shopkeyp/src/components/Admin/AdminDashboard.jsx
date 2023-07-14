import React from "react";
import { PieChart } from '@mui/x-charts/PieChart';
const AdminDashboard = () => {
  return (
    <>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: 'active' },
              { id: 1, value: 15, label: 'inactive' }
            ],
          },
        ]}
        width={500}
        height={300}
      />
    </>
  );
};

export default AdminDashboard;