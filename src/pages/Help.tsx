import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, MessageSquare, Phone, Mail, Users } from 'lucide-react';

const Help = () => {
  const faqs = [
    {
      question: "Nigute nashobora gutangaza imodoka yanjye?",
      answer: "Injira ku rubuga rwacu, kanda 'Tangaza Imodoka', uzuze form, ushyireho amafoto, urangize kwishyura 7,500 Frw, imodoka yawe izagaragara ku rubuga."
    },
    {
      question: "Ni amafaranga angahe yo gutangaza imodoka?",
      answer: "Ikiguzi cyo gutangaza imodoka ni 7,500 Frw gusa. Ubishyura rimwe gusa kandi imodoka yawe igaragara ukwezi kumwe."
    },
    {
      question: "Nigute nsangira abashaka kugura imodoka yanjye?",
      answer: "Abantu bashaka kugura imodoka yawe bazakubona bakoresheje telefone cyangwa email washyizeho ku matangazo yawe."
    },
    {
      question: "Nashobora gukora changes ku matangazo yanjye?",
      answer: "Yego! Ujya kuri Dashboard yawe, ushobora gukora edit cyangwa gusiba amatangazo yawe."
    },
    {
      question: "Ni ubuhe buryo bwo kwishyura bukoresha?",
      answer: "Dukoresha Stripe payment system. Ushobora kwishyura na MTN Mobile Money cyangwa Credit/Debit card."
    },
    {
      question: "Icyo nkora iyo hatakiri heza ku matangazo yanjye?",
      answer: "Tuvugishe kuri +250 784 386 836 cyangwa wohereze email kuri support@vuganacar.rw, tuzagufasha vuba."
    },
    {
      question: "Nasubiza amafaranga nishyuye iyo ntagishaka gutangaza?",
      answer: "Urahari, iyo payment yashyuwe, ntiyasubizwa. Ariko imodoka yawe izagaragara ukwezi kwosehere."
    },
    {
      question: "Ni amafoto angahe nakoreshe mu gutangaza?",
      answer: "Ugomba gushyiraho byibuze amafoto 3 ariko ushobora kwiyongererahe amafoto 6. Amafoto akozwi arizwa."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ubufasha
            </h1>
            <p className="text-muted-foreground text-lg">
              Dufite icyizere ko uza kubona igisubizo cy'ikibazo cyawe hano
            </p>
          </div>

          {/* Quick Contact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent className="p-6 text-center">
                <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Tuvugishe</h3>
                <p className="text-muted-foreground text-sm mb-3">Hamagara tuvuge</p>
                <p className="font-medium">+250 784 386 836</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground text-sm mb-3">Twohereze email</p>
                <p className="font-medium">support@vuganacar.rw</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <MessageSquare className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">WhatsApp</h3>
                <p className="text-muted-foreground text-sm mb-3">Tuvuge kuri WhatsApp</p>
                <p className="font-medium">+250 784 386 836</p>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-primary" />
                Ibibazo Bikunze Kubazwa (FAQ)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* How to guides */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Amayobora</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Nigute Ntangaza Imodoka?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal pl-6 space-y-2 text-sm">
                    <li>Injira kuri VuganaCar.rw</li>
                    <li>Kanda "Tangaza Imodoka"</li>
                    <li>Uzuza amakuru y'imodoka yawe</li>
                    <li>Shyiraho amafoto 3-6</li>
                    <li>Shyiraho igiciro</li>
                    <li>Ishyura 7,500 Frw</li>
                    <li>Imodoka yawe igaragara ku rubuga!</li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Nigute Nshakisha Imodoka?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal pl-6 space-y-2 text-sm">
                    <li>Jya ku "Reba Imodoka"</li>
                    <li>Koresha filters (ubwoko, igiciro, aho iherereye)</li>
                    <li>Kanda ku modoka ushaka</li>
                    <li>Reba amafoto n'amakuru</li>
                    <li>Hamagara uwayishyizeho</li>
                    <li>Kora appointment yo kuyireba</li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Need more help */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                Ukeneye Ubundi Bufasha?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Niba ugikanguriye ikibazo kitari hano, urahari tuvugishe. 
                Ikipe yacu y'ubufasha iriteguye kugufasha igihe cyose.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Amagi yo kubarizwa:</h4>
                  <p className="text-sm text-muted-foreground">
                    Kuva kuri Kuwakwane kugeza ku Cyumweru<br />
                    8:00 AM - 6:00 PM
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Aho duherereye:</h4>
                  <p className="text-sm text-muted-foreground">
                    Kigali, Rwanda<br />
                    Tuzakubona cyangwa tuvugane kuri telefone
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Help;