import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Target, Heart, Users, Globe, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export const About = () => {
  const navigate = useNavigate();

  const missions = [
    {
      icon: <Target className="w-12 h-12 text-[#2e7d32]" />,
      title: 'Our Mission',
      description: 'To bridge the gap between passionate volunteers and impactful NGOs, creating a seamless platform for social change and community development.',
    },
    {
      icon: <Heart className="w-12 h-12 text-[#2e7d32]" />,
      title: 'Our Vision',
      description: 'A world where every individual can easily contribute their skills and time to causes they care about, creating lasting positive impact.',
    },
    {
      icon: <Users className="w-12 h-12 text-[#2e7d32]" />,
      title: 'Our Values',
      description: 'Transparency, collaboration, and inclusivity. We believe in empowering communities through meaningful connections and sustainable partnerships.',
    },
    {
      icon: <Globe className="w-12 h-12 text-[#2e7d32]" />,
      title: 'Our Impact',
      description: 'Connecting thousands of volunteers with hundreds of NGOs across multiple cities, creating measurable social impact in communities worldwide.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2e7d32] to-[#4caf50] text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            About SkillBridge
          </h1>
          <p className="text-xl text-[#e8f5e9] max-w-3xl mx-auto">
            Empowering communities through meaningful connections between volunteers and NGOs. Together, we create lasting social impact.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl text-[#2e7d32] mb-6 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Our Story
          </h2>
          <div className="space-y-4 text-lg text-gray-600 text-center">
            <p>
              SkillBridge was born from a simple observation: countless passionate individuals want to volunteer,
              and numerous NGOs need skilled help, yet they struggle to find each other.
            </p>
            <p>
              Founded in 2023, our platform has grown to become a trusted bridge connecting volunteers with
              organizations working on causes they care about. We've facilitated thousands of meaningful
              connections, resulting in tangible impact across communities.
            </p>
            <p>
              What started as a small initiative has evolved into a movement of changemakers committed to
              creating a better world through collaboration, skill-sharing, and dedicated service.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#e8f5e9] to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl text-[#2e7d32] mb-12 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
            What Drives Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {missions.map((mission, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">{mission.icon}</div>
                  <h3 className="text-xl mb-3 text-[#2e7d32]">{mission.title}</h3>
                  <p className="text-gray-600">{mission.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl text-[#2e7d32] mb-12 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Get In Touch
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-[#e8f5e9] flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-[#2e7d32]" />
                </div>
                <h3 className="text-xl mb-2 text-[#2e7d32]">Email Us</h3>
                <a href="mailto:info@skillbridge.org" className="text-gray-600 hover:text-[#2e7d32]">
                  info@skillbridge.org
                </a>
                <br />
                <a href="mailto:support@skillbridge.org" className="text-gray-600 hover:text-[#2e7d32]">
                  support@skillbridge.org
                </a>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-[#e8f5e9] flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-[#2e7d32]" />
                </div>
                <h3 className="text-xl mb-2 text-[#2e7d32]">Call Us</h3>
                <a href="tel:+1234567890" className="text-gray-600 hover:text-[#2e7d32]">
                  +1 (234) 567-890
                </a>
                <br />
                <span className="text-sm text-gray-500">Mon-Fri: 9AM - 6PM</span>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-[#e8f5e9] flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-[#2e7d32]" />
                </div>
                <h3 className="text-xl mb-2 text-[#2e7d32]">Visit Us</h3>
                <p className="text-gray-600">
                  123 Impact Street<br />
                  Innovation District<br />
                  City, Country - 12345
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#2e7d32] to-[#4caf50] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Ready to Join Our Community?
          </h2>
          <p className="text-xl mb-8 text-[#e8f5e9]">
            Whether you're a volunteer looking to make a difference or an NGO seeking skilled support, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/register')}
              size="lg"
              className="bg-white text-[#2e7d32] hover:bg-[#e8f5e9] rounded-full"
            >
              Join Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={() => navigate('/contact')}
              size="lg"
              variant="outline"
              className="bg-white text-[#2e7d32] hover:bg-[#e8f5e9] rounded-full"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
