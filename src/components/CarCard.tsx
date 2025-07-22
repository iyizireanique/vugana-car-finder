import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Calendar, Fuel, Settings, Eye, Heart, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CarCardProps {
  car: {
    id: string;
    image: string;
    make: string;
    model: string;
    year: number;
    price: number;
    location: string;
    daysAgo: number;
    transmission: 'Manual' | 'Automatic';
    fuelType: 'Essence' | 'Diesel' | 'Hybrid';
    featured?: boolean;
  };
  className?: string;
}

const CarCard = ({ car, className }: CarCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('rw-RW').format(price) + ' Frw';
  };

  return (
    <Card className={cn("group hover:shadow-card-hover transition-all duration-300 cursor-pointer bg-gradient-card border-0", className)}>
      <div className="relative overflow-hidden rounded-t-lg">
        {/* Car Image */}
        <img 
          src={car.image} 
          alt={`${car.make} ${car.model}`}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Featured Badge */}
        {car.featured && (
          <Badge className="absolute top-3 left-3 bg-accent hover:bg-accent text-accent-foreground">
            Imodoka nziza
          </Badge>
        )}
        
        {/* Heart Icon */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-card/80 hover:bg-card text-muted-foreground hover:text-destructive backdrop-blur-sm"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="p-4">
        {/* Car Title */}
        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {car.make} {car.model} {car.year}
        </h3>
        
        {/* Price */}
        <p className="text-2xl font-bold text-primary mb-3">
          {formatPrice(car.price)}
        </p>
        
        {/* Location & Date */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{car.location}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>hashize iminsi {car.daysAgo}</span>
          </div>
        </div>

        {/* Car Details */}
        <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-4">
          <div className="flex items-center">
            <Settings className="h-3 w-3 mr-1" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center">
            <Fuel className="h-3 w-3 mr-1" />
            <span>{car.fuelType}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Eye className="h-4 w-4 mr-2" />
            Reba birambuye
          </Button>
          <Button size="sm" variant="gradient">
            <Phone className="h-4 w-4 mr-2" />
            Hamagara
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarCard;