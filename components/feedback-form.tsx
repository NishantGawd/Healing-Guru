"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Star, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

// THE FIX: Updated props for modal functionality
interface FeedbackFormProps {
  appointmentId: string;
  onClose: () => void;
  onSubmitSuccess: () => void;
}

export function FeedbackForm({ appointmentId, onClose, onSubmitSuccess }: FeedbackFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({ title: "Please select a rating.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appointment_id: appointmentId, rating, comments }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to submit feedback.");
      
      toast({ title: "Feedback Submitted!", description: "Thank you for sharing your experience." });
      onSubmitSuccess(); // THE FIX: Call the success function to refresh the dashboard
    } catch (error: any) {
      toast({ title: "Submission Failed", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
      onClose(); // THE FIX: Close the modal regardless of success or failure
    }
  };

  return (
    // THE FIX: Changed to a Card component for a consistent modal look
    <Card className="w-full max-w-lg animate-in fade-in zoom-in-95">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Session Feedback</CardTitle>
          <CardDescription>Your feedback helps me improve. How was your session?</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5" /></Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label>Overall Rating</Label>
          <div className="flex items-center space-x-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  "h-8 w-8 cursor-pointer transition-colors",
                  (hoverRating || rating) >= star ? "text-gold fill-gold" : "text-charcoal/20"
                )}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              />
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="comments">Additional Comments (Optional)</Label>
          <Textarea
            id="comments"
            placeholder="What went well? What could be improved?"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="mt-2"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={loading} className="bg-gold hover:bg-gold/90 text-cream">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit Feedback
        </Button>
      </CardFooter>
    </Card>
  );
}

