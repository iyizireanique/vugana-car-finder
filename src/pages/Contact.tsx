import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, MapPin, Clock, MessageCircle, HeadphonesIcon, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Ubutumwa bwawe bwoherejwe!",
      description: "Tuzagusubiza mu minsi mike. Urakoze kubuhagurukiye.",
    });
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Hamagara',
      info: '+250 784 386 836',
      description: 'Hamagara igihe cyose ukeneye ubufasha',
      color: 'bg-green-500'
    },
    {
      icon: Mail,
      title: 'Email',
      info: 'info@vuganacar.rw',
      description: 'Kohereza ubutumwa tukagusubiza vuba',
      color: 'bg-blue-500'
    },
    {
      icon: MapPin,
      title: 'Aho tubarizwa',
      info: 'Kigali, Rwanda',
      description: 'Ikigo cyacu gikuru kiri i Kigali',
      color: 'bg-red-500'
    },
    {
      icon: Clock,
      title: 'Amasaha',
      info: '24/7',
      description: 'Tubafasha igihe cyose',
      color: 'bg-purple-500'
    }
  ];

  const faqs = [
    {
      question: 'Nigute nshobora gutangaza imodoka yanjye?',
      answer: 'Jya kuri "Gurisha Imodoka Yawe" maze uzuza fomu. Ni byoroshye kandi byihuse!'
    },
    {
      question: 'Mbishyura angahe gutangaza imodoka?',
      answer: 'Gutangaza imodoka ni ubuntu! Featured listing ni 5,000 Frw gusa.'
    },
    {
      question: 'Ni angahe igihe kitwara kugurisha imodoka?',
      answer: 'Byarenze abantu bagurisha imodoka zabo mu minsi 3-7 gusa kuri VuganaCar.'
    },
    {
      question: 'Murafasha gutegura amafaranga?',
      answer: 'Tufasha guhura abantu ariko amafaranga ni hagati yanyu. Ntidufite uruhare muri ibyo.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Badge className="bg-accent text-accent-foreground mb-4">Tuvugishe</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Twifuze Kugufasha
            </h1>
            <p className="text-xl opacity-90 leading-relaxed">
              Ugira ikibazo, igitekerezo, cyangwa ushaka kumva birambuye ku VuganaCar? 
              Tuvugishe! Tuzagusubiza vuba.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <MessageCircle className="h-6 w-6 mr-3 text-primary" />
                  Kohereza Ubutumwa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Izina Ryawe *</Label>
                      <Input
                        id="name"
                        placeholder="Amazina yawe yuzuye"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Nimero ya Telefone *</Label>
                      <Input
                        id="phone"
                        placeholder="+250 7XX XXX XXX"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Ingingo *</Label>
                    <Input
                      id="subject"
                      placeholder="Ikibazo cyawe cyangwa icyo ushaka"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Ubutumwa *</Label>
                    <Textarea
                      id="message"
                      placeholder="Andika ubutumwa bwawe hano..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" variant="gradient" className="w-full">
                    <Send className="h-5 w-5 mr-2" />
                    Ohereza Ubutumwa
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card key={index} className="hover:shadow-card-hover transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 ${info.color} rounded-xl flex items-center justify-center`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">
                            {info.title}
                          </h3>
                          <p className="text-lg font-medium text-primary mb-1">
                            {info.info}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick Help */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HeadphonesIcon className="h-5 w-5 mr-2 text-primary" />
                  Ubufasha bwihuse
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Tubafasha 24/7</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Tusubiza mu masaha 2</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Ubufasha bw'ubuntu</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Hamagara ubu
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card>
              <CardHeader>
                <CardTitle>Amasaha y'akazi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ku icyumweru:</span>
                    <span className="font-medium">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mu cyumweru:</span>
                    <span className="font-medium">24/7</span>
                  </div>
                  <div className="text-xs text-muted-foreground pt-2 border-t">
                    Hari igihe cyo kugufasha cyose! Hamagara cyangwa kohereza ubutumwa igihe cyose.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ibibazo Bikunze Kubazwa
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Reba niba ikibazo cyawe giri muri aya makuru yakurikiye
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="hover:shadow-card-hover transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
            <CardContent className="p-8 text-center">
              <Phone className="h-12 w-12 mx-auto mb-4 opacity-80" />
              <h3 className="text-2xl font-bold mb-2">Ubufasha bw'ihutira?</h3>
              <p className="text-lg opacity-90 mb-4">
                Ugira ikibazo gikomeye cyangwa ukeneye ubufasha bwihutira?
              </p>
              <Button size="lg" variant="secondary">
                Hamagara +250 784 386 836
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;