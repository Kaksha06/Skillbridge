import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Progress } from '../components/ui/progress';
import { User, Calendar, Award, Clock, Edit, Upload, MapPin, Mail, Phone, Heart, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import api from '../services/api'; // Make sure this exists

interface Opportunity {
  _id: string;
  title: string;
  organization: string;
  status: string;
  hoursCompleted?: number;
  totalHours?: number;
  nextSession?: string;
  applicationStatus?: string;
  opportunityId?: {
    title: string;
    organization: string;
  };
}

interface Certificate {
  _id: string;
  title: string;
  program: string;
  year: string;
  downloadUrl: string;
}

export const VolunteerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [profileImage, setProfileImage] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    skills: '',
    bio: '',
  });
  
  const [dashboardData, setDashboardData] = useState<{
    stats?: {
      totalOpportunities: number;
      totalCertificates: number;
      totalHours: number;
      impactScore: number;
    };
    myOpportunities?: Opportunity[];
    myCertificates?: Certificate[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userData = localStorage.getItem('user');
      if (!userData) {
        navigate('/login');
        return;
      }
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setEditFormData({
          name: parsedUser.name || '',
          email: parsedUser.email || '',
          phone: parsedUser.phone || '+1 (234) 567-890',
          location: parsedUser.location || 'Mumbai, India',
          skills: parsedUser.skills || 'Teaching, Web Development, Communication',
          bio: parsedUser.bio || 'Passionate volunteer looking to make a positive impact in the community.',
        });

        // Fetch dashboard data
        await fetchDashboardData(parsedUser);
      } catch (error) {
        console.error('Error loading user data:', error);
        toast.error('Failed to load user data');
      }
    };

    fetchData();
  }, [navigate]);

  const fetchDashboardData = async (userData: any) => {
    try {
      setLoading(true);
      const response = await api.get('/volunteer/dashboard');
      
      // Debug: Log the response
      console.log('Dashboard API Response:', response.data);
      
      if (response.data && response.data.data) {
        setDashboardData(response.data.data);
      } else {
        // Handle different response structure
        setDashboardData(response.data || {
          stats: {
            totalOpportunities: 0,
            totalCertificates: 0,
            totalHours: 0,
            impactScore: 0
          },
          myOpportunities: [],
          myCertificates: []
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
      
      // Fallback to localStorage data
      const savedOpportunities = JSON.parse(localStorage.getItem('opportunities') || '[]');
      const userOpportunities = savedOpportunities
        .map((opp: any) => {
          const application = opp.applications?.find((app: any) => app.userId === userData.id);
          return application && application.status === 'accepted' ? {
            _id: opp.id || opp._id,
            title: opp.title,
            organization: opp.organization,
            status: 'active',
            hoursCompleted: 0,
            totalHours: opp.volunteersNeeded || 10,
            nextSession: opp.date || opp.startDate,
            applicationStatus: application.status
          } : null;
        })
        .filter(Boolean);
      
      setDashboardData({
        stats: {
          totalOpportunities: userOpportunities.length,
          totalCertificates: 0,
          totalHours: userOpportunities.reduce((sum: number, opp: any) => sum + (opp.hoursCompleted || 0), 0),
          impactScore: userOpportunities.length * 50
        },
        myOpportunities: userOpportunities,
        myCertificates: []
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      toast.success('Profile picture updated!');
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = { ...user, ...editFormData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleDeleteCertificate = async (certificateId: string) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      try {
        await api.delete(`/volunteer/certificates/${certificateId}`);
        toast.success('Certificate deleted successfully');
        // Refresh dashboard data
        if (user) {
          await fetchDashboardData(user);
        }
      } catch (error) {
        console.error('Error deleting certificate:', error);
        toast.error('Failed to delete certificate');
      }
    }
  };

  const stats = [
    { 
      label: "Total Hours", 
      value: dashboardData?.stats?.totalHours || 0, 
      icon: <Clock className="w-5 h-5" /> 
    },
    { 
      label: "Opportunities Joined", 
      value: dashboardData?.stats?.totalOpportunities || 0, 
      icon: <Calendar className="w-5 h-5" /> 
    },
    { 
      label: "Certificates Earned", 
      value: dashboardData?.stats?.totalCertificates || 0, 
      icon: <Award className="w-5 h-5" /> 
    },
    { 
      label: "Impact Score", 
      value: dashboardData?.stats?.impactScore || 0, 
      icon: <Heart className="w-5 h-5" /> 
    },
  ];

  if (!user || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#2e7d32] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f5e9] to-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl text-[#2e7d32] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Volunteer Dashboard
          </h1>
          <p className="text-gray-600">Welcome back, {user.name}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl text-[#2e7d32]">{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#e8f5e9] flex items-center justify-center text-[#2e7d32]">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="opportunities" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid lg:grid-cols-3">
            <TabsTrigger value="opportunities">My Opportunities</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#2e7d32]">My Opportunities</CardTitle>
                <CardDescription>Opportunities where you've been accepted</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData?.myOpportunities && dashboardData.myOpportunities.length > 0 ? (
                    dashboardData.myOpportunities.map((opportunity) => (
                      <Card key={opportunity._id} className="border-l-4 border-l-[#2e7d32]">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg text-[#2e7d32]">
                                  {opportunity.title || opportunity.opportunityId?.title}
                                </h3>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  opportunity.applicationStatus === 'accepted' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {opportunity.applicationStatus === 'accepted' ? 'Approved' : 'Pending'}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">
                                {opportunity.organization || opportunity.opportunityId?.organization}
                              </p>

                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-gray-600">Progress</span>
                                  <span className="text-[#2e7d32]">
                                    {opportunity.hoursCompleted || 0}/{opportunity.totalHours || 10} hours
                                  </span>
                                </div>
                                <Progress
                                  value={((opportunity.hoursCompleted || 0) / (opportunity.totalHours || 10)) * 100}
                                  className="h-2"
                                />
                              </div>

                              {opportunity.nextSession && (
                                <p className="text-sm text-gray-600 mt-2">
                                  <Calendar className="inline w-4 h-4 mr-1" />
                                  Next session: {new Date(opportunity.nextSession).toLocaleDateString()}
                                </p>
                              )}
                            </div>

                            <Button
                              variant="outline"
                              className="border-[#2e7d32] text-[#2e7d32] hover:bg-[#e8f5e9] rounded-full"
                            >
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">No opportunities joined yet</p>
                      <Button
                        onClick={() => navigate('/opportunities')}
                        className="bg-[#2e7d32] hover:bg-[#1b5e20] text-white rounded-full"
                      >
                        Browse Opportunities
                      </Button>
                    </div>
                  )}
                </div>

                {dashboardData?.myOpportunities && dashboardData.myOpportunities.length > 0 && (
                  <div className="mt-6 text-center">
                    <Button
                      onClick={() => navigate('/opportunities')}
                      className="bg-[#2e7d32] hover:bg-[#1b5e20] text-white rounded-full"
                    >
                      Browse More Opportunities
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab - FIXED: Full profile section added back */}
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-[#2e7d32]">My Profile</CardTitle>
                    <CardDescription>Manage your personal information</CardDescription>
                  </div>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant="outline"
                    className="border-[#2e7d32] text-[#2e7d32] hover:bg-[#e8f5e9] rounded-full"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {!isEditing ? (
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex flex-col items-center">
                        <Avatar className="w-32 h-32 mb-4">
                          <AvatarImage src={profileImage} />
                          <AvatarFallback className="bg-[#2e7d32] text-white text-3xl">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <label htmlFor="profile-upload" className="cursor-pointer">
                          <div className="flex items-center gap-2 text-[#2e7d32] hover:underline">
                            <Upload className="w-4 h-4" />
                            <span className="text-sm">Upload Photo</span>
                          </div>
                          <input
                            id="profile-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div className="flex-1 space-y-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <User className="w-4 h-4 text-[#2e7d32]" />
                            <span className="text-sm text-gray-600">Full Name</span>
                          </div>
                          <p className="text-lg">{editFormData.name}</p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Mail className="w-4 h-4 text-[#2e7d32]" />
                            <span className="text-sm text-gray-600">Email</span>
                          </div>
                          <p className="text-lg">{editFormData.email}</p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Phone className="w-4 h-4 text-[#2e7d32]" />
                            <span className="text-sm text-gray-600">Phone</span>
                          </div>
                          <p className="text-lg">{editFormData.phone}</p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-[#2e7d32]" />
                            <span className="text-sm text-gray-600">Location</span>
                          </div>
                          <p className="text-lg">{editFormData.location}</p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Award className="w-4 h-4 text-[#2e7d32]" />
                            <span className="text-sm text-gray-600">Skills</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {editFormData.skills.split(',').map((skill, index) => (
                              <Badge key={index} variant="outline">
                                {skill.trim()}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <User className="w-4 h-4 text-[#2e7d32]" />
                            <span className="text-sm text-gray-600">Bio</span>
                          </div>
                          <p className="text-gray-700">{editFormData.bio}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleEditSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-name">Full Name</Label>
                        <Input
                          id="edit-name"
                          value={editFormData.name}
                          onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                          className="rounded-full"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="edit-email">Email</Label>
                        <Input
                          id="edit-email"
                          type="email"
                          value={editFormData.email}
                          onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                          className="rounded-full"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="edit-phone">Phone</Label>
                        <Input
                          id="edit-phone"
                          value={editFormData.phone}
                          onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                          className="rounded-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="edit-location">Location</Label>
                        <Input
                          id="edit-location"
                          value={editFormData.location}
                          onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                          className="rounded-full"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-skills">Skills (comma separated)</Label>
                      <Input
                        id="edit-skills"
                        value={editFormData.skills}
                        onChange={(e) => setEditFormData({ ...editFormData, skills: e.target.value })}
                        className="rounded-full"
                        placeholder="Teaching, Web Development, Communication"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-bio">Bio</Label>
                      <Input
                        id="edit-bio"
                        value={editFormData.bio}
                        onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })}
                        className="rounded-full"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="bg-[#2e7d32] hover:bg-[#1b5e20] text-white rounded-full"
                    >
                      Save Changes
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#2e7d32]">My Certificates</CardTitle>
                <CardDescription>View and download your earned certificates</CardDescription>
              </CardHeader>
              <CardContent>
                {dashboardData?.myCertificates && dashboardData.myCertificates.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dashboardData.myCertificates.map((cert: Certificate) => (
                      <Card key={cert._id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-[#e8f5e9] flex items-center justify-center flex-shrink-0">
                              <Award className="w-8 h-8 text-[#2e7d32]" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg text-[#2e7d32] mb-1">{cert.title}</h3>
                              <p className="text-sm text-gray-600 mb-2">
                                {cert.program} - {cert.year}
                              </p>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-[#2e7d32] text-[#2e7d32] hover:bg-[#e8f5e9] rounded-full"
                                  onClick={() => window.open(cert.downloadUrl, '_blank')}
                                >
                                  Download
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-red-500 text-red-500 hover:bg-red-50 rounded-full"
                                  onClick={() => handleDeleteCertificate(cert._id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No certificates earned yet</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Complete volunteer opportunities to earn certificates
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};