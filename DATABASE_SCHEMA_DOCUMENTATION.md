# Database Schema Documentation - Separate Columns Approach

## Overview

This document describes the updated database schema that uses separate columns for each questionnaire response instead of JSON storage. This approach provides better query performance, easier data analysis, and more structured data access.

## Table Structure: `assessment_responses`

### Core Fields
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key, auto-generated |
| `assessment_type` | VARCHAR(20) | Either 'mainboard' or 'sme' |
| `user_name` | VARCHAR(255) | User's full name |
| `user_email` | VARCHAR(255) | User's email address |
| `user_phone` | VARCHAR(20) | User's phone number (optional) |
| `total_score` | INTEGER | Sum of all question weights |
| `readiness_score` | DECIMAL(3,1) | Calculated readiness score (2.5-4.5) |
| `readiness_label` | VARCHAR(50) | Readiness category label |
| `created_at` | TIMESTAMP | Record creation timestamp |
| `updated_at` | TIMESTAMP | Record last update timestamp |

### Mainboard IPO Questions (5 questions)

#### Question 1: Type of Company
- `q1_type_of_company` (VARCHAR(50)): Selected option
- `q1_type_of_company_weight` (INTEGER): Weight value
- **Options**: "Public Limited" (4), "Private Limited" (4), "Partnership Firm" (2)

#### Question 2: Business Existence
- `q2_business_existence` (VARCHAR(50)): Selected option
- `q2_business_existence_weight` (INTEGER): Weight value
- **Options**: "Under 2 years" (2), "Under 3 years" (3), "More than 3 years" (4)

#### Question 3: Paid up Capital
- `q3_paid_up_capital` (VARCHAR(50)): Selected option
- `q3_paid_up_capital_weight` (INTEGER): Weight value
- **Options**: "Less than 10 Cr" (1), "Equal to or more than 10 Crore" (3), "Don't Know" (1)

#### Question 4: IPO Filing Timeline
- `q4_ipo_filing_timeline` (VARCHAR(50)): Selected option
- `q4_ipo_filing_timeline_weight` (INTEGER): Weight value
- **Options**: "In one year" (3), "In two years" (2), "Not Sure" (1)

#### Question 5: PAT/Net Profit
- `q5_pat_net_profit` (VARCHAR(50)): Selected option
- `q5_pat_net_profit_weight` (INTEGER): Weight value
- **Options**: "Less than 10 Cr" (3), "More than 10 Cr" (4), "Don't Know" (1)

### SME IPO Questions (7 questions)

#### Question 1: Type of Company (Same as Mainboard Q1)
- Uses `q1_type_of_company` and `q1_type_of_company_weight`

#### Question 2: Business Existence (Same as Mainboard Q2)
- Uses `q2_business_existence` and `q2_business_existence_weight`

#### Question 3: Debt-to-Equity Ratio
- `q3_debt_equity_ratio` (VARCHAR(50)): Selected option
- `q3_debt_equity_ratio_weight` (INTEGER): Weight value
- **Options**: "Less than or equal to 3:1" (4), "More than 3:1" (2), "Don't Know" (2)

#### Question 4: Net Worth
- `q4_net_worth` (VARCHAR(50)): Selected option
- `q4_net_worth_weight` (INTEGER): Weight value
- **Options**: "Not Yet Positive" (1), "Less than 1 Crore" (2), "1 to 5 Crore" (3), "More than 5 Crore" (4)

#### Question 5: Operating Profit
- `q5_operating_profit` (VARCHAR(50)): Selected option
- `q5_operating_profit_weight` (INTEGER): Weight value
- **Options**: "Yes" (4), "No" (2), "Don't Know" (2)

#### Question 6: Net Tangible Assets
- `q6_net_tangible_assets` (VARCHAR(50)): Selected option
- `q6_net_tangible_assets_weight` (INTEGER): Weight value
- **Options**: "More than 3 Crore" (3), "Less than 3 Crore" (2), "Don't Know" (1)

#### Question 7: IPO Filing Timeline (Same as Mainboard Q4)
- Uses `q4_ipo_filing_timeline` and `q4_ipo_filing_timeline_weight`

## Database Indexes

```sql
-- Performance indexes
CREATE INDEX idx_assessment_responses_type ON assessment_responses(assessment_type);
CREATE INDEX idx_assessment_responses_created_at ON assessment_responses(created_at);
CREATE INDEX idx_assessment_responses_email ON assessment_responses(user_email);
CREATE INDEX idx_assessment_responses_readiness_score ON assessment_responses(readiness_score);
CREATE INDEX idx_assessment_responses_total_score ON assessment_responses(total_score);
```

