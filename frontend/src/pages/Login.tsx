import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Mail, Lock, LogIn } from 'lucide-react';
import { toast } from 'sonner';

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock API call - Replace with actual API
    setTimeout(() => {
      // Check if we have registration data in localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const existingUser = registeredUsers.find((u: any) => u.email === formData.email);

      let user;
      
      if (existingUser) {
        // Use the registered user data
        user = {
          ...existingUser,
          id: existingUser.id || Date.now().toString(),
        };
      } else {
        // Fallback to mock user if no registration found
        user = {
          id: Date.now().toString(),
          email: formData.email,
          role: formData.email.includes('ngo') ? 'ngo' : 'volunteer',
          name: formData.email.includes('ngo') ? 'New NGO User' : 'New Volunteer',
          organizationName: formData.email.includes('ngo') ? 'New Organization' : undefined,
        };
      }

      localStorage.setItem('token', 'mock-jwt-token-' + Date.now());
      localStorage.setItem('user', JSON.stringify(user));

      toast.success('Login successful! Welcome back.');
      
      // Redirect based on role
      if (user.role === 'volunteer') {
        navigate('/volunteer-dashboard');
      } else {
        navigate('/ngo-dashboard');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e8f5e9] to-white px-4 py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-[#2e7d32] to-[#4caf50] flex items-center justify-center mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-[#2e7d32]">Welcome Back</CardTitle>
          <CardDescription>
            Login to your SkillBridge account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 rounded-full"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 rounded-full"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded border-gray-300"
                />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm text-[#2e7d32] hover:underline">
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#2e7d32] hover:bg-[#1b5e20] text-white rounded-full"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            <div className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#2e7d32] hover:underline">
                Register here
              </Link>
            </div>

            <div className="text-center text-xs text-gray-500 mt-4">
              <p>Demo credentials:</p>
              <p>Volunteer: volunteer@test.com</p>
              <p>NGO: ngo@test.com</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
