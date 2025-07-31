import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Star, Quote, MessageSquare, Loader2 } from 'lucide-react';

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
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(6);

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
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ibyo Abakiliya Bavuga
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Reba icyo abakoresha bariwandika ku byo bakoze hano
          </p>
        </div>

        {/* Testimonials Grid */}
        {loading ? (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Turimo gutangira ibyo abantu bavuze...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {comments.map((comment) => (
              <Card key={comment.id} className={`${comment.is_featured ? 'ring-2 ring-primary' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Quote className="h-8 w-8 text-primary/20 mr-2" />
                    <div className="flex">
                      {renderStars(comment.rating)}
                    </div>
                  </div>
                  <p className="text-muted-foreground italic mb-4">
                    "{comment.comment_text}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{comment.user_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(comment.created_at).toLocaleDateString('rw-RW')}
                      </p>
                    </div>
                    {comment.is_featured && (
                      <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                        Featured
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Add Comment Form */}
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                Tanga Igitekerezo Cyawe
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitComment} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Amazina Yawe *</Label>
                    <Input
                      id="name"
                      placeholder="Andika amazina yawe..."
                      value={newComment.name}
                      onChange={(e) => setNewComment(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Yawe *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Andika email yawe..."
                      value={newComment.email}
                      onChange={(e) => setNewComment(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label>Amanota (1-5 inyenyeri) *</Label>
                  <div className="flex items-center space-x-1 mt-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleRatingClick(i + 1)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`h-6 w-6 cursor-pointer transition-colors ${
                            i < newComment.rating 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300 hover:text-yellow-200'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      ({newComment.rating} inyenyeri)
                    </span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="comment">Igitekerezo Cyawe *</Label>
                  <Textarea
                    id="comment"
                    placeholder="Tubereko icyo uvuga ku serivisi zacu..."
                    value={newComment.comment}
                    onChange={(e) => setNewComment(prev => ({ ...prev, comment: e.target.value }))}
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full"
                >
                  {submitting ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Turimo kohereza...</>
                  ) : (
                    'Ohereza Igitekerezo'
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Igitekerezo cyawe kizagaragara nyuma yo kwemezwa na admin.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;