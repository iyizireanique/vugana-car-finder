import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Calendar, DollarSign } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import heroImage from '@/assets/hero-banner.jpg';

const HeroSection = () => {
  const [searchData, setSearchData] = useState({
    make: '',
    location: '',
    year: '',
    maxPrice: ''
  });

  const handleSearch = () => {
    console.log('Search data:', searchData);
    // TODO: Implement search functionality
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Hero Text */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Vugana, Wumvikane,
            <span className="block text-accent">Ugure cyangwa Ugurishe</span>
            Imodoka wizeye!
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed">
            Urubuga rushya rwo guhangana mu bikorwa by'imodoka mu Rwanda
          </p>

          {/* Search Bar */}
          <div className="bg-card/95 backdrop-blur-sm p-6 rounded-2xl shadow-hero max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Car Make/Model */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center">
                  <Search className="h-4 w-4 mr-2" />
                  Ubwoko / Model
                </label>
                <Select value={searchData.make} onValueChange={(value) => setSearchData({...searchData, make: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Hitamo ubwoko..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="toyota">Toyota</SelectItem>
                    <SelectItem value="nissan">Nissan</SelectItem>
                    <SelectItem value="honda">Honda</SelectItem>
                    <SelectItem value="hyundai">Hyundai</SelectItem>
                    <SelectItem value="kia">Kia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Aho iherereye
                </label>
                <Select value={searchData.location} onValueChange={(value) => setSearchData({...searchData, location: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Hitamo intara..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kigali">Kigali</SelectItem>
                    <SelectItem value="south">Amajyepfo</SelectItem>
                    <SelectItem value="north">Amajyaruguru</SelectItem>
                    <SelectItem value="east">Iburasirazuba</SelectItem>
                    <SelectItem value="west">Iburengerazuba</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Year */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Umwaka
                </label>
                <Select value={searchData.year} onValueChange={(value) => setSearchData({...searchData, year: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Kuva..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                    <SelectItem value="2020">2020</SelectItem>
                    <SelectItem value="2019">2019</SelectItem>
                    <SelectItem value="2018">2018</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Max Price */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Igiciro ntarengwa
                </label>
                <Input
                  placeholder="Frw 0"
                  value={searchData.maxPrice}
                  onChange={(e) => setSearchData({...searchData, maxPrice: e.target.value})}
                  className="h-10"
                />
              </div>
            </div>

            {/* Search Button */}
            <Button 
              onClick={handleSearch}
              size="lg" 
              variant="gradient"
              className="w-full md:w-auto text-lg px-12 py-3 rounded-xl"
            >
              <Search className="h-5 w-5 mr-3" />
              Shakisha Imodoka
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;