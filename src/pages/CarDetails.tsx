import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Fuel, 
  Settings, 
  Phone, 
  User, 
  Eye,
  Heart,
  Share2,
  Car,
  Gauge,
  Palette
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import car1Image from '@/assets/car-1.jpg';
import car2Image from '@/assets/car-2.jpg';
import car3Image from '@/assets/car-3.jpg';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState<any>(null);
  const [sellerInfo, setSellerInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        
        // Fetch car from database
        const { data: carData, error: carError } = await supabase
          .from('cars')
          .select('*')
          .eq('id', id)
          .eq('status', 'active')
          .single();

        if (carError) throw carError;

        if (carData) {
          // Fetch seller profile info
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', carData.user_id)
            .single();

          if (profileError) {
            console.error('Profile fetch error:', profileError);
          }

          setCar({
            ...carData,
            image: carData.photos?.[0] || car1Image,
            fuelType: carData.fuel_type,
            daysAgo: Math.floor((new Date().getTime() - new Date(carData.created_at).getTime()) / (1000 * 3600 * 24))
          });

          setSellerInfo({
            name: profileData?.full_name || 'Uwagurisha',
            phone: profileData?.phone || 'Ntamubagazohereza'
          });
        }
      } catch (error) {
        console.error('Error fetching car details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCarDetails();
    }
  }, [id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('rw-RW').format(price) + ' Frw';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Gukurura amakuru...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Imodoka ntiyabonetse</h1>
            <Button onClick={() => navigate('/browse')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Garuka mu bindi
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="outline" 
          onClick={() => navigate('/browse')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Garuka mu bindi
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Car Image */}
            <div className="relative rounded-lg overflow-hidden mb-6">
              <img 
                src={car.image} 
                alt={`${car.make} ${car.model}`}
                className="w-full h-96 object-cover"
              />
              {car.featured && (
                <Badge className="absolute top-4 left-4 bg-accent hover:bg-accent text-accent-foreground">
                  Imodoka nziza
                </Badge>
              )}
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button variant="ghost" size="icon" className="bg-card/80 hover:bg-card backdrop-blur-sm">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="bg-card/80 hover:bg-card backdrop-blur-sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Car Info */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  {car.make} {car.model} {car.year}
                </CardTitle>
                <p className="text-3xl font-bold text-primary">
                  {formatPrice(car.price)}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{car.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{car.year}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Settings className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{car.transmission}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Fuel className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{car.fuel_type || car.fuelType}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Gauge className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Kilometres</p>
                      <p className="text-sm text-muted-foreground">{car.mileage || 'Ntanziko'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Ubwigenge</p>
                      <p className="text-sm text-muted-foreground">{car.condition}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Yashyizweho</p>
                      <p className="text-sm text-muted-foreground">hashize iminsi {car.daysAgo}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Ibisobanuro</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {car.description || 'Nta bisobanuro byashyizweho kuri iyi modoka.'}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Seller Info */}
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Uwayigurisha
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-foreground">{sellerInfo?.name}</p>
                    <p className="text-sm text-muted-foreground">Umucuruzi</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Button className="w-full" size="lg">
                      <Phone className="h-4 w-4 mr-2" />
                      Hamagara: {sellerInfo?.phone}
                    </Button>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground text-center">
                      Menya neza mbere yo gukodesha cyangwa gushyura amafaranga
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CarDetails;