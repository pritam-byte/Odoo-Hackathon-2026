// src/features/vehicles/VehicleTable.jsx
import StatusBadge from '../../components/common/StatusBadge';

const VehicleTable = ({ data }) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>Registration No.</th>
          <th>Vehicle Model</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(v => (
          <tr key={v.id}>
            <td>{v.regNo}</td>
            <td>{v.model}</td>
            <td><StatusBadge status={v.status} /></td>
            <td>...</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};