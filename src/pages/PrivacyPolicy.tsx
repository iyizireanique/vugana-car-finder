import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, UserCheck, Lock } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ubwoba bw'Amakuru
            </h1>
            <p className="text-muted-foreground text-lg">
              Tugira agaciro amakuru yawe kandi tugafata umutekano wayo nk'uwa ngombwa.
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  Amakuru Dukusanya
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Iyo ukoresheje urubuga rwacu, dushobora gukusanya amakuru akurikira:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Amazina yawe yuzuye</li>
                  <li>Imeyili yawe</li>
                  <li>Nimero ya telefone</li>
                  <li>Aho ubarizwa</li>
                  <li>Amakuru y'imodoka washyizeho</li>
                  <li>Amafoto y'imodoka</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-primary" />
                  Uko Dukoresha Amakuru Yawe
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Amakuru yawe duyakoresha kugira ngo:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Tugufashe gutangaza imodoka yawe</li>
                  <li>Tuvugane nawe bijyanye n'imodoka ziri ku rubuga</li>
                  <li>Tukore serivisi zacu neza</li>
                  <li>Tugusabire amakuru mashya ku rubuga</li>
                  <li>Tukumire umutekano w'urubuga rwacu</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserCheck className="h-5 w-5 mr-2 text-primary" />
                  Gusangira Amakuru n'Abandi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Ntatufata amakuru yawe tuyatanga abandi, keretse:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Iyo wemeye ko dusangira amakuru yawe</li>
                  <li>Iyo itegeko rigomba</li>
                  <li>Iyo bikenewe kurinda umutekano w'urubuga</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-primary" />
                  Umutekano w'Amakuru
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Dufite uburyo bw'umutekano bwo kurinda amakuru yawe:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Encryption mu kwemeza amakuru</li>
                  <li>Access limits - abafite ububasha bwonyine</li>
                  <li>Regular updates zo guhoza umutekano</li>
                  <li>Firewall protection</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Uburenganzira Bwawe</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Ufite uburenganzira bwo:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Kumenya amakuru yawe dufite</li>
                  <li>Gusaba tugahindue cyangwa tugasibe</li>
                  <li>Gusaba ko tutakongera tukoresheje amakuru yawe</li>
                  <li>Kwanga ko dukusaba amakuru mashya</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tuvugishe</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Niba ufite ibibazo bijyanye n'ubwoba bw'amakuru yawe, tuvugishe kuri:
                </p>
                <div className="mt-4 space-y-2">
                  <p><strong>Imeyili:</strong> privacy@vuganacar.rw</p>
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

export default PrivacyPolicy;