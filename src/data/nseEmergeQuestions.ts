import { Question } from '@/types/questionnaire';

export const NSE_EMERGE_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Is the Organisation a Private / Public Limited Company incorporated under Companies Act 1956/2013?",
    correctAnswer: true,
  },
  {
    id: 2,
    text: "Is the Business in existence for more than 3 years?",
    correctAnswer: true,
    tooltip: "Existence includes the applicant entity or its promoting companies, or conversion from partnership/proprietorship, with a note that promoters should have 3+ years' domain experience and minimum 20% post-issue shareholding.",
  },
  {
    id: 3,
    text: "Is the Net Worth of the business positive?",
    correctAnswer: true,
  },
  {
    id: 4,
    text: "Is the Operating Profit at least ₹1 Cr. for any 2 out of 3 last financial years?",
    correctAnswer: true,
  },
  {
    id: 5,
    text: "Is the Free Cash Flow to Equity (FCFE) of the company positive for at least 2 out of last 3 FY?",
    correctAnswer: true,
    tag: "Additional criteria on NSE Emerge",
    tooltip: "Need Help with FCFE calculation",
  },
  {
    id: 6,
    text: "Are there any pending defaults in payment of interest or principal to bondholders, debenture holders, or fixed deposit holders?",
    correctAnswer: false,
  },
  {
    id: 7,
    text: "Are there any material regulatory/disciplinary actions by a stock exchange or regulatory authority in the past 3 years?",
    correctAnswer: false,
  },
  {
    id: 8,
    text: "Has the company been referred to the BIFR (Board for Industrial and Financial Reconstruction) or have any insolvency/bankruptcy proceedings been admitted against the company or the promoters?",
    correctAnswer: false,
  },
  {
    id: 9,
    text: "Has the Company's application been returned by the exchange/SEBI in the last 6 complete months?",
    correctAnswer: false,
  },
];