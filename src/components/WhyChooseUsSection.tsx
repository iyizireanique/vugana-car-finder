import { CheckCircle, MessageCircle, Users, Smartphone, Upload, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const WhyChooseUsSection = () => {
  const features = [
    {
      icon: CheckCircle,
      title: 'Imodoka zizewe',
      description: 'Imodoka zuzuye amakuru kandi zizewe',
      color: 'bg-green-500'
    },
    {
      icon: MessageCircle,
      title: 'Vugana ako kanya',
      description: 'Ushobora kuvugana n\'umugurisha ako kanya',
      color: 'bg-blue-500'
    },
    {
      icon: Users,
      title: 'Nta bacuruzi hagati',
      description: 'Ntabwo harimo brokers - vugana rwose',
      color: 'bg-purple-500'
    },
    {
      icon: Smartphone,
      title: 'Koresha byoroshye',
      description: 'Kuri telefone cyangwa mudasobwa',
      color: 'bg-orange-500'
    },
    {
      icon: Upload,
      title: 'Gutangaza ntibigoye',
      description: 'Shyiraho imodoka yawe mu buryo bworoshye',
      color: 'bg-pink-500'
    },
    {
      icon: Shield,
      title: 'Kubungabungwa',
      description: 'Amakuru yawe ni ayateganijwe kandi afunzwe',
      color: 'bg-red-500'
    }
  ];

  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Impamvu Guhitamo VuganaCar
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Dufite ubunyangamugayo n'ubuziranenge mu bikorwa by'imodoka mu Rwanda
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-card-hover transition-all duration-300 bg-gradient-card border-0 hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;