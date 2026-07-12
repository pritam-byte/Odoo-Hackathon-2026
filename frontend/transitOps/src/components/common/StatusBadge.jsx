// src/components/common/StatusBadge.jsx
const StatusBadge = ({ status }) => {
  const styles = {
    'Available': 'bg-green-100 text-green-700',
    'On Trip': 'bg-blue-100 text-blue-700',
    'In Shop': 'bg-orange-100 text-orange-700',
    'Retired': 'bg-gray-100 text-gray-700'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${styles[status]}`}>
      {status}
    </span>
  );
};
export default StatusBadge;