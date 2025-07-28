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
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  CreditCard, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
}

interface Payment {
  id: string;
  amount: number;
  payment_method: string;
  payment_status: string;
  created_at: string;
  car: Car;
}

interface Profile {
  full_name: string;
  phone: string;
  email: string;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      // Fetch user cars
      const { data: carsData, error: carsError } = await supabase
        .from('cars')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (carsError) throw carsError;
      setCars(carsData || []);

      // Fetch user payments with car details
      const { data: paymentsData, error: paymentsError } = await supabase
        .from('payments')
        .select(`
          *,
          car:cars(*)
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (paymentsError) throw paymentsError;
      setPayments(paymentsData || []);

      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') throw profileError;
      setProfile(profileData);

    } catch (error: any) {
      toast({
        title: "Ikosa",
        description: "Ntibyakunze gutangira amakuru yawe. Gerageza ukundi.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCar = async (carId: string) => {
    try {
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', carId);

      if (error) throw error;

      setCars(cars.filter(car => car.id !== carId));
      toast({
        title: "Byagenze neza",
        description: "Imodoka yawe yasibwe ku rubuga.",
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

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Byishyuwe</Badge>;
      case 'pending':
        return <Badge variant="secondary">Tegereza</Badge>;
      case 'failed':
        return <Badge variant="destructive">Ntibyakunze</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">Turatangira amakuru yawe...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard yawe</h1>
            <p className="text-muted-foreground">Murakaza neza, {profile?.full_name || user?.email}</p>
          </div>
          <div className="flex space-x-4">
            <Button onClick={() => navigate('/sell')} variant="gradient">
              <Plus className="h-4 w-4 mr-2" />
              Tangaza Imodoka
            </Button>
            <Button onClick={signOut} variant="outline">
              Gusohoka
            </Button>
          </div>
        </div>

        <Tabs defaultValue="cars" className="space-y-6">
          <TabsList>
            <TabsTrigger value="cars">
              <Car className="h-4 w-4 mr-2" />
              Imodoka Zanjye ({cars.length})
            </TabsTrigger>
            <TabsTrigger value="payments">
              <CreditCard className="h-4 w-4 mr-2" />
              Payments ({payments.length})
            </TabsTrigger>
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Amakuru Yanjye
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cars" className="space-y-6">
            {cars.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Car className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nta modoka utangazeho</h3>
                  <p className="text-muted-foreground mb-4">
                    Tangira ugurisha imodoka yawe ubone amafaranga
                  </p>
                  <Button onClick={() => navigate('/sell')} variant="gradient">
                    <Plus className="h-4 w-4 mr-2" />
                    Tangaza Imodoka ya Mbere
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => (
                  <Card key={car.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">
                          {car.make} {car.model} ({car.year})
                        </CardTitle>
                        {getStatusBadge(car.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          {car.location}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(car.created_at).toLocaleDateString('rw-RW')}
                        </div>
                        <div className="text-lg font-semibold text-primary">
                          {car.price.toLocaleString()} Frw
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          Reba
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="h-4 w-4 mr-1" />
                          Hindura
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDeleteCar(car.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            {payments.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nta mahishyurwa</h3>
                  <p className="text-muted-foreground">
                    Imodoka zawe zitangazwa zizagaragara hano
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {payments.map((payment) => (
                  <Card key={payment.id}>
                    <CardContent className="py-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">
                            Payment - {payment.car?.make} {payment.car?.model}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(payment.created_at).toLocaleDateString('rw-RW')}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{payment.amount.toLocaleString()} Frw</div>
                          {getPaymentStatusBadge(payment.payment_status)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Amakuru y'ibanze</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{profile?.full_name || 'Ntamazina'}</div>
                    <div className="text-sm text-muted-foreground">Amazina</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{profile?.email || user?.email}</div>
                    <div className="text-sm text-muted-foreground">Email</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{profile?.phone || 'Ntatelefone'}</div>
                    <div className="text-sm text-muted-foreground">Telefone</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;