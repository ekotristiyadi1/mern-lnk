import React from 'react';
import Login from './components/Login';
import { useAuth } from './context/authContext';
import EmailManager from './components/EmailManager';
import Logout from './components/Logout';

const App: React.FC = () => {
  const { user } = useAuth();

  return ( 
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {user ? (
        <div>
          <h1 className="text-2xl mb-4">Welcome, {user.username}!&nbsp; 
            <Logout />
          </h1>
          <div className="min-h-screen bg-gray-100 p-8">
            <EmailManager />
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
