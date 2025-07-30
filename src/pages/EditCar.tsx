import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Car, Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';

const EditCar = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [carLoading, setCarLoading] = useState(true);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    condition: '',
    transmission: '',
    fuelType: '',
    mileage: '',
    location: '',
    price: '',
    description: ''
  });

  useEffect(() => {
    if (id && user) {
      fetchCarData();
    }
  }, [id, user]);

  const fetchCarData = async () => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('id', id)
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;

      setFormData({
        make: data.make,
        model: data.model,
        year: data.year.toString(),
        condition: data.condition,
        transmission: data.transmission,
        fuelType: data.fuel_type,
        mileage: data.mileage || '',
        location: data.location,
        price: data.price.toString(),
        description: data.description || ''
      });
    } catch (error: any) {
      toast({
        title: "Ikosa",
        description: "Ntibyakunze gutangira amakuru y'imodoka. Gerageza ukundi.",
        variant: "destructive",
      });
      navigate('/dashboard');
    } finally {
      setCarLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.price || parseInt(formData.price) < 100000) {
      toast({
        title: "Ikosa", 
        description: "Igiciro cy'imodoka kigomba kuba gifite byibuze 100,000 Frw.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('cars')
        .update({
          make: formData.make,
          model: formData.model,
          year: parseInt(formData.year),
          condition: formData.condition,
          transmission: formData.transmission,
          fuel_type: formData.fuelType,
          mileage: formData.mileage,
          location: formData.location,
          price: parseInt(formData.price),
          description: formData.description,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Byahinduwe!",
        description: "Amakuru y'imodoka yawe yahindutse neza.",
      });

      navigate('/dashboard');

    } catch (error: any) {
      toast({
        title: "Ikosa",
        description: "Ntibyakunze guhindura amakuru y'imodoka yawe. Gerageza ukundi.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (carLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          <Navigation />
          <div className="container mx-auto px-4 py-12">
            <div className="text-center">Turatangira amakuru y'imodoka...</div>
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
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center mb-8">
              <Button 
                variant="outline" 
                onClick={() => navigate('/dashboard')}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Garuka
              </Button>
              <h1 className="text-3xl font-bold text-foreground">
                Hindura Amakuru y'Imodoka
              </h1>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Car className="h-5 w-5 mr-2 text-primary" />
                  Hindura Amakuru
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="make">Ubwoko (Make) *</Label>
                      <Select value={formData.make} onValueChange={(value) => handleInputChange('make', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Hitamo ubwoko..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="toyota">Toyota</SelectItem>
                          <SelectItem value="nissan">Nissan</SelectItem>
                          <SelectItem value="honda">Honda</SelectItem>
                          <SelectItem value="hyundai">Hyundai</SelectItem>
                          <SelectItem value="kia">Kia</SelectItem>
                          <SelectItem value="mazda">Mazda</SelectItem>
                          <SelectItem value="mitsubishi">Mitsubishi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="model">Model *</Label>
                      <Input
                        id="model"
                        placeholder="Urugero: RAV4, Hilux, Civic..."
                        value={formData.model}
                        onChange={(e) => handleInputChange('model', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="year">Umwaka Yakozwemo *</Label>
                      <Select value={formData.year} onValueChange={(value) => handleInputChange('year', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Hitamo umwaka..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2024">2024</SelectItem>
                          <SelectItem value="2023">2023</SelectItem>
                          <SelectItem value="2022">2022</SelectItem>
                          <SelectItem value="2021">2021</SelectItem>
                          <SelectItem value="2020">2020</SelectItem>
                          <SelectItem value="2019">2019</SelectItem>
                          <SelectItem value="2018">2018</SelectItem>
                          <SelectItem value="2017">2017</SelectItem>
                          <SelectItem value="2016">2016</SelectItem>
                          <SelectItem value="2015">2015</SelectItem>
                          <SelectItem value="2014">2014</SelectItem>
                          <SelectItem value="2013">2013</SelectItem>
                          <SelectItem value="2012">2012</SelectItem>
                          <SelectItem value="2011">2011</SelectItem>
                          <SelectItem value="2010">2010</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="condition">Imiterere *</Label>
                      <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Hitamo imiterere..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Nziza cyane</SelectItem>
                          <SelectItem value="very-good">Nziza</SelectItem>
                          <SelectItem value="good">Imeze neza</SelectItem>
                          <SelectItem value="fair">Iba neza</SelectItem>
                          <SelectItem value="poor">Ntimeze neza</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="transmission">Transmission *</Label>
                      <Select value={formData.transmission} onValueChange={(value) => handleInputChange('transmission', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Hitamo..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="automatic">Automatic</SelectItem>
                          <SelectItem value="manual">Manual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="fuelType">Amavuta *</Label>
                      <Select value={formData.fuelType} onValueChange={(value) => handleInputChange('fuelType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Hitamo..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="petrol">Essence</SelectItem>
                          <SelectItem value="diesel">Diesel</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="electric">Amashanyarazi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="mileage">Kilometero (Mileage)</Label>
                      <Input
                        id="mileage"
                        placeholder="Urugero: 50,000 km"
                        value={formData.mileage}
                        onChange={(e) => handleInputChange('mileage', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="location">Aho iherereye *</Label>
                      <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Hitamo intara..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kigali">Kigali</SelectItem>
                          <SelectItem value="south">Amajyepfo</SelectItem>
                          <SelectItem value="north">Amajyaruguru</SelectItem>
                          <SelectItem value="east">Iburasirazuba</SelectItem>
                          <SelectItem value="west">Iburengerazuba</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="price">Igiciro Wifuza (Frw) *</Label>
                    <Input
                      id="price"
                      placeholder="Urugero: 15,000,000"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Ibisobanuro by'Imodoka</Label>
                    <Textarea
                      id="description"
                      placeholder="Sobanura imodoka yawe (imiterere, ibyarimo, ibindi...)..."
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/dashboard')}
                      className="flex-1"
                    >
                      Kuraguza
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex-1"
                    >
                      {loading ? (
                        <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Turahindura...</>
                      ) : (
                        'Bika Amahinduka'
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default EditCar;