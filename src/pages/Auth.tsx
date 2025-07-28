import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Car, Loader2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Auth = () => {
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn(loginData.email, loginData.password);
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: "Ikosa",
            description: "Email cyangwa password ntibiri byo. Gerageza ukundi.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Ikosa",
            description: error.message,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Murakaza neza!",
          description: "Mwinjiye neza ku rubuga.",
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: "Ikosa",
        description: "Hari ikosa ry'umuyoboro. Gerageza ukundi.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Ikosa",
        description: "Password ntabwo zihuye. Subira ugerageze.",
        variant: "destructive",
      });
      return;
    }

    if (signupData.password.length < 6) {
      toast({
        title: "Ikosa", 
        description: "Password igomba kuba ifite byibuze inyuguti 6.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp(signupData.email, signupData.password, {
        full_name: signupData.fullName,
        phone: signupData.phone
      });
      
      if (error) {
        if (error.message.includes('User already registered')) {
          toast({
            title: "Ikosa",
            description: "Email iyo wifashishije isanzwe iri mu rubuga. Gerageza kuyinjira.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Ikosa",
            description: error.message,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Kwiyandikisha byagenze neza!",
          description: "Kanda kuri button yo kwemeza muri email yawe hanyuma urinjire.",
        });
      }
    } catch (error) {
      toast({
        title: "Ikosa",
        description: "Hari ikosa ry'umuyoboro. Gerageza ukundi.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Car className="h-8 w-8 text-primary mr-2" />
              <h1 className="text-2xl font-bold text-foreground">VuganaCart</h1>
            </div>
            <p className="text-muted-foreground">
              Injira cyangwa wiyandikishe kugira ngo utangire gutangaza imodoka zawe
            </p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Kwinjira</TabsTrigger>
              <TabsTrigger value="signup">Kwiyandikisha</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Kwinjira mu konti yawe</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="example@email.com"
                        value={loginData.email}
                        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Andika password yawe"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={loading}>
                      {loading ? (
                        <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Turategereza...</>
                      ) : (
                        'Kwinjira'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Kora konti nshya</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                      <Label htmlFor="signup-name">Amazina yuzuye *</Label>
                      <Input
                        id="signup-name"
                        placeholder="Andika amazina yawe yuzuye"
                        value={signupData.fullName}
                        onChange={(e) => setSignupData({...signupData, fullName: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="signup-phone">Nimero ya telefone *</Label>
                      <Input
                        id="signup-phone"
                        placeholder="+250 7XX XXX XXX"
                        value={signupData.phone}
                        onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="signup-email">Email *</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="example@email.com"
                        value={signupData.email}
                        onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="signup-password">Password *</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Byibuze inyuguti 6"
                        value={signupData.password}
                        onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="signup-confirm">Emeza password *</Label>
                      <Input
                        id="signup-confirm"
                        type="password"
                        placeholder="Ongera wandike password"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                        required
                      />
                    </div>

                    <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <p>
                        Mu gukora konti, wemera amategeko y'ubukoresha bwacu.
                      </p>
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={loading}>
                      {loading ? (
                        <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Turategereza...</>
                      ) : (
                        'Kwiyandikisha'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Auth;