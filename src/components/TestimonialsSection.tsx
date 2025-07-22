import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Jean Pierre',
      location: 'Kigali',
      text: 'Nabonye imodoka nakundaga ku giciro cyiza, nta kuvunika. Urakoze VuganaCar!',
      rating: 5,
      image: '/api/placeholder/60/60'
    },
    {
      name: 'Claudine',
      location: 'Huye',
      text: 'Nashyizeho imodoka yanjye, maze kuyigurisha mu minsi 3 gusa!',
      rating: 5,
      image: '/api/placeholder/60/60'
    },
    {
      name: 'Emmanuel',
      location: 'Musanze',
      text: 'Urubuga ruroroshye kandi rwizeye. Nabonye imodoka yanjye hano byoroshye!',
      rating: 5,
      image: '/api/placeholder/60/60'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-card to-automotive-light">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ibyo Abakiliya Bavuga
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Reba icyo abakoresha bariwandika ku byo bakoze hano
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-card-hover transition-all duration-300 bg-card border-0">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Quote className="h-6 w-6 text-primary" />
                  </div>
                </div>

                {/* Stars */}
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-center text-foreground mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;