import { Car, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-automotive-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-primary p-2 rounded-lg">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">VuganaCar</h3>
                <p className="text-sm text-gray-300">.rw</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Urubuga rushya rwo guhangana mu bikorwa by'imodoka mu Rwanda. 
              Vugana, wumvikane, ugure cyangwa ugurishe imodoka wizeye!
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-white/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-white/10">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-white/10">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Amasano</h4>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Ahabanza</a></li>
              <li><a href="/browse" className="text-gray-300 hover:text-white transition-colors">Reba Imodoka</a></li>
              <li><a href="/sell" className="text-gray-300 hover:text-white transition-colors">Gurisha Imodoka</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">Ibyerekeye Twebwe</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Tuvugishe</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Itegeko n'Amabwiriza</h4>
            <ul className="space-y-3">
              <li><a href="/privacy" className="text-gray-300 hover:text-white transition-colors">Ubwoba bw'amakuru</a></li>
              <li><a href="/terms" className="text-gray-300 hover:text-white transition-colors">Amabwiriza yo gukoresha</a></li>
              <li><a href="/cookies" className="text-gray-300 hover:text-white transition-colors">Politiki ya Cookies</a></li>
              <li><a href="/help" className="text-gray-300 hover:text-white transition-colors">Ubufasha</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Tuvugishe</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-gray-300">+250 784 386 836</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-gray-300">info@vuganacar.rw</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-gray-300">Kigali, Rwanda</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold text-white mb-3">Twandikire</h5>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Email yawe..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <Button variant="secondary" size="sm">
                  Ohereza
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2025 VuganaCar.rw — Imodoka zizewe mu Rwanda
            </p>
            <p className="text-gray-400 text-xs mt-2 md:mt-0">
              Byakozwe n'ubukungu na IYIZIRE Anique
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;