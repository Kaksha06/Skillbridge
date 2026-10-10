import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Search, MapPin, Calendar, Users, Filter } from 'lucide-react';
import { toast } from 'sonner';

interface Opportunity {
  id: string;
  title: string;
  organization: string;
  category: string;
  location: string;
  description: string;
  volunteersNeeded: number;
  volunteersJoined: number;
  date: string;
  skills: string[];
}

export const Opportunities = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const loadMockData = () => {
    const mockOpportunities: Opportunity[] = [
      {
        id: '1',
        title: 'Teaching Underprivileged Children',
        organization: 'Education for All',
        category: 'education',
        location: 'Mumbai, India',
        description: 'Help teach basic mathematics and English to children from underprivileged communities. Make a lasting impact on young minds.',
        volunteersNeeded: 10,
        volunteersJoined: 7,
        date: '2025-11-15',
        skills: ['Teaching', 'Communication', 'Patience'],
      },
      {
        id: '2',
        title: 'Beach Cleanup Drive',
        organization: 'Green Earth Foundation',
        category: 'environment',
        location: 'Goa, India',
        description: 'Join us for a weekend beach cleanup initiative. Help protect marine life and keep our beaches clean.',
        volunteersNeeded: 50,
        volunteersJoined: 32,
        date: '2025-11-20',
        skills: ['Physical Fitness', 'Team Work'],
      },
      {
        id: '3',
        title: 'Medical Camp Organization',
        organization: 'Health for Everyone',
        category: 'healthcare',
        location: 'Delhi, India',
        description: 'Assist in organizing a free medical camp for rural communities. Help with registration, crowd management, and basic first aid.',
        volunteersNeeded: 15,
        volunteersJoined: 8,
        date: '2025-11-25',
        skills: ['Healthcare', 'Organization', 'Communication'],
      },
    ];

    console.log('Loading mock opportunities data');
    localStorage.setItem('opportunities', JSON.stringify(mockOpportunities));
    setOpportunities(mockOpportunities);
    setFilteredOpportunities(mockOpportunities);
    setLoading(false);
  };

  useEffect(() => {
    // Try to load opportunities from localStorage first
    const savedOpportunities = localStorage.getItem('opportunities');
    
    if (savedOpportunities) {
      try {
        const parsedOpportunities = JSON.parse(savedOpportunities);
        console.log('Loaded opportunities from localStorage:', parsedOpportunities);
        
        // Ensure all required fields are present
        const validatedOpportunities = parsedOpportunities.map((opp: any) => ({
          id: opp.id || Date.now().toString(),
          title: opp.title || 'Untitled Opportunity',
          organization: opp.organization || 'Unknown Organization',
          category: opp.category || 'other',
          location: opp.location || 'Location not specified',
          description: opp.description || 'No description available',
          volunteersNeeded: Number(opp.volunteersNeeded) || 1,
          volunteersJoined: Number(opp.volunteersJoined) || 0,
          date: opp.date || new Date().toISOString().split('T')[0],
          skills: Array.isArray(opp.skills) ? opp.skills : 
                 typeof opp.skills === 'string' ? opp.skills.split(',').map((s: string) => s.trim()) : []
        }));
        
        setOpportunities(validatedOpportunities);
        setFilteredOpportunities(validatedOpportunities);
      } catch (error) {
        console.error('Error parsing opportunities:', error);
        // Fall back to mock data if there's an error
        loadMockData();
      }
      setLoading(false);
    } else {
      loadMockData();
    }
  
  }, []);

  useEffect(() => {
    let filtered = opportunities;

    if (searchTerm) {
      filtered = filtered.filter(
        (opp) =>
          opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          opp.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
          opp.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((opp) => opp.category === selectedCategory);
    }

    setFilteredOpportunities(filtered);
  }, [searchTerm, selectedCategory, opportunities]);

  const handleJoin = (opportunityId: string, title: string) => {
    const user = localStorage.getItem('user');
    if (!user) {
      toast.error('Please login to join opportunities');
      return;
    }

    toast.success(`Successfully joined: ${title}`);
    // Add API call here to join opportunity
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      education: 'bg-blue-100 text-blue-800',
      healthcare: 'bg-red-100 text-red-800',
      environment: 'bg-green-100 text-green-800',
      'animal-welfare': 'bg-purple-100 text-purple-800',
      community: 'bg-yellow-100 text-yellow-800',
      'disaster-relief': 'bg-orange-100 text-orange-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#2e7d32] to-[#4caf50] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Volunteer Opportunities
          </h1>
          <p className="text-xl text-[#e8f5e9]">
            Find the perfect opportunity to make a difference
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-full"
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="rounded-full">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="environment">Environment</SelectItem>
                  <SelectItem value="animal-welfare">Animal Welfare</SelectItem>
                  <SelectItem value="community">Community Development</SelectItem>
                  <SelectItem value="disaster-relief">Disaster Relief</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities Grid */}
      <section className="py-12 px-4 bg-gradient-to-br from-[#e8f5e9] to-white">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-[#2e7d32] border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading opportunities...</p>
              </div>
            </div>
          ) : filteredOpportunities.length === 0 ? (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl text-gray-700 mb-2">No opportunities found</h2>
                <p className="text-gray-500 mb-6">There are currently no volunteer opportunities available.</p>
                <Button 
                  onClick={() => {
                    localStorage.removeItem('opportunities');
                    window.location.reload();
                  }}
                  variant="outline"
                  className="text-[#2e7d32] border-[#2e7d32] hover:bg-[#e8f5e9]"
                >
                  Reset to Demo Data
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOpportunities.map((opportunity) => (
                <Card
                  key={opportunity.id}
                  className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={getCategoryColor(opportunity.category)}>
                        {opportunity.category.replace('-', ' ')}
                      </Badge>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(opportunity.date).toLocaleDateString()}
                      </div>
                    </div>
                    <CardTitle className="text-[#2e7d32]">{opportunity.title}</CardTitle>
                    <CardDescription>{opportunity.organization}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 line-clamp-3">{opportunity.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-[#2e7d32]" />
                        {opportunity.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2 text-[#2e7d32]" />
                        {opportunity.volunteersJoined}/{opportunity.volunteersNeeded} volunteers
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {opportunity.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      onClick={() => handleJoin(opportunity.id, opportunity.title)}
                      className="w-full bg-[#2e7d32] hover:bg-[#1b5e20] text-white rounded-full"
                    >
                      Join Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
// Opportunities.tsx
// import React, { useState, useEffect } from 'react';
// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
// import { Badge } from '../components/ui/badge';
// import { Search, MapPin, Calendar, Users, Filter } from 'lucide-react';
// import { toast } from 'sonner';
// import api from '../services/api'; // axios instance

// interface Opportunity {
//   [x: string]: any;
//   _id?: string;
//   id?: string;
//   title: string;
//   organization?: string;
//   category: string;
//   location: string;
//   description: string;
//   volunteersNeeded: number;
//   volunteersJoined: number;
//   date: string;
//   skills: string[];
//   applications?: Array<{ id: string; userId: string; name?: string; status: string }>;
// }

// export const Opportunities = () => {
//   const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
//   const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [loading, setLoading] = useState(true);

//   // load from API first, fallback to localStorage demo
//   const loadFromApi = async () => {
//     try {
//       const res = await api.get('/opportunities');
//       const data = res.data?.data || res.data;
//       if (Array.isArray(data)) {
//         setOpportunities(data);
//         setFilteredOpportunities(data);
//         localStorage.setItem('opportunities', JSON.stringify(data));
//         setLoading(false);
//         return;
//       }
//     } catch (error) {
//       console.warn('Opportunities API not available, using localStorage/demo', error);
//     }
//     loadDemo();
//   };

//   const loadDemo = () => {
//     const saved = localStorage.getItem('opportunities');
//     if (saved) {
//       try {
//         const parsed = JSON.parse(saved);
//         setOpportunities(parsed);
//         setFilteredOpportunities(parsed);
//         setLoading(false);
//         return;
//       } catch (e) {
//         console.error('Invalid stored opportunities', e);
//       }
//     }

//     // fallback demo
//     const mockOpportunities: Opportunity[] = [
//       // ... same demo objects but with consistent id/_id fields
//       {
//         _id: '1',
//         title: 'Teaching Underprivileged Children',
//         organization: 'Education for All',
//         category: 'education',
//         location: 'Mumbai, India',
//         description: 'Help teach basic mathematics and English to children from underprivileged communities.',
//         volunteersNeeded: 10,
//         volunteersJoined: 7,
//         date: '2025-11-15',
//         skills: ['Teaching', 'Communication', 'Patience'],
//         applications: []
//       },
//       {
//         _id: '2',
//         title: 'Beach Cleanup Drive',
//         organization: 'Green Earth Foundation',
//         category: 'environment',
//         location: 'Goa, India',
//         description: 'Join us for a weekend beach cleanup initiative.',
//         volunteersNeeded: 50,
//         volunteersJoined: 32,
//         date: '2025-11-20',
//         skills: ['Physical Fitness', 'Team Work'],
//         applications: []
//       },
//       {
//         _id: '3',
//         title: 'Medical Camp Organization',
//         organization: 'Health for Everyone',
//         category: 'healthcare',
//         location: 'Delhi, India',
//         description: 'Assist in organizing a free medical camp for rural communities.',
//         volunteersNeeded: 15,
//         volunteersJoined: 8,
//         date: '2025-11-25',
//         skills: ['Healthcare', 'Organization', 'Communication'],
//         applications: []
//       },
//     ];

//     setOpportunities(mockOpportunities);
//     setFilteredOpportunities(mockOpportunities);
//     localStorage.setItem('opportunities', JSON.stringify(mockOpportunities));
//     setLoading(false);
//   };

//   useEffect(() => {
//     loadFromApi();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     let filtered = opportunities;
//     if (searchTerm) {
//       filtered = filtered.filter(
//         (opp) =>
//           (opp.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
//           (opp.organization || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
//           (opp.description || '').toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (selectedCategory !== 'all') {
//       filtered = filtered.filter((opp) => opp.category === selectedCategory);
//     }
//     setFilteredOpportunities(filtered);
//   }, [searchTerm, selectedCategory, opportunities]);

//   const handleJoin = async (opportunity: Opportunity) => {
//     const userStr = localStorage.getItem('user');
//     if (!userStr) {
//       toast.error('Please login to join opportunities');
//       return;
//     }
//     const user = JSON.parse(userStr);
//     // Try API apply
//     try {
//       const oppId = opportunity._id || opportunity.id;
//       if (!oppId) return toast.error('Opportunity id missing');

//       const res = await api.post(`/opportunities/${oppId}/apply`);
//       const application = res.data?.data || res.data;

//       // update local state (optimistic)
//       const updated = opportunities.map((o) => {
//         const idMatch = (o._id || o.id) === oppId;
//         if (!idMatch) return o;
//         const apps = o.applications ? [...o.applications, application] : [application];
//         const volunteersJoined = o.acceptedVolunteers?.length || 0;
//         return { ...o, applications: apps, volunteersJoined };
//       });

//       setOpportunities(updated);
//       setFilteredOpportunities(updated);
//       localStorage.setItem('opportunities', JSON.stringify(updated));

//       toast.success('Application submitted (pending approval)');
//     } catch (err) {
//       console.error('Error applying to opportunity', err);
//       toast.error('Failed to apply — please try again');
//     }
//   };

//   const getCategoryColor = (category: string) => {
//     const colors: { [key: string]: string } = {
//       education: 'bg-blue-100 text-blue-800',
//       healthcare: 'bg-red-100 text-red-800',
//       environment: 'bg-green-100 text-green-800',
//       'animal-welfare': 'bg-purple-100 text-purple-800',
//       community: 'bg-yellow-100 text-yellow-800',
//       'disaster-relief': 'bg-orange-100 text-orange-800',
//     };
//     return colors[category] || 'bg-gray-100 text-gray-800';
//   };

//   return (
//     <div className="min-h-screen">
//       {/* UI omitted for brevity — keep existing markup */}
//       <section className="py-12 px-4 bg-gradient-to-br from-[#e8f5e9] to-white">
//         <div className="max-w-7xl mx-auto">
//           {loading ? (
//             <div>Loading...</div>
//           ) : filteredOpportunities.length === 0 ? (
//             <div>No opportunities found — reset demo</div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredOpportunities.map((opportunity) => (
//                 <Card key={opportunity._id || opportunity.id}>
//                   <CardHeader>
//                     {/* header */}
//                     <CardTitle className="text-[#2e7d32]">{opportunity.title}</CardTitle>
//                     <CardDescription>{opportunity.organization}</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <p>{opportunity.description}</p>
//                     <div className="flex items-center text-sm text-gray-600">
//                       <Users className="w-4 h-4 mr-2 text-[#2e7d32]" />
//                       {(opportunity.volunteersJoined || 0)}/{opportunity.volunteersNeeded} volunteers
//                     </div>
//                     <div className="mt-4">
//                       <Button onClick={() => handleJoin(opportunity)} className="w-full bg-[#2e7d32] text-white rounded-full">
//                         Join Now
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Opportunities;

