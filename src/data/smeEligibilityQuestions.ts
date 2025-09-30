import { DropdownQuestion } from '@/types/questionnaire';

export const SME_ELIGIBILITY_QUESTIONS: DropdownQuestion[] = [
  {
    id: 1,
    text: "Legal Incorporation",
    options: [
      { value: "private", label: "Private Limited Company" },
      { value: "public", label: "Public Limited Company" },
      { value: "partnership", label: "Partnership Firm" },
      { value: "proprietorship", label: "Proprietorship" }
    ],
    correctAnswers: ["private", "public"]
  },
  {
    id: 2,
    text: "Business Track Record (Business in existence)",
    options: [
      { value: "less-3", label: "Less than 3 years" },
      { value: "more-3", label: "More than 3 years" }
    ],
    correctAnswers: ["more-3"]
  },
  {
    id: 3,
    text: "Business Net Worth (at the end of last FY)",
    options: [
      { value: "negative", label: "Negative" },
      { value: "positive", label: "Positive" }
    ],
    correctAnswers: ["positive"]
  },
  {
    id: 4,
    text: "Operating Profit",
    options: [
      { value: "no-profit", label: "No profit" },
      { value: "less-1cr", label: "Less than ₹1 crore (in 2 of last 3 years)" },
      { value: "atleast-1cr", label: "At least ₹1 crore (in 2 of last 3 years)" }
    ],
    correctAnswers: ["atleast-1cr"],
    tag: "Operating Profit",
    tooltip: "Operating Profit = Revenue from Operations - Operating Expenses (excluding interest, tax, depreciation, and amortization)"
  },
  {
    id: 5,
    text: "Net Tangible Assets",
    options: [
      { value: "less-3cr", label: "Less than ₹3 crore" },
      { value: "atleast-3cr", label: "₹3 crore or more" }
    ],
    correctAnswers: ["atleast-3cr"]
  },
  {
    id: 6,
    text: "Debt to Equity Ratio",
    options: [
      { value: "less-3-1", label: "Less than 3:1" },
      { value: "more-3-1", label: "More than 3:1" }
    ],
    correctAnswers: ["less-3-1"]
  }
];
