import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Opportunities } from './pages/Opportunities';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { VolunteerDashboard } from './pages/VolunteerDashboard';
import { NgoDashboard } from './pages/NgoDashboard';
import TestConnection from './pages/TestConnection';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/volunteer-dashboard"
              element={
                <ProtectedRoute requiredRole="volunteer">
                  <VolunteerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ngo-dashboard"
              element={
                <ProtectedRoute requiredRole="ngo">
                  <NgoDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/test-connection" element={<TestConnection />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" richColors />
      </div>
    </Router>
  );
}
