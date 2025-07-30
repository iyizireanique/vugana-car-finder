import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, AlertTriangle, Users, CreditCard } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Amabwiriza yo Gukoresha
            </h1>
            <p className="text-muted-foreground text-lg">
              Amabwiriza akurikizwa mu gukoresha urubuga rwa VuganaCar.rw
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  Intangiriro
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Murakaza neza kuri VuganaCar.rw! Aya ni amabwiriza akurikizwa mu gukoresha urubuga rwacu. 
                  Iyo ukoresha urubuga rwacu, wemeza ko wemeye aya mabwiriza yose.
                </p>
                <p>
                  Urubuga rwacu ni rwo guhuza abantu bashaka kugurisha n'abashaka kugura imodoka mu Rwanda.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  Ibisabwa ku Bakoresha
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Kugira ngo ukoreshe urubuga rwacu, ugomba:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Kuba ufite byibuze imyaka 18</li>
                  <li>Gutanga amakuru yukuri kandi y'ukuri</li>
                  <li>Gufata ubushobozi bw'igikoresho cyawe</li>
                  <li>Kubahiriza amategeko y'u Rwanda</li>
                  <li>Kwubaha abandi bakoresha urubuga</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-primary" />
                  Ibyo Birebana n'Amafaranga
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Ibyerekeye gutangaza imodoka:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Ikiguzi cyo gutangaza imodoka ni 7,500 Frw</li>
                  <li>Ubishyura mbere y'uko imodoka yawe igaragara ku rubuga</li>
                  <li>Nta mafaranga azasubizwa iyo uhisemo gutarangiza</li>
                  <li>Imodoka yawe izagaragara ku rubuga igihe cy'ukwezi kumwe</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-primary" />
                  Ibyo Bibujijwe
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Ntushobora:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Gutangaza imodoka zitari izawe</li>
                  <li>Gutanga amakuru y'ibinyoma</li>
                  <li>Gushyiraho amafoto y'imodoka atari ay'imodoka yawe</li>
                  <li>Gukoresha urubuga mu gutangaza ibintu bitari imodoka</li>
                  <li>Kunenga cyangwa gukangiza abandi bakoresha</li>
                  <li>Gukora ikintu cyangwa cyose giteye ubwoba mu Rwanda</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inshingano</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>VuganaCar.rw:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Ntabwo dufata inshingano z'amakuru y'imodoka zatangajwe n'abakoresha</li>
                  <li>Ntabwo dufata inshingano z'ubucuruzi hagati y'abakoresha</li>
                  <li>Dushobora gusiba amatangazo atubahiriza amabwiriza yacu</li>
                  <li>Dusaba ko mukora ubushakashatsi bwawe mbere yo kugura imodoka</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Guhindura Amabwiriza</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Dushobora guhindura aya mabwiriza ubwoba bwose. Abahinduka bazamenyeshwa 
                  ku rubuga rwacu. Iyo ukomeje gukoresha urubuga nyuma y'uko amabwiriza ahindutse, 
                  bisobanura ko wemeye amabwiriza mashya.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tuvugishe</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Niba ufite ibibazo bijyanye n'aya mabwiriza, tuvugishe kuri:
                </p>
                <div className="mt-4 space-y-2">
                  <p><strong>Imeyili:</strong> terms@vuganacar.rw</p>
                  <p><strong>Telefone:</strong> +250 784 386 836</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Itariki ya Guhindura:</strong> Mutarama 30, 2025
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfService;