-- 1. Create the table to store client intake form data
CREATE TABLE public.intake_forms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID UNIQUE NOT NULL REFERENCES public.appointments(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    health_conditions TEXT[],
    medications TEXT,
    session_goals TEXT,
    preferences JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.intake_forms ENABLE ROW LEVEL SECURITY;

-- Create Policies for intake_forms
CREATE POLICY "Users can view their own intake forms" ON public.intake_forms
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own intake forms" ON public.intake_forms
    FOR INSERT WITH CHECK (auth.uid() = user_id);


-- 2. Create the table to store post-session feedback
CREATE TABLE public.feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID UNIQUE NOT NULL REFERENCES public.appointments(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comments TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Create Policies for feedback
CREATE POLICY "Users can view their own feedback" ON public.feedback
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own feedback" ON public.feedback
    FOR INSERT WITH CHECK (auth.uid() = user_id);


-- 3. Add new columns to your existing appointments table
ALTER TABLE public.appointments
ADD COLUMN IF NOT EXISTS intake_form_completed BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS feedback_submitted BOOLEAN DEFAULT FALSE;



-- Drop all old policies on both tables to ensure a clean slate.
DROP POLICY IF EXISTS "Allow authenticated users to insert their own intake form" ON public.intake_forms;
DROP POLICY IF EXISTS "Allow users to insert forms for their own appointments" ON public.intake_forms;
DROP POLICY IF EXISTS "Allow users to insert their own intake forms" ON public.intake_forms;

DROP POLICY IF EXISTS "Allow users to insert their own feedback" ON public.feedback;
DROP POLICY IF EXISTS "Allow users to insert feedback for their own appointments" ON public.feedback;

-- Ensure RLS is enabled on both tables.
ALTER TABLE public.intake_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- The definitive, correct policy for INTAKE FORMS.
-- It allows a user to insert a row only if the user_id in that row matches their own ID.
CREATE POLICY "Allow users to insert their own intake forms"
ON public.intake_forms
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- The definitive, correct policy for FEEDBACK.
CREATE POLICY "Allow users to insert their own feedback"
ON public.feedback
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.appointments
DROP COLUMN IF EXISTS intake_form_completed;

ALTER TABLE public.appointments
DROP COLUMN IF EXISTS feedback_submitted;
