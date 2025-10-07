import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Welcome to Your Dashboard, {user?.name}!</h1>
                        <button 
                            onClick={logout}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-blue-50 p-4 rounded">
                            <h2 className="font-semibold mb-2">Your Profile</h2>
                            <p><strong>Email:</strong> {user?.email}</p>
                            <p><strong>College:</strong> {user?.college || 'Not specified'}</p>
                            <p><strong>Phone:</strong> {user?.phone || 'Not specified'}</p>
                        </div>
                        
                      <div className="bg-green-50 p-4 rounded">
  <h2 className="font-semibold mb-2">Quick Actions</h2>
  <div className="flex flex-col gap-3">
    <Link
      to="/report-lost"
      className="bg-green-600 text-white px-4 py-2 rounded w-full"
    >
      Report Lost Item
    </Link>
    <Link
      to="/found-items"
      className="bg-blue-600 text-white px-4 py-2 rounded w-full"
    >
      Browse Found Items
    </Link>
  </div>
</div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;