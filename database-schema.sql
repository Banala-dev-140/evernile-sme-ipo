-- Create assessment_responses table
CREATE TABLE IF NOT EXISTS assessment_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  assessment_type VARCHAR(20) NOT NULL CHECK (assessment_type IN ('mainboard', 'sme')),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_phone VARCHAR(20),
  total_score INTEGER NOT NULL,
  readiness_score DECIMAL(3,1) NOT NULL,
  readiness_label VARCHAR(50) NOT NULL,
  responses JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_assessment_responses_type ON assessment_responses(assessment_type);
CREATE INDEX IF NOT EXISTS idx_assessment_responses_created_at ON assessment_responses(created_at);
CREATE INDEX IF NOT EXISTS idx_assessment_responses_email ON assessment_responses(user_email);

-- Create a function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_assessment_responses_updated_at 
    BEFORE UPDATE ON assessment_responses 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE assessment_responses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (you can restrict this based on your needs)
CREATE POLICY "Allow all operations on assessment_responses" ON assessment_responses
    FOR ALL USING (true);

-- Sample data structure for responses JSONB field:
-- [
--   {
--     "question_id": 1,
--     "question_text": "Type of Company",
--     "selected_option": "Public Limited",
--     "option_weight": 4
--   },
--   {
--     "question_id": 2,
--     "question_text": "The Business has been in existence for",
--     "selected_option": "More than 3 years",
--     "option_weight": 4
--   }
-- ]
