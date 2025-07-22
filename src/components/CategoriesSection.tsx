import { Car, Truck, Bus, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const CategoriesSection = () => {
  const categories = [
    {
      name: 'SUV',
      description: 'Imodoka nini',
      icon: Car,
      color: 'bg-blue-500',
      count: '150+'
    },
    {
      name: 'Sedan',
      description: 'Imodoka zisanzwe',
      icon: Car,
      color: 'bg-green-500',
      count: '200+'
    },
    {
      name: 'Pickup',
      description: 'Zitwara imizigo',
      icon: Truck,
      color: 'bg-orange-500',
      count: '80+'
    },
    {
      name: 'Minibus',
      description: 'Taxi voiture',
      icon: Bus,
      color: 'bg-purple-500',
      count: '120+'
    },
    {
      name: 'Electric',
      description: 'Amashanyarazi',
      icon: Zap,
      color: 'bg-yellow-500',
      count: '25+'
    },
    {
      name: 'Zose',
      description: 'Imodoka zose',
      icon: Car,
      color: 'bg-gray-500',
      count: '500+'
    }
  ];

  return (
    <section className="py-16 bg-automotive-light">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ibyiciro by'Imodoka
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hitamo ubwoko bw'imodoka ukeneye ukurebe icyo dufite
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-card-hover transition-all duration-300 cursor-pointer bg-card border-0 hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {category.description}
                  </p>
                  <div className="text-xs text-primary font-semibold">
                    {category.count}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Button size="lg" variant="outline" className="px-8">
            Reba Imodoka Zose
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;