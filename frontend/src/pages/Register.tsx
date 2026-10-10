import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { User, Building, Mail, Lock, Tag, FileText, Hash } from 'lucide-react';
import { toast } from 'sonner';

export const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<'volunteer' | 'ngo'>('volunteer');
  const [formData, setFormData] = useState({
    fullName: '',
    organizationName: '',
    email: '',
    password: '',
    confirmPassword: '',
    skills: '',
    registrationId: '',
    category: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long!');
      return;
    }

    setLoading(true);

    // Mock API call - Replace with actual API
    setTimeout(() => {
      const mockUser = {
        id: Date.now().toString(),
        email: formData.email,
        role: role,
        name: role === 'volunteer' ? formData.fullName : formData.organizationName,
        ...(role === 'ngo' ? {
          organizationName: formData.organizationName,
          registrationId: formData.registrationId,
          category: formData.category,
          description: formData.description,
          // Default values that can be updated later
          phone: '',
          location: '',
          website: '',
          logo: ''
        } : {
          // Volunteer specific fields
          skills: formData.skills,
          bio: '',
          location: ''
        })
      };

      // Store the user data in localStorage for login
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const existingUserIndex = registeredUsers.findIndex((u: any) => u.email === formData.email);
      
      if (existingUserIndex >= 0) {
        // Update existing user
        registeredUsers[existingUserIndex] = mockUser;
      } else {
        // Add new user
        registeredUsers.push(mockUser);
      }
      
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      
      // Also store the user data in the user item for immediate login
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', 'mock-jwt-token-' + Date.now());
      
      toast.success('Registration successful!');
      
      // Redirect based on role
      if (role === 'volunteer') {
        navigate('/volunteer-dashboard');
      } else {
        navigate('/ngo-dashboard');
      }
      
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e8f5e9] to-white px-4 py-12">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-[#2e7d32] to-[#4caf50] flex items-center justify-center mb-4">
            {role === 'volunteer' ? (
              <User className="w-8 h-8 text-white" />
            ) : (
              <Building className="w-8 h-8 text-white" />
            )}
          </div>
          <CardTitle className="text-[#2e7d32]">Create Your Account</CardTitle>
          <CardDescription>
            Join SkillBridge and start making an impact
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection */}
            <div className="space-y-2">
              <Label>I am a</Label>
              <Select value={role} onValueChange={(value: 'volunteer' | 'ngo') => setRole(value)}>
                <SelectTrigger className="rounded-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="volunteer">Volunteer</SelectItem>
                  <SelectItem value="ngo">NGO / Organization</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Conditional Fields Based on Role */}
            {role === 'volunteer' ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="pl-10 rounded-full"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Skills (comma separated)</Label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="skills"
                      name="skills"
                      type="text"
                      placeholder="Teaching, Web Development, Graphic Design"
                      value={formData.skills}
                      onChange={handleChange}
                      className="pl-10 rounded-full"
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization Name</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="organizationName"
                      name="organizationName"
                      type="text"
                      placeholder="Green Earth Foundation"
                      value={formData.organizationName}
                      onChange={handleChange}
                      className="pl-10 rounded-full"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registrationId">Registration ID</Label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="registrationId"
                      name="registrationId"
                      type="text"
                      placeholder="NGO-12345"
                      value={formData.registrationId}
                      onChange={handleChange}
                      className="pl-10 rounded-full"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="rounded-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="environment">Environment</SelectItem>
                      <SelectItem value="animal-welfare">Animal Welfare</SelectItem>
                      <SelectItem value="community">Community Development</SelectItem>
                      <SelectItem value="disaster-relief">Disaster Relief</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Tell us about your organization..."
                      value={formData.description}
                      onChange={handleChange}
                      className="pl-10 rounded-lg min-h-20"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {/* Common Fields */}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10 rounded-full"
                    required
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#2e7d32] hover:bg-[#1b5e20] text-white rounded-full"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-[#2e7d32] hover:underline">
                Login here
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
