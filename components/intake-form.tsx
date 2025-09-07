"use client"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, X } from "lucide-react"

const HEALTH_CONDITIONS = ["Anxiety or Stress", "Chronic Pain", "Digestive Issues", "Depression", "Insomnia", "Headaches or Migraines", "None of the above"];
const SESSION_GOALS = ["Relaxation", "Emotional Healing", "Pain Relief", "Spiritual Growth", "Clarity and Focus", "Other"];

interface IntakeFormProps {
  onClose: () => void;
  onSubmitSuccess: (data: any) => void;
}

export function IntakeForm({ onClose, onSubmitSuccess }: IntakeFormProps) {
  const [step, setStep] = useState(1)
  const [healthConditions, setHealthConditions] = useState<string[]>([])
  const [medications, setMedications] = useState("")
  const [sessionGoals, setSessionGoals] = useState<string[]>([])
  const [otherGoal, setOtherGoal] = useState("")

  const canNextFromStep1 = useMemo(() => healthConditions.length > 0 && medications.trim() !== "", [healthConditions, medications]);
  const canSubmitFromStep2 = useMemo(() => {
    if (sessionGoals.length === 0) return false;
    if (sessionGoals.includes("Other") && otherGoal.trim() === "") return false;
    return true;
  }, [sessionGoals, otherGoal]);

  const handleCheckboxChange = (setter: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setter(prev => {
      if (item === "None of the above") return prev.includes(item) ? [] : [item];
      const newList = prev.includes(item)
        ? prev.filter(i => i !== item && i !== "None of the above")
        : [...prev.filter(i => i !== "None of the above"), item];
      return newList;
    });
  };

  const handleSubmit = () => {
    const finalGoals = sessionGoals.includes("Other")
      ? sessionGoals.filter(g => g !== "Other").concat(otherGoal)
      : sessionGoals;
    
    const formData = {
      health_conditions: healthConditions,
      medications,
      session_goals: finalGoals,
    };
    onSubmitSuccess(formData);
  };

  return (
    <Card className="w-full max-w-2xl animate-in fade-in zoom-in-95 flex flex-col max-h-[90vh]">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="font-serif text-2xl text-charcoal">Client Intake Form</CardTitle>
          <p className="text-sm text-charcoal/70">This information is confidential.</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close intake form">
            <X className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="overflow-y-auto space-y-6">
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="font-semibold text-lg text-charcoal">Step 1 of 2: Health History</h3>
            <div className="space-y-4">
              <label className="font-medium text-charcoal">Current Health Conditions</label>
              <p className="text-sm text-charcoal/60">Please select any that apply.</p>
              <div className="grid grid-cols-2 gap-4">
                {HEALTH_CONDITIONS.map((condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <Checkbox
                      id={`intake-${condition}`}
                      checked={healthConditions.includes(condition)}
                      onCheckedChange={() => handleCheckboxChange(setHealthConditions, condition)}
                    />
                    <label htmlFor={`intake-${condition}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {condition}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="medications" className="font-medium text-charcoal">Current Medications or Supplements</label>
              <Textarea
                id="medications"
                value={medications}
                onChange={(e) => setMedications(e.target.value)}
                placeholder="Please list any relevant medications..."
                className="min-h-[100px]"
              />
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="font-semibold text-lg text-charcoal">Step 2 of 2: Session Goals</h3>
            <div className="space-y-4">
              <label className="font-medium text-charcoal">What are your goals for this session?</label>
              <p className="text-sm text-charcoal/60">Select your primary intentions.</p>
              <div className="grid grid-cols-2 gap-4">
                {SESSION_GOALS.map((goal) => (
                  <div key={goal} className="flex items-center space-x-2">
                    <Checkbox
                      id={`goal-${goal}`}
                      checked={sessionGoals.includes(goal)}
                      onCheckedChange={() => handleCheckboxChange(setSessionGoals, goal)}
                    />
                    <label htmlFor={`goal-${goal}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="ghost" onClick={() => step === 1 ? onClose() : setStep(1)}>
          {step === 1 ? 'Cancel' : <><ArrowLeft className="w-4 h-4 mr-2" /> Back</>}
        </Button>
        {step === 1 ? (
          <Button onClick={() => setStep(2)} disabled={!canNextFromStep1}>Next</Button>
        ) : (
          <Button onClick={handleSubmit} disabled={!canSubmitFromStep2}>Submit Intake Form</Button>
        )}
      </CardFooter>
    </Card>
  );
}

