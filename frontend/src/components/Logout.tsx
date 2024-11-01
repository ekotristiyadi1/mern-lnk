import { useAuth } from '@/context/authContext';
import React from 'react';

const Logout: React.FC = () => {
  const { token, logoutUser } = useAuth();
  
  return (
    <button onClick={() => logoutUser(token)} className="p-2 bg-red-500 text-white rounded">Logout</button>
  );
};

export default Logout;
