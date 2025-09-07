"use client"
import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useSWRConfig } from "swr" // THE FIX: Import SWR's mutate function
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from "./loading-spinner"
import { CheckCircle, ArrowLeft } from "lucide-react"

const HEALTH_CONDITIONS = [
  "Anxiety or Stress", "Chronic Pain", "Digestive Issues", "Depression", "Insomnia", "Headaches or Migraines", "None of the above"
];
const SESSION_GOALS = [
  "Relaxation", "Emotional Healing", "Pain Relief", "Spiritual Growth", "Clarity and Focus", "Other"
];

export function IntakeForm({ appointmentId }: { appointmentId: string }) {
  const router = useRouter()
  const { toast } = useToast()
  const { mutate } = useSWRConfig() // THE FIX: Initialize mutate
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  
  // State for form data
  const [healthConditions, setHealthConditions] = useState<string[]>([])
  const [medications, setMedications] = useState("")
  const [sessionGoals, setSessionGoals] = useState<string[]>([])
  const [otherGoal, setOtherGoal] = useState("")

  // --- THE FIX: Form Validation Logic ---
  const canNextFromStep1 = useMemo(() => {
    return healthConditions.length > 0 && medications.trim() !== "";
  }, [healthConditions, medications]);

  const canSubmitFromStep2 = useMemo(() => {
    if (sessionGoals.length === 0) return false;
    if (sessionGoals.includes("Other") && otherGoal.trim() === "") return false;
    return true;
  }, [sessionGoals, otherGoal]);
  // ------------------------------------

  const handleCheckboxChange = (
    list: string[], 
    setter: React.Dispatch<React.SetStateAction<string[]>>, 
    item: string
  ) => {
    if (item === "None of the above") {
      setter(list.includes(item) ? [] : [item]);
    } else {
      const newList = list.includes(item)
        ? list.filter((i) => i !== item && i !== "None of the above")
        : [...list.filter(i => i !== "None of the above"), item];
      setter(newList);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const finalGoals = sessionGoals.includes("Other") 
        ? sessionGoals.filter(g => g !== "Other").concat(otherGoal) 
        : sessionGoals;

      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointment_id: appointmentId,
          health_conditions: healthConditions,
          medications,
          session_goals: finalGoals,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit form.");
      
      toast({ title: "Intake Form Submitted!", description: "Thank you for providing your information." });
      
      // THE FIX: Mutate the appointments API endpoint to refresh the data
      mutate((key: string) => typeof key === 'string' && key.startsWith('/api/appointments'));
      
      router.push("/dashboard/appointments");

    } catch (error: any) {
      toast({ title: "Submission Failed", description: error.message});
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="font-serif text-2xl text-charcoal">Client Intake Form</CardTitle>
        <p className="text-sm text-charcoal/70">
          This information is confidential and helps tailor the session to your needs.
        </p>
      </CardHeader>
      <CardContent>
        {/* Step 1: Health History */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <h3 className="font-semibold text-lg text-charcoal">Step 1 of 2: Health History</h3>
            <div className="space-y-4">
              <label className="font-medium text-charcoal">Current Health Conditions</label>
              <p className="text-sm text-charcoal/60">Please select any that apply.</p>
              <div className="grid grid-cols-2 gap-4">
                {HEALTH_CONDITIONS.map((condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <Checkbox
                      id={condition}
                      checked={healthConditions.includes(condition)}
                      onCheckedChange={() => handleCheckboxChange(healthConditions, setHealthConditions, condition)}
                    />
                    <label htmlFor={condition} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {condition}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="medications" className="font-medium text-charcoal">Current Medications or Supplements</label>
              <br />
              <br />
              <Textarea
                id="medications"
                value={medications}
                onChange={(e) => setMedications(e.target.value)}
                placeholder="Please list any relevant medications..."
                className="min-h-[100px]"
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setStep(2)} disabled={!canNextFromStep1}>Next</Button>
            </div>
          </div>
        )}

        {/* Step 2: Goals */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <h3 className="font-semibold text-lg text-charcoal">Step 2 of 2: Session Goals</h3>
            <div className="space-y-4">
              <label className="font-medium text-charcoal">What are your goals for this session?</label>
              <p className="text-sm text-charcoal/60">Select your primary intentions.</p>
              <div className="grid grid-cols-2 gap-4">
                {SESSION_GOALS.map((goal) => (
                  <div key={goal} className="flex items-center space-x-2">
                    <Checkbox
                      id={goal}
                      checked={sessionGoals.includes(goal)}
                      onCheckedChange={() => handleCheckboxChange(sessionGoals, setSessionGoals, goal)}
                    />
                    <label htmlFor={goal} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {goal}
                    </label>
                  </div>
                ))}
              </div>
              {sessionGoals.includes("Other") && (
                <div className="space-y-2 animate-in fade-in">
                  <label htmlFor="otherGoal" className="font-medium text-charcoal">Please specify:</label>
                  <Textarea
                    id="otherGoal"
                    value={otherGoal}
                    onChange={(e) => setOtherGoal(e.target.value)}
                    placeholder="Describe your other goal..."
                  />
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <Button variant="ghost" onClick={() => setStep(1)}><ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
              <Button onClick={handleSubmit} disabled={!canSubmitFromStep2 || submitting}>
                {submitting ? <LoadingSpinner size="sm" /> : "Submit Intake Form"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

