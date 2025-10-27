import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rpvbuwlizisklnhikajs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwdmJ1d2xpemlza2xuaGlrYWpzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODg2MjI2MiwiZXhwIjoyMDc0NDM4MjYyfQ.juQtJ7pvMdM4lNmWGYJeonrhvxSCk43WIsSMlSjiyC8'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database types
export interface AssessmentResponse {
  id?: string
  assessment_type: 'mainboard' | 'sme'
  user_name: string
  user_email: string
  user_phone?: string
  total_score: number
  readiness_score: number
  readiness_label: string
  
  // Mainboard IPO Questions (4 questions)
  q1_type_of_company?: string
  q1_type_of_company_weight?: number
  q2_business_existence?: string
  q2_business_existence_weight?: number
  q3_ipo_filing_timeline?: string
  q3_ipo_filing_timeline_weight?: number
  q4_pat_net_profit?: string
  q4_pat_net_profit_weight?: number
  
  // Legacy fields (kept for backward compatibility)
  q3_paid_up_capital?: string
  q3_paid_up_capital_weight?: number
  q4_ipo_filing_timeline?: string
  q4_ipo_filing_timeline_weight?: number
  q5_pat_net_profit?: string
  q5_pat_net_profit_weight?: number
  
  // SME IPO Questions (5 questions)
  q3_debt_equity_ratio?: string
  q3_debt_equity_ratio_weight?: number
  q3_pat_net_profit?: string
  q3_pat_net_profit_weight?: number
  q4_net_worth?: string
  q4_net_worth_weight?: number
  q4_total_assets?: string
  q4_total_assets_weight?: number
  q4_pat_net_profit?: string
  q4_pat_net_profit_weight?: number
  q5_operating_profit?: string
  q5_operating_profit_weight?: number
  q5_ipo_filing_timeline?: string
  q5_ipo_filing_timeline_weight?: number
  q6_net_tangible_assets?: string
  q6_net_tangible_assets_weight?: number
  
  created_at?: string
  updated_at?: string
}

export interface QuestionResponse {
  question_id: number
  question_text: string
  selected_option: string
  option_weight: number
}

// Database functions
export const saveAssessmentResponse = async (response: Omit<AssessmentResponse, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from('assessment_responses')
      .insert([response])
      .select()
      .single()

    if (error) {
      console.error('Error saving assessment response:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Failed to save assessment response:', error)
    throw error
  }
}

export const getAssessmentResponses = async (assessmentType?: 'mainboard' | 'sme') => {
  try {
    let query = supabase
      .from('assessment_responses')
      .select('*')
      .order('created_at', { ascending: false })

    if (assessmentType) {
      query = query.eq('assessment_type', assessmentType)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching assessment responses:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Failed to fetch assessment responses:', error)
    throw error
  }
}
