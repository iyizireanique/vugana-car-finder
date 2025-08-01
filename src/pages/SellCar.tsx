import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, Camera, CheckCircle, AlertCircle, Car, DollarSign, MapPin, Phone, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SellCar = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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

  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [showPayment, setShowPayment] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && user) {
      try {
        const newPhotos: string[] = [];
        
        for (const file of Array.from(files)) {
          // Create unique filename
          const fileExt = file.name.split('.').pop();
          const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
          
          // Upload to Supabase Storage
          const { data, error } = await supabase.storage
            .from('car-photos')
            .upload(fileName, file);
          
          if (error) {
            console.error('Error uploading photo:', error);
            toast({
              title: "Ikosa",
              description: "Ntibyakunze kwongera ifoto. Gerageza ukundi.",
              variant: "destructive",
            });
            continue;
          }
          
          // Get public URL
          const { data: { publicUrl } } = supabase.storage
            .from('car-photos')
            .getPublicUrl(fileName);
          
          newPhotos.push(publicUrl);
        }
        
        setUploadedPhotos(prev => [...prev, ...newPhotos].slice(0, 6));
        
        if (newPhotos.length > 0) {
          toast({
            title: "Amafoto yongerwemo!",
            description: `${newPhotos.length} amafoto yongerwemo neza.`,
          });
        }
      } catch (error) {
        console.error('Error in photo upload:', error);
        toast({
          title: "Ikosa",
          description: "Ntibyakunze kwongera amafoto. Gerageza ukundi.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Ikosa",
        description: "Ugomba kwinjira mbere yo gutangaza imodoka.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    if (uploadedPhotos.length < 3) {
      toast({
        title: "Ikosa",
        description: "Ugomba gushyiraho byibuze amafoto 3 y'imodoka yawe.",
        variant: "destructive",
      });
      return;
    }

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
      // Save car to database
      const { data: carData, error: carError } = await supabase
        .from('cars')
        .insert({
          user_id: user.id,
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
          photos: uploadedPhotos,
          status: 'active'  // Post directly as active
        })
        .select()
        .single();

      if (carError) throw carError;

      toast({
        title: "Imodoka yawe yongerewe!",
        description: "Imodoka yawe yamaze kugaragara ku rubuga. Ushobora kuyireba kuri Dashboard yawe.",
      });

      // Navigate to dashboard immediately
      navigate('/dashboard');

    } catch (error: any) {
      toast({
        title: "Ikosa",
        description: "Ntibyakunze kongeraho imodoka yawe. Gerageza ukundi.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.functions.invoke('create-car-payment', {
        body: { carData: formData }
      });

      if (error) throw error;

      // Open Stripe checkout in new tab
      window.open(data.url, '_blank');
      
      toast({
        title: "Kwishura Gutangira",
        description: "Fungura tab nshya kugira kwishura. Nyuma y'ubwo ugaruke hano.",
      });
      
    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: "Ikosa mu Kwishura",
        description: "Habyaye ikosa. Ongera ugerageze.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sellSteps = [
    {
      number: 1,
      title: 'Uzuza Amakuru',
      description: 'Andika amakuru y\'imodoka yawe yuzuye'
    },
    {
      number: 2,
      title: 'Shyiraho Amafoto',
      description: 'Shyiraho amafoto 3-6 y\'imodoka yawe'
    },
    {
      number: 3,
      title: 'Emeza Igiciro',
      description: 'Shyiraho igiciro wifuza'
    },
    {
      number: 4,
      title: 'Tangaza',
      description: 'Imodoka yawe izagaragara ku rubuga'
    }
  ];

  if (showPayment) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          <Navigation />
          
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-md mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Ishyura Gutangaza</CardTitle>
                  <p className="text-muted-foreground">
                    Wishyure 7,500 Frw kugira ngo imodoka yawe igaragare ku rubuga
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">7,500 Frw</div>
                    <p className="text-sm text-muted-foreground">Ikiguzi cyo gutangaza imodoka</p>
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      onClick={handlePayment}
                      disabled={loading}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                    >
                      {loading ? (
                        <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Turategereza...</>
                      ) : (
                        <>
                          <DollarSign className="h-4 w-4 mr-2" />
                          Ishyura na Stripe (MTN Momo cyangwa Card)
                        </>
                      )}
                    </Button>
                    
                    <div className="text-center text-sm text-muted-foreground">
                      <p>CYANGWA</p>
                    </div>
                    
                    <Button 
                      onClick={() => {
                        toast({
                          title: "Uburyo bw'Kwishyura bw'Ikinyabiziga",
                          description: "Hamagara +250 784 386 836 kugira wishyure na Mobile Money",
                        });
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Ishyura na Mobile Money (Hamagara)
                    </Button>
                  </div>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    <p>Imodoka yawe izagaragara ku rubuga nyuma yo kwishyura</p>
                  </div>
                </CardContent>
              </Card>
            </div>
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
      
      {/* Page Header */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-white max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Gurisha Imodoka Yawe
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Tangaza imodoka yawe mu minsi mike kandi uyigurisha vuba!
            </p>
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center text-white/90">
                <CheckCircle className="h-5 w-5 mr-2 text-accent" />
                <span>Ubuntu</span>
              </div>
              <div className="flex items-center text-white/90">
                <CheckCircle className="h-5 w-5 mr-2 text-accent" />
                <span>Vuga byoroshye</span>
              </div>
              <div className="flex items-center text-white/90">
                <CheckCircle className="h-5 w-5 mr-2 text-accent" />
                <span>Nta mubaha</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            {sellSteps.map((step) => (
              <Card key={step.number} className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                    {step.number}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Car className="h-5 w-5 mr-2 text-primary" />
                    Amakuru y'Imodoka
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Car Details */}
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
                      <Label htmlFor="price" className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Igiciro Wifuza (Frw) *
                      </Label>
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
                        placeholder="Sobanura imodoka yawe, imiterere yayo, service history, n'ibindi..."
                        rows={4}
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                      />
                    </div>

                    {/* Photo Upload */}
                    <div>
                      <Label>Amafoto y'Imodoka (3-6 amafoto) *</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                          id="photo-upload"
                        />
                        <label htmlFor="photo-upload" className="cursor-pointer">
                          <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <p className="text-muted-foreground mb-2">
                            Kanda hano cyangwa suka amafoto
                          </p>
                          <p className="text-sm text-muted-foreground">
                            JPG, PNG cyangwa WebP (Max 5MB buri kimwe)
                          </p>
                        </label>
                      </div>
                      
                      {uploadedPhotos.length > 0 && (
                        <div className="grid grid-cols-3 gap-4 mt-4">
                          {uploadedPhotos.map((photo, index) => (
                            <div key={index} className="relative">
                              <img
                                src={photo}
                                alt={`Car photo ${index + 1}`}
                                className="w-full h-20 object-cover rounded-lg"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Payment Info */}
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <DollarSign className="h-5 w-5 mr-2 text-primary" />
                        Igiciro cyo Gutangaza
                      </h3>
                      
                      <div className="bg-muted p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Ikiguzi cyo gutangaza:</span>
                          <span className="font-semibold text-lg">7,500 Frw</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Uzishyura nyuma yo kuzuza form. Urahya MTN Mobile Money cyangwa Card.
                        </p>
                      </div>
                    </div>

                    <Button type="submit" size="lg" variant="gradient" className="w-full" disabled={loading}>
                      {loading ? (
                        <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Turategereza...</>
                      ) : (
                        'Tangaza Imodoka Yanjye - 7,500 Frw'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tips Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Inama zo Gutangaza</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Camera className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Amafoto Meza</h4>
                      <p className="text-sm text-muted-foreground">Fata amafoto meza y'imodoka yawe mu kanyama kandi ameze neza</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <DollarSign className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Igiciro Cyiza</h4>
                      <p className="text-sm text-muted-foreground">Reba igiciro cy'imodoka zifana nawe ku isoko</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Kora Amakuru Yuzuye</h4>
                      <p className="text-sm text-muted-foreground">Andika amakuru yose agamije abaguzi bashobora kumva</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ibiciro</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Gutangaza imodoka</span>
                      <Badge variant="secondary" className="text-accent">Ubuntu</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Featured listing</span>
                      <span className="text-sm">5,000 Frw</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Nta kindi uzishyura. Intambo zose ni ubuntu!
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Kubana natwe</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-3 text-primary" />
                      <span className="text-sm">+250 784 386 836</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Ugize ikibazo? Hamagara tukagufashe gutangaza imodoka yawe.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default SellCar;