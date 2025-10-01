-- Create assessment_responses table with separate columns for each question
CREATE TABLE IF NOT EXISTS assessment_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  assessment_type VARCHAR(20) NOT NULL CHECK (assessment_type IN ('mainboard', 'sme')),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_phone VARCHAR(20),
  total_score INTEGER NOT NULL,
  readiness_score DECIMAL(3,1) NOT NULL,
  readiness_label VARCHAR(50) NOT NULL,
  
  -- Mainboard IPO Questions (5 questions)
  -- Question 1: Type of Company
  q1_type_of_company VARCHAR(50),
  q1_type_of_company_weight INTEGER,
  
  -- Question 2: Business Existence
  q2_business_existence VARCHAR(50),
  q2_business_existence_weight INTEGER,
  
  -- Question 3: Paid up Capital
  q3_paid_up_capital VARCHAR(50),
  q3_paid_up_capital_weight INTEGER,
  
  -- Question 4: IPO Filing Timeline
  q4_ipo_filing_timeline VARCHAR(50),
  q4_ipo_filing_timeline_weight INTEGER,
  
  -- Question 5: PAT/Net Profit
  q5_pat_net_profit VARCHAR(50),
  q5_pat_net_profit_weight INTEGER,
  
  -- SME IPO Questions (7 questions)
  -- Question 1: Type of Company (same as Mainboard)
  -- Question 2: Business Existence (same as Mainboard)
  -- Question 3: Debt-to-Equity Ratio
  q3_debt_equity_ratio VARCHAR(50),
  q3_debt_equity_ratio_weight INTEGER,
  
  -- Question 4: Net Worth
  q4_net_worth VARCHAR(50),
  q4_net_worth_weight INTEGER,
  
  -- Question 5: Operating Profit
  q5_operating_profit VARCHAR(50),
  q5_operating_profit_weight INTEGER,
  
  -- Question 6: Net Tangible Assets
  q6_net_tangible_assets VARCHAR(50),
  q6_net_tangible_assets_weight INTEGER,
  
  -- Question 7: IPO Filing Timeline (same as Mainboard Q4)
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_assessment_responses_type ON assessment_responses(assessment_type);
CREATE INDEX IF NOT EXISTS idx_assessment_responses_created_at ON assessment_responses(created_at);
CREATE INDEX IF NOT EXISTS idx_assessment_responses_email ON assessment_responses(user_email);
CREATE INDEX IF NOT EXISTS idx_assessment_responses_readiness_score ON assessment_responses(readiness_score);
CREATE INDEX IF NOT EXISTS idx_assessment_responses_total_score ON assessment_responses(total_score);

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

-- Sample data structure examples:

-- Mainboard IPO Response:
-- q1_type_of_company: "Public Limited"
-- q1_type_of_company_weight: 4
-- q2_business_existence: "More than 3 years"
-- q2_business_existence_weight: 4
-- q3_paid_up_capital: "Equal to or more than 10 Crore"
-- q3_paid_up_capital_weight: 3
-- q4_ipo_filing_timeline: "In one year"
-- q4_ipo_filing_timeline_weight: 3
-- q5_pat_net_profit: "More than 10 Cr"
-- q5_pat_net_profit_weight: 4

-- SME IPO Response:
-- q1_type_of_company: "Private Limited"
-- q1_type_of_company_weight: 4
-- q2_business_existence: "More than 3 years"
-- q2_business_existence_weight: 4
-- q3_debt_equity_ratio: "Less than or equal to 3:1"
-- q3_debt_equity_ratio_weight: 4
-- q4_net_worth: "1 to 5 Crore"
-- q4_net_worth_weight: 3
-- q5_operating_profit: "Yes"
-- q5_operating_profit_weight: 4
-- q6_net_tangible_assets: "More than 3 Crore"
-- q6_net_tangible_assets_weight: 3
-- q4_ipo_filing_timeline: "In one year"
-- q4_ipo_filing_timeline_weight: 3
