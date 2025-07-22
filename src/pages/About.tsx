import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Target, Heart, Users, Award, Globe, Phone, Mail } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Kunyuzwe',
      description: 'Twizeye ko umuntu wese akwiye kubona imodoka nziza ku giciro cyiza'
    },
    {
      icon: CheckCircle,
      title: 'Kwizerwa',
      description: 'Amakuru yose ari ukuri kandi tubana n\'abaguzi n\'abagurisha mu nyangamugayo'
    },
    {
      icon: Users,
      title: 'Ubwiyunge',
      description: 'Turaguha ubufasha bwiza kandi tukagufasha mu buryo bwose'
    },
    {
      icon: Globe,
      title: 'Iterambere',
      description: 'Tugira uruhare mu kuzamura isoko ry\'imodoka muri Afrika y\'Iburasirazuba'
    }
  ];

  const achievements = [
    {
      number: '500+',
      label: 'Imodoka zarishawe',
      description: 'Mu mezi 6 yashize'
    },
    {
      number: '1000+',
      label: 'Abakoresha',
      description: 'Bahagije urubuga'
    },
    {
      number: '95%',
      label: 'Abanyuzwe',
      description: 'Biganisha ku bindi'
    },
    {
      number: '24/7',
      label: 'Ubufasha',
      description: 'Igihe cyose'
    }
  ];

  const timeline = [
    {
      year: '2024',
      title: 'Intangiriro ya VuganaCar',
      description: 'IYIZIRE Anique yatangije VuganaCar akaba afite intego yo guhuza abaguzi n\'abagurisha b\'imodoka mu Rwanda'
    },
    {
      year: '2024 Q2',
      title: 'Imodoka ya mbere yarishawe',
      description: 'Imodoka ya mbere yarishawe kuri VuganaCar - Toyota RAV4 muri Kigali'
    },
    {
      year: '2024 Q3',
      title: 'Kugera ku bakoresha 100',
      description: 'Urubuga rwageze ku bakoresha ba mbere 100 kandi rwarishe imodoka 50'
    },
    {
      year: '2024 Q4',
      title: 'Gukwira mu ntara zose',
      description: 'VuganaCar yaguye mu ntara zose z\'u Rwanda'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="bg-accent text-accent-foreground mb-4">Ibyerekeye Twebwe</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Vugana, Wumvikane,
              <span className="block text-accent">Ugure cyangwa Ugurishe</span>
            </h1>
            <p className="text-xl opacity-90 leading-relaxed">
              VuganaCar ni urubuga rushya rwo guhangana mu bikorwa by'imodoka mu Rwanda. 
              Tugiye guhuza abaguzi n'abagurisha banyuze mu kuvugana kwizewe kandi kworoshye.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-32 h-32 bg-gradient-primary rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6">
                  <span className="text-4xl font-bold text-white">IA</span>
                </div>
              </div>
              <div>
                <Badge className="mb-4">Uwashinze</Badge>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  IYIZIRE Anique
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Ndi umunyeshuri w'ubwiyunge bw'amakuru kandi nabonye ko isoko ry'imodoka mu Rwanda 
                  rirakeneye urubuga rushya rutanga ubufasha bunoze kandi buzizewe. VuganaCar yaje guhindura 
                  uburyo abantu bacuruza imodoka mu Rwanda.
                </p>
                <blockquote className="border-l-4 border-primary pl-6 italic text-lg text-muted-foreground">
                  "Intego yanjye ni ukwubaka urubuga rubana abaguzi n'abagurisha mu buryo butaziguye, 
                  bunyangamugayo, kandi buzamura ubucuruzi bw'imodoka mu Rwanda."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-automotive-light">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Intego n'Icyerekezo Cyacu
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Tugamije guhindura isoko ry'imodoka muri Afrika y'Iburasirazuba
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Mission */}
              <Card className="bg-card border-0 shadow-card">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Target className="h-8 w-8 text-primary mr-4" />
                    <h3 className="text-2xl font-bold text-foreground">Intego (Mission)</h3>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Intego yacu ni guhuza abaguzi n'abagurisha b'imodoka mu Rwanda binyuze mu buryo 
                    buzizewe, bunoze, kandi butaziguye. Tugamije kwubaka isoko ry'imodoka rifatika 
                    kandi rihuza abantu bose.
                  </p>
                </CardContent>
              </Card>

              {/* Vision */}
              <Card className="bg-card border-0 shadow-card">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Award className="h-8 w-8 text-primary mr-4" />
                    <h3 className="text-2xl font-bold text-foreground">Icyerekezo (Vision)</h3>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Dushaka kuba urubuga rw'ibanze rw'imodoka muri Afrika y'Iburasirazuba, 
                    aho umuntu wese ashobora kubona imodoka akeneye cyangwa agurishe iyiwe 
                    mu buryo buzizewe kandi bwihuse.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Indangagaciro Zacu
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Izi ni indangagaciro zituyobora mu bikorwa byacu bya buri munsi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-card-hover transition-all duration-300 bg-gradient-card border-0">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-hover text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ibyatuzanye
              </h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Mu gihe gito gusa, VuganaCar yahinduye isoko ry'imodoka mu Rwanda
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-accent">
                    {achievement.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {achievement.label}
                  </h3>
                  <p className="opacity-90">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Urugendo Rwacu
              </h2>
              <p className="text-lg text-muted-foreground">
                Reba uko VuganaCar yakuze kuva yatangiye
              </p>
            </div>

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Badge variant="secondary" className="mr-4">{item.year}</Badge>
                      <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-automotive-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Twifuze Kubana Nawe
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Ugira ikibazo, igitekerezo, cyangwa ushaka kumva birambuye? Tuvugishe!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button size="lg" variant="gradient">
                <Mail className="h-5 w-5 mr-2" />
                Kohereza Email
              </Button>
              <Button size="lg" variant="outline">
                <Phone className="h-5 w-5 mr-2" />
                Hamagara +250 784 386 836
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;