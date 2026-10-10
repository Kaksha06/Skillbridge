import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Mail, User, MessageSquare, Send, Phone, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
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
    setLoading(true);

    // Mock API call - Replace with actual API
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2e7d32] to-[#4caf50] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Contact Us
          </h1>
          <p className="text-xl text-[#e8f5e9]">
            Have questions? We'd love to hear from you
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#e8f5e9] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-[#e8f5e9] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-[#2e7d32]" />
                    </div>
                    <div>
                      <h3 className="text-lg text-[#2e7d32] mb-2">Email</h3>
                      <a href="mailto:info@skillbridge.org" className="text-gray-600 hover:text-[#2e7d32] block">
                        info@skillbridge.org
                      </a>
                      <a href="mailto:support@skillbridge.org" className="text-gray-600 hover:text-[#2e7d32] block">
                        support@skillbridge.org
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-[#e8f5e9] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-[#2e7d32]" />
                    </div>
                    <div>
                      <h3 className="text-lg text-[#2e7d32] mb-2">Phone</h3>
                      <a href="tel:+1234567890" className="text-gray-600 hover:text-[#2e7d32] block">
                        +1 (234) 567-890
                      </a>
                      <a href="tel:+1234567891" className="text-gray-600 hover:text-[#2e7d32] block">
                        +1 (234) 567-891
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-[#e8f5e9] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[#2e7d32]" />
                    </div>
                    <div>
                      <h3 className="text-lg text-[#2e7d32] mb-2">Address</h3>
                      <p className="text-gray-600">
                        123 Impact Street<br />
                        Innovation District<br />
                        City, Country - 12345
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-[#e8f5e9] flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-[#2e7d32]" />
                    </div>
                    <div>
                      <h3 className="text-lg text-[#2e7d32] mb-2">Office Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday<br />
                        9:00 AM - 6:00 PM<br />
                        <span className="text-sm">(Closed on weekends)</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-[#2e7d32]">Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          className="pl-10 rounded-full"
                          required
                        />
                      </div>
                    </div>

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
                      <Label htmlFor="subject">Subject</Label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          placeholder="What is this regarding?"
                          value={formData.subject}
                          onChange={handleChange}
                          className="pl-10 rounded-full"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us more about your inquiry..."
                        value={formData.message}
                        onChange={handleChange}
                        className="rounded-lg min-h-32 resize-none"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#2e7d32] hover:bg-[#1b5e20] text-white rounded-full"
                      disabled={loading}
                    >
                      {loading ? (
                        'Sending...'
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* FAQ or Additional Info */}
              <Card className="mt-6 bg-[#e8f5e9] border-[#2e7d32]">
                <CardContent className="p-6">
                  <h3 className="text-lg text-[#2e7d32] mb-3">Quick Response</h3>
                  <p className="text-gray-600 text-sm">
                    We typically respond to all inquiries within 24-48 hours during business days. 
                    For urgent matters, please call our office directly.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
