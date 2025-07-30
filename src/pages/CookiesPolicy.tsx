import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cookie, Settings, BarChart3, Shield } from 'lucide-react';

const CookiesPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Politiki ya Cookies
            </h1>
            <p className="text-muted-foreground text-lg">
              Amakuru yerekeye uko dukoresha cookies ku rubuga rwa VuganaCar.rw
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Cookie className="h-5 w-5 mr-2 text-primary" />
                  Cookies ni iki?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Cookies ni amafayili mato ashyirwa ku mudasobwa wawe iyo usura urubuga. 
                  Agufasha kwibuka ibyo wakoreye ku rubuga kandi agakora experience yawe ibe nziza.
                </p>
                <p>
                  Cookies ntago bifite amakuru y'ibanga cyangwa y'ubwoba. Ni amakuru mato gusa 
                  yo kugufasha neza mu gukoresha urubuga rwacu.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-primary" />
                  Ubwoko bwa Cookies Dukoresha
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">1. Cookies ngombwa (Necessary Cookies)</h4>
                  <p className="text-sm text-muted-foreground">
                    Izi cookies zikenewe urubuga rukore neza. Zitwica winjira muri account yawe, 
                    kandi zikaziguza amakuru yawe y'ibanze.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">2. Performance Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    Zidufasha kureba uko urubuga rukoresha, ko hari amakuru akenshi abazamo, 
                    kandi ko hari ikosa rikunze kubaho.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">3. Functional Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    Ziradufasha kwibuka ibyo wahisemo, nk'ururimi, intara, n'ibindi byerekeye 
                    uko ukunda urubuga rukore.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                  Google Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Dukoresha Google Analytics kugira dumenye uko abantu bakoresha urubuga rwacu. 
                  Ibi bikaba bidufasha kuzamura serivisi zacu.
                </p>
                <p>
                  Google Analytics ikoresha cookies kugira ngo ikore analytics z'urubuga. 
                  Amakuru yakusanywe ntago agaragaza ubwite bwawe.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  Gukurikiza Cookies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Ufite uburenganzira bwo gukurikiza cookies:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Kwemera byose:</strong> Femera cookies zose zidukenewe</li>
                  <li><strong>Guhitamo:</strong> Hitamo ubwoko bwa cookies ukeneye gusa</li>
                  <li><strong>Kwanga byose:</strong> Wanga cookies zose (urubuga rushobora ntiruzi rukore neza)</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  Ushobora guhindura amahitamo yawe igihe cyose mu browser yawe cyangwa 
                  usabire page yandi settings y'urubuga.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gusiba Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Ushobora gusiba cookies kuri browser yawe:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Chrome:</strong> Settings → Privacy and security → Clear browsing data</li>
                  <li><strong>Firefox:</strong> Options → Privacy & Security → Clear Data</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                  <li><strong>Edge:</strong> Settings → Reset and cleanup → Clear browsing data</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tuvugishe</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Niba ufite ibibazo bijyanye na cookies, tuvugishe kuri:
                </p>
                <div className="mt-4 space-y-2">
                  <p><strong>Imeyili:</strong> cookies@vuganacar.rw</p>
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

export default CookiesPolicy;