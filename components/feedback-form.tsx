"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Star, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function FeedbackForm({ appointmentId }: { appointmentId: string }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({ title: "Please select a rating."});
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
      router.push('/dashboard/appointments');
    } catch (error: any) {
      toast({ title: "Submission Failed", description: error.message});
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Session Feedback</CardTitle>
        <CardDescription>Your feedback helps me improve. How was your session?</CardDescription>
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
                  (hoverRating || rating) >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
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
          <br />
          <Textarea
            id="comments"
            placeholder="What went well? What could be improved?"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSubmit} disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit Feedback
        </Button>
      </CardFooter>
    </Card>
  );
}
