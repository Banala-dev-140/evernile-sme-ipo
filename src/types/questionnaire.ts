export interface Question {
  id: number;
  text: string;
  correctAnswer: boolean;
  tooltip?: string;
  tag?: string;
}

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownQuestion {
  id: number;
  text: string;
  options: DropdownOption[];
  correctAnswers: string[]; // Can have multiple correct answers
  tooltip?: string;
  tag?: string;
}

export interface QuestionnaireResponse {
  questionId: number;
  answer: boolean;
}

export interface AssessmentResult {
  isEligible: boolean;
  failedQuestions: Question[];
  responses: QuestionnaireResponse[];
}

export interface UserDetails {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
}