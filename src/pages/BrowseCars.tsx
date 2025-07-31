import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CarCard from '@/components/CarCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter, Grid, List, SlidersHorizontal, Loader2 } from 'lucide-react';
import car1Image from '@/assets/car-1.jpg';
import car2Image from '@/assets/car-2.jpg';
import car3Image from '@/assets/car-3.jpg';

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
  transmission: string;
  fuel_type: string;
  mileage?: string;
  condition: string;
  featured: boolean;
  image?: string;
  daysAgo?: number;
}

const BrowseCars = () => {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    year: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    transmission: '',
    fuelType: ''
  });

  // Mock images for fallback
  const defaultImages = [car1Image, car2Image, car3Image];

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Map database cars to display format
      const mappedCars = (data || []).map((car, index) => ({
        ...car,
        image: car.photos?.[0] || defaultImages[index % defaultImages.length],
        daysAgo: Math.floor((new Date().getTime() - new Date(car.created_at).getTime()) / (1000 * 3600 * 24))
      }));

      setCars(mappedCars);
    } catch (error) {
      console.error('Error fetching cars:', error);
      // Fallback to mock data if database fails
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter cars based on user selections
  const filteredCars = cars.filter(car => {
    // Make filter
    if (filters.make && car.make.toLowerCase() !== filters.make.toLowerCase()) {
      return false;
    }
    
    // Location filter
    if (filters.location && car.location.toLowerCase() !== filters.location.toLowerCase()) {
      return false;
    }
    
    // Year filter
    if (filters.year && car.year.toString() !== filters.year) {
      return false;
    }
    
    // Price filters
    if (filters.minPrice && car.price < parseInt(filters.minPrice)) {
      return false;
    }
    if (filters.maxPrice && car.price > parseInt(filters.maxPrice)) {
      return false;
    }
    
    // Transmission filter
    if (filters.transmission && car.transmission.toLowerCase() !== filters.transmission.toLowerCase()) {
      return false;
    }
    
    // Fuel type filter
    if (filters.fuelType && car.fuel_type.toLowerCase() !== filters.fuelType.toLowerCase()) {
      return false;
    }
    
    return true;
  });

  const clearFilters = () => {
    setFilters({
      make: '',
      model: '',
      year: '',
      location: '',
      minPrice: '',
      maxPrice: '',
      transmission: '',
      fuelType: ''
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Page Header */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Reba Imodoka Zose
            </h1>
            <p className="text-xl opacity-90">
              Bonye imodoka {filteredCars.length} ziri ku isoko muri Rwanda
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <SlidersHorizontal className="h-5 w-5 mr-2 text-primary" />
                  <h2 className="text-lg font-semibold">Filter Imodoka</h2>
                </div>

                <div className="space-y-4">
                  {/* Make */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Ubwoko</label>
                    <Select value={filters.make} onValueChange={(value) => setFilters({...filters, make: value})}>
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
                        <SelectItem value="subaru">Subaru</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Aho iherereye</label>
                    <Select value={filters.location} onValueChange={(value) => setFilters({...filters, location: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Hitamo intara..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kigali">Kigali</SelectItem>
                        <SelectItem value="musanze">Musanze</SelectItem>
                        <SelectItem value="huye">Huye</SelectItem>
                        <SelectItem value="rubavu">Rubavu</SelectItem>
                        <SelectItem value="rusizi">Rusizi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Year Range */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Umwaka</label>
                    <Select value={filters.year} onValueChange={(value) => setFilters({...filters, year: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Kuva..." />
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
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Igiciro</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Min Frw"
                        value={filters.minPrice}
                        onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                      />
                      <Input
                        placeholder="Max Frw"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Transmission */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Transmission</label>
                    <Select value={filters.transmission} onValueChange={(value) => setFilters({...filters, transmission: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Hitamo..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="automatic">Automatic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Fuel Type */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Amavuta</label>
                    <Select value={filters.fuelType} onValueChange={(value) => setFilters({...filters, fuelType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Hitamo..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="essence">Essence</SelectItem>
                        <SelectItem value="diesel">Diesel</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full" variant="gradient">
                    <Search className="h-4 w-4 mr-2" />
                    Shakisha
                  </Button>

                  <Button variant="outline" className="w-full" onClick={clearFilters}>
                    <Filter className="h-4 w-4 mr-2" />
                    Siba Filter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Byaboneka: {filteredCars.length} imodoka
                </h3>
                <p className="text-sm text-muted-foreground">
                  Zishyizweho vuba kurenza zose
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewType === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewType('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewType === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewType('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Cars Grid/List */}
            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Turimo gutangira imodoka...</p>
              </div>
            ) : filteredCars.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">Nta modoka ziboneka</p>
                <Button variant="outline" onClick={clearFilters}>
                  Siba Filter
                </Button>
              </div>
            ) : (
              <div className={viewType === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                : "space-y-4"
              }>
                {filteredCars.map((car) => (
                  <CarCard
                    key={car.id} 
                    car={{
                      id: car.id,
                      image: car.image || defaultImages[0],
                      make: car.make,
                      model: car.model,
                      year: car.year,
                      price: car.price,
                      location: car.location,
                      daysAgo: car.daysAgo || 0,
                      fuelType: car.fuel_type as any,
                      transmission: car.transmission as any,
                      featured: car.featured
                    }} 
                    className={viewType === 'list' ? 'flex-row' : ''}
                  />
                ))}
              </div>
            )}

            {/* Load More */}
            <div className="text-center mt-12">
              <Button size="lg" variant="outline">
                Shakisha Imodoka Zindi
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BrowseCars;