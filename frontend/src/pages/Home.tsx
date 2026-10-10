import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Users, Building, Target, Award, ArrowRight, Heart, Globe, Handshake } from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Users className="w-12 h-12 text-[#2e7d32]" />,
      title: 'Find Volunteers',
      description: 'Connect with skilled volunteers ready to make a difference in your cause.',
    },
    {
      icon: <Building className="w-12 h-12 text-[#2e7d32]" />,
      title: 'Discover NGOs',
      description: 'Explore organizations working on causes you care about and join their mission.',
    },
    {
      icon: <Target className="w-12 h-12 text-[#2e7d32]" />,
      title: 'Match Skills',
      description: 'Our platform intelligently matches volunteers with opportunities that fit their skills.',
    },
    {
      icon: <Award className="w-12 h-12 text-[#2e7d32]" />,
      title: 'Track Impact',
      description: 'Monitor your volunteer hours and see the real impact you\'re making in communities.',
    },
  ];

  const stats = [
    { number: '10K+', label: 'Active Volunteers' },
    { number: '500+', label: 'NGO Partners' },
    { number: '50K+', label: 'Hours Volunteered' },
    { number: '100+', label: 'Cities Covered' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#2e7d32] to-[#4caf50] text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Bridge Your Skills with Impact
              </h1>
              <p className="text-xl mb-8 text-[#e8f5e9]">
                Connect volunteers with NGOs to create meaningful change. Join thousands making a difference today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => navigate('/register')}
                  size="lg"
                  className="bg-white text-[#2e7d32] hover:bg-[#e8f5e9] rounded-full"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  onClick={() => navigate('/register')}
                  size="lg"
                  className="bg-white text-[#2e7d32] hover:bg-[#e8f5e9] rounded-full"
                >
                  Browse opportunities
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Heart className="w-40 h-40 text-white" />
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#1b5e20] rounded-full flex items-center justify-center">
                  <Globe className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#1b5e20] rounded-full flex items-center justify-center">
                  <Handshake className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#e8f5e9]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl text-[#2e7d32] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-[#2e7d32] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Why Choose SkillBridge?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make it easy to connect, collaborate, and create lasting impact in communities worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl mb-2 text-[#2e7d32]">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#e8f5e9] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-[#2e7d32] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-[#2e7d32] text-white flex items-center justify-center mx-auto mb-4 text-2xl">
                1
              </div>
              <h3 className="text-xl mb-2 text-[#2e7d32]">Create Your Profile</h3>
              <p className="text-gray-600">
                Sign up as a volunteer or NGO and complete your profile with skills and interests.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-[#2e7d32] text-white flex items-center justify-center mx-auto mb-4 text-2xl">
                2
              </div>
              <h3 className="text-xl mb-2 text-[#2e7d32]">Find Matches</h3>
              <p className="text-gray-600">
                Browse opportunities or volunteers that align with your goals and skills.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-[#2e7d32] text-white flex items-center justify-center mx-auto mb-4 text-2xl">
                3
              </div>
              <h3 className="text-xl mb-2 text-[#2e7d32]">Make Impact</h3>
              <p className="text-gray-600">
                Connect, collaborate, and create lasting positive change in communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#2e7d32] to-[#4caf50] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 text-[#e8f5e9]">
            Join our community of volunteers and NGOs working together for social impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/register')}
              size="lg"
              className="bg-white text-[#2e7d32] hover:bg-[#e8f5e9] rounded-full"
            >
              Join as Volunteer
            </Button>
            <Button
              onClick={() => navigate('/register')}
              size="lg"
              className="bg-white text-[#2e7d32] hover:bg-[#e8f5e9] rounded-full"
            >
              Register as NGO
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