## Sample Data Examples

### Mainboard IPO Response
```sql
INSERT INTO assessment_responses (
  assessment_type, user_name, user_email, total_score, readiness_score, readiness_label,
  q1_type_of_company, q1_type_of_company_weight,
  q2_business_existence, q2_business_existence_weight,
  q3_paid_up_capital, q3_paid_up_capital_weight,
  q4_ipo_filing_timeline, q4_ipo_filing_timeline_weight,
  q5_pat_net_profit, q5_pat_net_profit_weight
) VALUES (
  'mainboard', 'John Doe', 'john@example.com', 18, 4.5, 'High Readiness',
  'Public Limited', 4,
  'More than 3 years', 4,
  'Equal to or more than 10 Crore', 3,
  'In one year', 3,
  'More than 10 Cr', 4
);
```

### SME IPO Response
```sql
INSERT INTO assessment_responses (
  assessment_type, user_name, user_email, total_score, readiness_score, readiness_label,
  q1_type_of_company, q1_type_of_company_weight,
  q2_business_existence, q2_business_existence_weight,
  q3_debt_equity_ratio, q3_debt_equity_ratio_weight,
  q4_net_worth, q4_net_worth_weight,
  q5_operating_profit, q5_operating_profit_weight,
  q6_net_tangible_assets, q6_net_tangible_assets_weight,
  q4_ipo_filing_timeline, q4_ipo_filing_timeline_weight
) VALUES (
  'sme', 'Jane Smith', 'jane@example.com', 24, 4.5, 'High Readiness',
  'Private Limited', 4,
  'More than 3 years', 4,
  'Less than or equal to 3:1', 4,
  '1 to 5 Crore', 3,
  'Yes', 4,
  'More than 3 Crore', 3,
  'In one year', 3
);
```

## Query Examples

### Get all high readiness responses
```sql
SELECT * FROM assessment_responses 
WHERE readiness_label = 'High Readiness';
```

### Get Mainboard responses with specific company type
```sql
SELECT user_name, user_email, readiness_score 
FROM assessment_responses 
WHERE assessment_type = 'mainboard' 
AND q1_type_of_company = 'Public Limited';
```

### Get SME responses with high net worth
```sql
SELECT user_name, user_email, q4_net_worth, readiness_score
FROM assessment_responses 
WHERE assessment_type = 'sme' 
AND q4_net_worth IN ('1 to 5 Crore', 'More than 5 Crore');
```

### Calculate average readiness score by assessment type
```sql
SELECT 
  assessment_type,
  COUNT(*) as total_responses,
  AVG(readiness_score) as avg_readiness_score,
  AVG(total_score) as avg_total_score
FROM assessment_responses 
GROUP BY assessment_type;
```

### Get responses by readiness distribution
```sql
SELECT 
  readiness_label,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) as percentage
FROM assessment_responses 
GROUP BY readiness_label
ORDER BY count DESC;
```

## Advantages of Separate Columns Approach

1. **Better Query Performance**: Direct column access is faster than JSON parsing
2. **Easier Data Analysis**: Simple SQL queries for analytics
3. **Type Safety**: Each column has a specific data type
4. **Indexing**: Can create indexes on specific question responses
5. **Reporting**: Easier to create reports and dashboards
6. **Data Validation**: Database-level constraints on individual fields
7. **Migration**: Easier to migrate or transform data

## Migration from JSON Schema

If you have existing data in JSON format, you can migrate it using:

```sql
-- Example migration query (adjust based on your existing JSON structure)
UPDATE assessment_responses 
SET 
  q1_type_of_company = (responses->0->>'selected_option'),
  q1_type_of_company_weight = (responses->0->>'option_weight')::integer
WHERE responses IS NOT NULL;
```

## CSV Export Structure

The admin dashboard exports data with the following columns:
- Basic info: Assessment Type, Name, Email, Phone, Scores, Labels, Timestamps
- Mainboard questions: Q1-Q5 with both selected options and weights
- SME questions: Q3-Q6 with both selected options and weights
- Common questions: Q1, Q2, Q7 (IPO timeline) are shared between both types

This structure makes it easy to analyze patterns, create pivot tables, and perform statistical analysis on the assessment data.
