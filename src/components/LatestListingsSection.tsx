import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import CarCard from './CarCard';
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
  featured: boolean;
}

const LatestListingsSection = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock images for fallback
  const defaultImages = [car1Image, car2Image, car3Image];

  useEffect(() => {
    fetchLatestCars();
  }, []);

  const fetchLatestCars = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      setCars(data || []);
    } catch (error) {
      console.error('Error fetching cars:', error);
      // Keep empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleViewAllCars = () => {
    navigate('/browse');
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Imodoka Ziheruka Gushyirwaho
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Reba imodoka nshya ziheruka gushyirwaho kuri VuganaCar
          </p>
        </div>

        {/* Cars Grid */}
        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Turimo gutangira imodoka...</p>
          </div>
        ) : cars.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">Nta modoka ziri ku rubuga</p>
            <Button onClick={() => navigate('/sell')} variant="gradient">
              Tangaza Imodoka Yawe ya Mbere
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {cars.map((car, index) => (
                <CarCard 
                  key={car.id} 
                  car={{
                    id: car.id,
                    image: car.photos?.[0] || defaultImages[index % defaultImages.length],
                    make: car.make,
                    model: car.model,
                    year: car.year,
                    price: car.price,
                    location: car.location,
                    daysAgo: Math.floor((new Date().getTime() - new Date(car.created_at).getTime()) / (1000 * 3600 * 24)),
                    transmission: car.transmission as any,
                    fuelType: car.fuel_type as any,
                    featured: car.featured
                  }} 
                />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Button 
                size="lg" 
                variant="gradient" 
                className="px-8"
                onClick={handleViewAllCars}
              >
                Reba Imodoka Zose
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default LatestListingsSection;