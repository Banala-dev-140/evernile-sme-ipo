# Supabase Integration Setup Guide

This guide will help you set up Supabase integration for storing assessment responses.

## Prerequisites

- Supabase project created
- Project URL and Service Secret Key (already provided)

## Database Setup

### 1. Create the Database Table

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `database-schema.sql` into the SQL editor
4. Click "Run" to execute the SQL

This will create:
- `assessment_responses` table with all necessary columns
- Indexes for better performance
- Row Level Security (RLS) policies
- Automatic timestamp updates

### 2. Verify Table Creation

1. Go to the Table Editor in your Supabase dashboard
2. You should see the `assessment_responses` table
3. The table should have the following columns:
   - `id` (UUID, Primary Key)
   - `assessment_type` (VARCHAR)
   - `user_name` (VARCHAR)
   - `user_email` (VARCHAR)
   - `user_phone` (VARCHAR, optional)
   - `total_score` (INTEGER)
   - `readiness_score` (DECIMAL)
   - `readiness_label` (VARCHAR)
   - `responses` (JSONB)
   - `created_at` (TIMESTAMP)
   - `updated_at` (TIMESTAMP)

## Application Configuration

### 1. Environment Variables (Optional)

You can create a `.env` file in the project root to store your Supabase credentials:

```env
VITE_SUPABASE_URL=https://rpvbuwlizisklnhikajs.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

However, the current implementation uses the service key directly in the code for simplicity.

### 2. Supabase Client Configuration

The Supabase client is configured in `src/lib/supabase.ts` with:
- **Project URL**: `https://rpvbuwlizisklnhikajs.supabase.co`
- **Service Secret Key**: Already configured

## Features Implemented

### 1. Data Storage
- **Mainboard IPO Assessment**: Stores all responses when user generates report
- **SME IPO Assessment**: Stores all responses when user generates report
- **User Information**: Name, email, phone (optional)
- **Assessment Results**: Total score, readiness score, readiness label
- **Question Responses**: Detailed JSON array of all question-answer pairs

### 2. Admin Dashboard
- **Access**: Navigate to `/admin` or click "Admin" button on main dashboard
- **Features**:
  - View all assessment responses
  - Filter by assessment type (All, Mainboard, SME)
  - Export data to CSV
  - Statistics overview
  - Real-time data display

### 3. Data Structure

Each assessment response includes:
```json
{
  "id": "uuid",
  "assessment_type": "mainboard" | "sme",
  "user_name": "John Doe",
  "user_email": "john@example.com",
  "user_phone": "+1234567890",
  "total_score": 18,
  "readiness_score": 4.5,
  "readiness_label": "High Readiness",
  "responses": [
    {
      "question_id": 1,
      "question_text": "Type of Company",
      "selected_option": "Public Limited",
      "option_weight": 4
    }
  ],
  "created_at": "2025-01-27T10:30:00Z",
  "updated_at": "2025-01-27T10:30:00Z"
}
```

## Usage

### 1. Taking Assessments
1. Users complete either Mainboard or SME IPO assessment
2. Fill in their contact details
3. Click "Generate Report" - data is automatically saved to Supabase
4. View the generated report

### 2. Admin Dashboard
1. Click "Admin" button on main dashboard
2. View all responses in a table format
3. Filter by assessment type
4. Export data to CSV for analysis
5. View statistics and readiness distribution

## Security Considerations

### Current Setup
- Uses service role key for full database access
- RLS is enabled but allows all operations
- No authentication required for admin dashboard

### Recommended Improvements
1. **Authentication**: Add user authentication for admin access
2. **API Keys**: Use environment variables for sensitive keys
3. **RLS Policies**: Implement proper row-level security policies
4. **Rate Limiting**: Add rate limiting for API calls

## Troubleshooting

### Common Issues

1. **Connection Error**
   - Verify Supabase URL and key are correct
   - Check if Supabase project is active
   - Ensure database table exists

2. **Permission Denied**
   - Check RLS policies
   - Verify service role key has correct permissions

3. **Data Not Saving**
   - Check browser console for errors
   - Verify all required fields are filled
   - Check network connectivity

### Debug Steps

1. Open browser developer tools
2. Check console for error messages
3. Verify Supabase connection in Network tab
4. Check database logs in Supabase dashboard

## API Functions

### Available Functions

1. **`saveAssessmentResponse(response)`**
   - Saves a complete assessment response
   - Returns the saved record with ID

2. **`getAssessmentResponses(type?)`**
   - Fetches all assessment responses
   - Optional filter by assessment type
   - Returns array of responses

### Example Usage

```typescript
import { saveAssessmentResponse, getAssessmentResponses } from '@/lib/supabase';

// Save assessment
const response = await saveAssessmentResponse({
  assessment_type: 'mainboard',
  user_name: 'John Doe',
  user_email: 'john@example.com',
  total_score: 18,
  readiness_score: 4.5,
  readiness_label: 'High Readiness',
  responses: [...]
});

// Get all responses
const allResponses = await getAssessmentResponses();

// Get only SME responses
const smeResponses = await getAssessmentResponses('sme');
```

## Next Steps

1. **Set up the database** using the provided SQL schema
2. **Test the integration** by taking a sample assessment
3. **Access admin dashboard** to verify data storage
4. **Customize** the admin dashboard as needed
5. **Add authentication** for production use

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify Supabase project status
3. Ensure all dependencies are installed
4. Check the database table structure matches the schema
