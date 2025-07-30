import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Car, 
  Users, 
  CreditCard, 
  Eye, 
  Edit, 
  Trash2, 
  Check, 
  X,
  BarChart3,
  Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  location: string;
  status: string;
  photos: string[];
  created_at: string;
  user_id: string;
}

interface User {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  created_at: string;
}

interface Payment {
  id: string;
  amount: number;
  payment_status: string;
  created_at: string;
  user_id: string;
  car_id: string;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCars: 0,
    activeCars: 0,
    totalUsers: 0,
    totalRevenue: 0,
    pendingCars: 0
  });

  // Check if user is admin (simplified check - in real app you'd have proper role management)
  const isAdmin = user?.email === 'admin@vuganacar.rw' || user?.email === 'iyizireanique16@gmail.com';

  useEffect(() => {
    if (user && isAdmin) {
      fetchAdminData();
    } else if (user && !isAdmin) {
      toast({
        title: "Nta bushobozi",
        description: "Ntushobora gufungura iyi page. Ugomba kuba admin.",
        variant: "destructive",
      });
      navigate('/dashboard');
    }
  }, [user, isAdmin, navigate]);

  const fetchAdminData = async () => {
    try {
      // Fetch all cars
      const { data: carsData, error: carsError } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      if (carsError) throw carsError;
      setCars(carsData || []);

      // Fetch all users from profiles
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (usersError) throw usersError;
      setUsers(usersData || []);

      // Fetch all payments
      const { data: paymentsData, error: paymentsError } = await supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false });

      if (paymentsError) throw paymentsError;
      setPayments(paymentsData || []);

      // Calculate stats
      const totalCars = carsData?.length || 0;
      const activeCars = carsData?.filter(car => car.status === 'active').length || 0;
      const pendingCars = carsData?.filter(car => car.status === 'pending').length || 0;
      const totalUsers = usersData?.length || 0;
      const totalRevenue = (paymentsData?.filter(p => p.payment_status === 'completed') || [])
        .reduce((sum, payment) => sum + payment.amount, 0);

      setStats({
        totalCars,
        activeCars,
        pendingCars,
        totalUsers,
        totalRevenue
      });

    } catch (error: any) {
      toast({
        title: "Ikosa",
        description: "Ntibyakunze gutangira amakuru. Gerageza ukundi.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCarStatusChange = async (carId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('cars')
        .update({ status: newStatus })
        .eq('id', carId);

      if (error) throw error;

      setCars(cars.map(car => 
        car.id === carId ? { ...car, status: newStatus } : car
      ));

      toast({
        title: "Byahinduwe",
        description: `Status y'imodoka yahinduwe kuri ${newStatus}`,
      });
    } catch (error: any) {
      toast({
        title: "Ikosa",
        description: "Ntibyakunze guhindura status. Gerageza ukundi.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCar = async (carId: string) => {
    if (!confirm("Urashaka rwose gusiba iyi modoka?")) return;

    try {
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', carId);

      if (error) throw error;

      setCars(cars.filter(car => car.id !== carId));
      toast({
        title: "Byasibwe",
        description: "Imodoka yasibwe ku rubuga.",
      });
    } catch (error: any) {
      toast({
        title: "Ikosa",
        description: "Ntibyakunze gusiba imodoka. Gerageza ukundi.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Igaragara</Badge>;
      case 'pending':
        return <Badge variant="secondary">Tegereza kwemezwa</Badge>;
      case 'sold':
        return <Badge className="bg-blue-100 text-blue-800">Yagurishijwe</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (!isAdmin) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          <Navigation />
          <div className="container mx-auto px-4 py-12">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground mb-4">Nta bushobozi</h1>
              <p className="text-muted-foreground">Ntushobora gufungura iyi page.</p>
            </div>
          </div>
          <Footer />
        </div>
      </ProtectedRoute>
    );
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          <Navigation />
          <div className="container mx-auto px-4 py-12">
            <div className="text-center">Turatangira amakuru y'admin...</div>
          </div>
          <Footer />
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Kugena ubuyobozi bw'urubuga</p>
            </div>
            <Button onClick={() => navigate('/sell')} variant="gradient">
              Ongeraho Imodoka
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Imodoka Zose</p>
                    <p className="text-2xl font-bold">{stats.totalCars}</p>
                  </div>
                  <Car className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Zigaragara</p>
                    <p className="text-2xl font-bold">{stats.activeCars}</p>
                  </div>
                  <Check className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Zitegereza</p>
                    <p className="text-2xl font-bold">{stats.pendingCars}</p>
                  </div>
                  <X className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Abakoresha</p>
                    <p className="text-2xl font-bold">{stats.totalUsers}</p>
                  </div>
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Amafaranga</p>
                    <p className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()} Frw</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="cars" className="space-y-6">
            <TabsList>
              <TabsTrigger value="cars">
                <Car className="h-4 w-4 mr-2" />
                Imodoka ({cars.length})
              </TabsTrigger>
              <TabsTrigger value="users">
                <Users className="h-4 w-4 mr-2" />
                Abakoresha ({users.length})
              </TabsTrigger>
              <TabsTrigger value="payments">
                <CreditCard className="h-4 w-4 mr-2" />
                Amafaranga ({payments.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cars" className="space-y-6">
              <div className="space-y-4">
                {cars.map((car) => (
                  <Card key={car.id}>
                    <CardContent className="py-4">
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <h3 className="font-semibold">
                            {car.make} {car.model} ({car.year})
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                            <span>{car.location}</span>
                            <span>{car.price.toLocaleString()} Frw</span>
                            <span>{new Date(car.created_at).toLocaleDateString('rw-RW')}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {getStatusBadge(car.status)}
                          <div className="flex space-x-2">
                            {car.status === 'pending' && (
                              <Button 
                                size="sm" 
                                onClick={() => handleCarStatusChange(car.id, 'active')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            {car.status === 'active' && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleCarStatusChange(car.id, 'pending')}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleDeleteCar(car.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <div className="space-y-4">
                {users.map((user) => (
                  <Card key={user.id}>
                    <CardContent className="py-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{user.full_name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                            <span>{user.email}</span>
                            <span>{user.phone}</span>
                            <span>{new Date(user.created_at).toLocaleDateString('rw-RW')}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="payments" className="space-y-6">
              <div className="space-y-4">
                {payments.map((payment) => (
                  <Card key={payment.id}>
                    <CardContent className="py-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{payment.amount.toLocaleString()} Frw</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                            <span>Status: {payment.payment_status}</span>
                            <span>{new Date(payment.created_at).toLocaleDateString('rw-RW')}</span>
                          </div>
                        </div>
                        <Badge 
                          className={
                            payment.payment_status === 'completed' 
                              ? "bg-green-100 text-green-800"
                              : payment.payment_status === 'pending'
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {payment.payment_status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;