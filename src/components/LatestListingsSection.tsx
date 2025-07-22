import { Button } from '@/components/ui/button';
import CarCard from './CarCard';
import car1Image from '@/assets/car-1.jpg';
import car2Image from '@/assets/car-2.jpg';
import car3Image from '@/assets/car-3.jpg';

const LatestListingsSection = () => {
  const latestCars = [
    {
      id: '1',
      image: car1Image,
      make: 'Toyota',
      model: 'RAV4',
      year: 2016,
      price: 12000000,
      location: 'Kigali',
      daysAgo: 2,
      transmission: 'Automatic' as const,
      fuelType: 'Essence' as const,
      featured: true
    },
    {
      id: '2',
      image: car2Image,
      make: 'Nissan',
      model: 'Hilux',
      year: 2018,
      price: 15500000,
      location: 'Musanze',
      daysAgo: 1,
      transmission: 'Manual' as const,
      fuelType: 'Diesel' as const,
      featured: false
    },
    {
      id: '3',
      image: car3Image,
      make: 'Honda',
      model: 'Civic',
      year: 2020,
      price: 18000000,
      location: 'Huye',
      daysAgo: 3,
      transmission: 'Automatic' as const,
      fuelType: 'Essence' as const,
      featured: true
    },
    {
      id: '4',
      image: car1Image,
      make: 'Toyota',
      model: 'Camry',
      year: 2019,
      price: 16000000,
      location: 'Kigali',
      daysAgo: 4,
      transmission: 'Automatic' as const,
      fuelType: 'Hybrid' as const,
      featured: false
    },
    {
      id: '5',
      image: car2Image,
      make: 'Hyundai',
      model: 'Santa Fe',
      year: 2017,
      price: 13500000,
      location: 'Rubavu',
      daysAgo: 5,
      transmission: 'Manual' as const,
      fuelType: 'Diesel' as const,
      featured: false
    },
    {
      id: '6',
      image: car3Image,
      make: 'Kia',
      model: 'Sorento',
      year: 2021,
      price: 22000000,
      location: 'Kigali',
      daysAgo: 1,
      transmission: 'Automatic' as const,
      fuelType: 'Essence' as const,
      featured: true
    }
  ];

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {latestCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button size="lg" variant="gradient" className="px-8">
            Reba Imodoka Zose
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestListingsSection;