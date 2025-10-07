import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ReportLostItem from './components/ReportLostItem';
import LostItemsList from './components/LostItemsList'; // Add this import
import ReportFoundItem from './components/ReportFoundItem';
import FoundItemsList from './components/FoundItemsList';
function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/lost-items" element={<LostItemsList />} /> {/* Add this route */}
                        <Route 
                            path="/dashboard" 
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/report-lost" 
                            element={
                                <ProtectedRoute>
                                    <ReportLostItem />
                                </ProtectedRoute>
                            } 
                        />
                        <Route path="/found-items" element={<FoundItemsList />} />
<Route 
    path="/report-found" 
    element={
        <ProtectedRoute>
            <ReportFoundItem />
        </ProtectedRoute>
    } 
/>
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;