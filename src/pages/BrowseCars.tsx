import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CarCard from '@/components/CarCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import car1Image from '@/assets/car-1.jpg';
import car2Image from '@/assets/car-2.jpg';
import car3Image from '@/assets/car-3.jpg';

const BrowseCars = () => {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
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

  // Mock data - expanded car listings
  const allCars = [
    {
      id: '1', image: car1Image, make: 'Toyota', model: 'RAV4', year: 2016,
      price: 12000000, location: 'Kigali', daysAgo: 2, transmission: 'Automatic' as const,
      fuelType: 'Essence' as const, featured: true
    },
    {
      id: '2', image: car2Image, make: 'Nissan', model: 'Hilux', year: 2018,
      price: 15500000, location: 'Musanze', daysAgo: 1, transmission: 'Manual' as const,
      fuelType: 'Diesel' as const, featured: false
    },
    {
      id: '3', image: car3Image, make: 'Honda', model: 'Civic', year: 2020,
      price: 18000000, location: 'Huye', daysAgo: 3, transmission: 'Automatic' as const,
      fuelType: 'Essence' as const, featured: true
    },
    {
      id: '4', image: car1Image, make: 'Toyota', model: 'Camry', year: 2019,
      price: 16000000, location: 'Kigali', daysAgo: 4, transmission: 'Automatic' as const,
      fuelType: 'Hybrid' as const, featured: false
    },
    {
      id: '5', image: car2Image, make: 'Hyundai', model: 'Santa Fe', year: 2017,
      price: 13500000, location: 'Rubavu', daysAgo: 5, transmission: 'Manual' as const,
      fuelType: 'Diesel' as const, featured: false
    },
    {
      id: '6', image: car3Image, make: 'Kia', model: 'Sorento', year: 2021,
      price: 22000000, location: 'Kigali', daysAgo: 1, transmission: 'Automatic' as const,
      fuelType: 'Essence' as const, featured: true
    },
    {
      id: '7', image: car1Image, make: 'Toyota', model: 'Prado', year: 2015,
      price: 19000000, location: 'Musanze', daysAgo: 6, transmission: 'Automatic' as const,
      fuelType: 'Diesel' as const, featured: false
    },
    {
      id: '8', image: car2Image, make: 'Nissan', model: 'X-Trail', year: 2019,
      price: 17000000, location: 'Huye', daysAgo: 2, transmission: 'Automatic' as const,
      fuelType: 'Essence' as const, featured: true
    },
    {
      id: '9', image: car3Image, make: 'Honda', model: 'CR-V', year: 2018,
      price: 16500000, location: 'Kigali', daysAgo: 3, transmission: 'Automatic' as const,
      fuelType: 'Essence' as const, featured: false
    },
    {
      id: '10', image: car1Image, make: 'Mazda', model: 'CX-5', year: 2020,
      price: 18500000, location: 'Rubavu', daysAgo: 1, transmission: 'Automatic' as const,
      fuelType: 'Essence' as const, featured: true
    },
    {
      id: '11', image: car2Image, make: 'Subaru', model: 'Forester', year: 2017,
      price: 14500000, location: 'Kigali', daysAgo: 4, transmission: 'Manual' as const,
      fuelType: 'Essence' as const, featured: false
    },
    {
      id: '12', image: car3Image, make: 'Mitsubishi', model: 'Outlander', year: 2019,
      price: 17500000, location: 'Musanze', daysAgo: 2, transmission: 'Automatic' as const,
      fuelType: 'Essence' as const, featured: true
    }
  ];

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
              Bonye imodoka {allCars.length} ziri ku isoko muri Rwanda
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

                  <Button variant="outline" className="w-full">
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
                  Byaboneka: {allCars.length} imodoka
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
            <div className={viewType === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {allCars.map((car) => (
                <CarCard 
                  key={car.id} 
                  car={car} 
                  className={viewType === 'list' ? 'flex-row' : ''}
                />
              ))}
            </div>

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