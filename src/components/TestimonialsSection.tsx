import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Star, Quote, MessageSquare, Loader2, Users, Sparkles } from 'lucide-react';
import testimonialsImage from '@/assets/testimonials-animation.jpg';

interface Comment {
  id: string;
  user_name: string;
  comment_text: string;
  rating: number;
  created_at: string;
  is_featured: boolean;
}

const TestimonialsSection = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    comment: '',
    rating: 5
  });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Original testimonials (static)
  const originalTestimonials = [
    {
      name: 'Jean Pierre',
      location: 'Kigali',
      text: 'Nabonye imodoka nakundaga ku giciro cyiza, nta kuvunika. Urakoze VuganaCar!',
      rating: 5,
    },
    {
      name: 'Claudine',
      location: 'Huye',
      text: 'Nashyizeho imodoka yanjye, maze kuyigurisha mu minsi 3 gusa!',
      rating: 5,
    },
    {
      name: 'Emmanuel',
      location: 'Musanze',
      text: 'Urubuga ruroroshye kandi rwizeye. Nabonye imodoka yanjye hano byoroshye!',
      rating: 5,
    }
  ];

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('is_approved', true)
        .eq('is_featured', true) // Only featured comments in main section
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setComments(data || []);
    } catch (error: any) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.comment.trim() || !newComment.name.trim() || !newComment.email.trim()) {
      toast({
        title: "Ikosa",
        description: "Uzuza byose bishingiye.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('comments')
        .insert({
          user_id: user?.id || null,
          user_name: newComment.name,
          user_email: newComment.email,
          comment_text: newComment.comment,
          rating: newComment.rating,
          is_approved: false // Will be approved by admin
        });

      if (error) throw error;

      toast({
        title: "Murakoze!",
        description: "Icyo mwavuze cyoherejwe. Kizagaragara nyuma yo kwemezwa.",
      });

      setNewComment({
        name: '',
        email: '',
        comment: '',
        rating: 5
      });

    } catch (error: any) {
      toast({
        title: "Ikosa",
        description: "Ntibyakunze kohereza icyo mwavuze. Gerageza ukundi.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleRatingClick = (rating: number) => {
    setNewComment(prev => ({ ...prev, rating }));
  };

  return (
    <section className="py-16 bg-gradient-to-b from-card to-automotive-light">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ibyo Abakiliya Bavuga
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Reba icyo abakoresha bariwandika ku byo bakoze hano
          </p>
        </div>

        {/* Original Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {originalTestimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-card-hover transition-all duration-300 bg-card border-0">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Quote className="h-6 w-6 text-primary" />
                  </div>
                </div>

                {/* Stars */}
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-center text-foreground mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Comments from Database */}
        {!loading && comments.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-center text-foreground mb-8">
              Ibindi Byavuzwe n'Abakiliya
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comments.map((comment) => (
                <Card key={comment.id} className="ring-2 ring-primary/20 hover:ring-primary/40 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Quote className="h-6 w-6 text-primary/30 mr-3" />
                      <div className="flex">
                        {renderStars(comment.rating)}
                      </div>
                    </div>
                    <blockquote className="text-muted-foreground italic mb-4 leading-relaxed">
                      "{comment.comment_text}"
                    </blockquote>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {comment.user_name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{comment.user_name}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(comment.created_at).toLocaleDateString('rw-RW')}
                          </p>
                        </div>
                      </div>
                      <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                        ⭐ Featured
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Add Comment Form - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Animated Image & Description */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-card to-primary/5 rounded-2xl p-8 border border-primary/10">
                <img 
                  src={testimonialsImage} 
                  alt="People sharing testimonials"
                  className="w-full h-64 object-cover rounded-lg mb-6 animate-fade-in hover-scale"
                />
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Users className="h-6 w-6 text-primary" />
                    <h3 className="text-2xl font-bold text-foreground">Turakeneye Igitekerezo Cyawe!</h3>
                    <Sparkles className="h-6 w-6 text-accent animate-bounce" />
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Ibyo uvuga bifasha abandi bakoresha gutanga icyemezo cyo gukoresha serivisi zacu. 
                    Igitekerezo cyawe ni cy'ingenzi cyane kuri twebwe!
                  </p>
                  <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>Amanota ya 5/5</span>
                    </div>
                    <div className="h-4 w-px bg-border"></div>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      <span>Byihuse kandi byoroshye</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Comment Form */}
          <div className="order-1 lg:order-2">
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5 shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 mr-2 text-primary animate-bounce" />
                  Tanga Igitekerezo Cyawe
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Uzuza form ikurikira - bitabara iminsi 2 gusa!
                </p>
              </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitComment} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-primary" />
                      Amazina Yawe *
                    </Label>
                    <Input
                      id="name"
                      placeholder="Andika amazina yawe..."
                      value={newComment.name}
                      onChange={(e) => setNewComment(prev => ({ ...prev, name: e.target.value }))}
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1 text-primary" />
                      Email Yawe *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Andika email yawe..."
                      value={newComment.email}
                      onChange={(e) => setNewComment(prev => ({ ...prev, email: e.target.value }))}
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400" />
                    Amanota (1-5 inyenyeri) *
                  </Label>
                  <div className="flex items-center justify-center space-x-2 p-4 bg-muted/30 rounded-lg">
                    {Array.from({ length: 5 }, (_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleRatingClick(i + 1)}
                        className="focus:outline-none transition-all duration-200 hover:scale-110"
                      >
                        <Star
                          className={`h-8 w-8 cursor-pointer transition-colors ${
                            i < newComment.rating 
                              ? 'text-yellow-400 fill-current animate-pulse' 
                              : 'text-gray-300 hover:text-yellow-200'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-4 text-lg font-semibold text-primary">
                      {newComment.rating} inyenyeri
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comment" className="flex items-center">
                    <Quote className="h-4 w-4 mr-1 text-primary" />
                    Igitekerezo Cyawe *
                  </Label>
                  <Textarea
                    id="comment"
                    placeholder="Tubereko icyo uvuga ku serivisi zacu... Ni iki cyane ukunda? Hari icyo ushobora gutunganya?"
                    value={newComment.comment}
                    onChange={(e) => setNewComment(prev => ({ ...prev, comment: e.target.value }))}
                    rows={4}
                    className="border-primary/20 focus:border-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 text-lg bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 animate-fade-in"
                >
                  {submitting ? (
                    <><Loader2 className="h-5 w-5 mr-2 animate-spin" /> Turimo kohereza...</>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Ohereza Igitekerezo
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center bg-muted/30 p-3 rounded-lg">
                  🔒 Amakuru yawe aracungwa neza. Igitekerezo cyawe kizagaragara nyuma yo kwemezwa na admin.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;