import { useMemo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info, ArrowLeft } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { saveAssessmentResponse, type AssessmentResponse, type QuestionResponse } from "@/lib/supabase";
import { sendAssessmentReport, type EmailData } from "@/lib/emailService";

type Option = { text: string; weight: number };
type Q = { id: number; question: string; options: Option[] };

const QUESTIONS: Q[] = [
  {
    id: 1,
    question: "Type of Company",
    options: [
      { text: "Public Limited", weight: 4 },
      { text: "Private Limited", weight: 4 },
      { text: "Partnership Firm", weight: 2 },
      { text: "Proprietorship", weight: 2 },
    ],
  },
  {
    id: 2,
    question: "The Business has been in existence for",
    options: [
      { text: "0 to 2 years", weight: 2 },
      { text: "2 to 3 years", weight: 3 },
      { text: "3 to 10 years", weight: 4 },
      { text: "More than 10 years", weight: 4 },
    ],
  },
  {
    id: 3,
    question: "What is the Debt-to-Equity (D/E) Ratio of the company",
    options: [
      { text: "Less than or equal to 3:1", weight: 4 },
      { text: "More than 3:1", weight: 2 },
      { text: "Don't know", weight: 2 },
    ],
  },
  {
    id: 4,
    question: "Net Worth of the company in the preceding financial year",
    options: [
      { text: "Not Yet Positive", weight: 1 },
      { text: "Less than 1 Crore", weight: 2 },
      { text: "1 to 5 Crore", weight: 3 },
      { text: "More than 5 Crore", weight: 4 },
      { text: "Don't know", weight: 1 },
    ],
  },
  {
    id: 5,
    question: "Is operating profit positive for last 2 out of 3 financial years",
    options: [
      { text: "Yes", weight: 4 },
      { text: "No", weight: 2 },
      { text: "Don't Know", weight: 2 },
    ],
  },
  {
    id: 6,
    question: "Net Tangible Assets of the company",
    options: [
      { text: "More than 3 Crore", weight: 3 },
      { text: "Less than 3 Crore", weight: 2 },
      { text: "Don't Know", weight: 1 },
    ],
  },
  {
    id: 7,
    question: "Estimated time to file the IPO",
    options: [
      { text: "In one year", weight: 3 },
      { text: "In two years", weight: 2 },
      { text: "Not sure", weight: 1 },
    ],
  },
];

type Answer = { questionId: number; selected: string; weight: number };

function mapScore(total: number): { readiness: number; label: string } {
  if (total >= 23) return { readiness: 4.5, label: "High Readiness" };
  if (total >= 20) return { readiness: 4.0, label: "Good Readiness" };
  if (total >= 17) return { readiness: 3.5, label: "Moderate Readiness" };
  if (total >= 14) return { readiness: 3.0, label: "Basic Readiness" };
  return { readiness: 2.5, label: "Low Readiness" };
}

function closingMessage(score: number): string {
  if (score === 4.5) {
    return "Based on the data provided in the assessment, your company has a high IPO readiness. To understand how to proceed ahead with the SME IPO, please book a Readiness call with our IPO experts.";
  } else if (score === 4.0) {
    return "Based on the data provided in the assessment, your company has a good IPO readiness. To understand how to proceed ahead with the SME IPO, please book a Readiness call with our IPO experts.";
  } else if (score === 3.5) {
    return "Based on the data provided in the assessment, your company shows moderate IPO readiness. To explore the next steps and improve readiness, please book a Readiness call with our IPO experts.";
  } else if (score === 3.0) {
    return "Based on the data provided in the assessment, your company has basic IPO readiness. We recommend booking a Readiness call with our IPO experts to assist in progressing further.";
  }
  return "Based on the data provided in the assessment, your company needs to enhance its IPO readiness. To understand how to strengthen your position, please book a Readiness call with our IPO experts.";
}

function generateDynamicPoints(answers: Answer[]): string[] {
  const points: string[] = [];
  const byId = new Map<number, Answer>(answers.map(a => [a.questionId, a]));

  const q2 = byId.get(2);
  if (q2) {
    if (q2.selected === "3 to 10 years" || q2.selected === "More than 10 years") {
      points.push("Your company meets the SME IPO minimum operational history requirement of 3 years.");
    } else {
      points.push("Building a consistent operational history of at least 3 years is essential to qualify for SME IPO listing.");
    }
  }

  const q3 = byId.get(3);
  if (q3) {
    if (q3.selected === "Less than or equal to 3:1") {
      points.push("Your company's leverage is within the optimal range, meeting regulatory financial strength standards.");
    } else if (q3.selected === "More than 3:1") {
      points.push("Optimizing your debt-to-equity ratio will enhance financial stability and improve SME IPO eligibility.");
    } else if (q3.selected === "Don't know") {
      points.push("Debt to Equity Ratio is an important metric for SME IPO eligibility - book a call with IPO expert team to find your Debt to Equity Ratio");
    }
  }

  const q4 = byId.get(4);
  if (q4) {
    if (q4.selected === "1 to 5 Crore" || q4.selected === "More than 5 Crore") {
      points.push("Your net worth satisfies the minimum requirement for SME IPO listing eligibility.");
    } else if (q4.selected === "Not Yet Positive" || q4.selected === "Less than 1 Crore") {
      points.push("Enhancing your net worth to meet or exceed ₹1 Crore will improve your SME IPO readiness.");
    } else if (q4.selected === "Don't know") {
      points.push("Net worth is an important metric for SME IPO eligibility - book a call with IPO expert team to find your company's Net worth");
    }
  }

  const q5 = byId.get(5);
  if (q5) {
    if (q5.selected === "Yes") {
      points.push("Your profitability track record supports the operational viability required for SME IPO.");
    } else if (q5.selected === "No") {
      points.push("Strengthening profitability for consecutive years is important to align with SME IPO standards.");
    } else if (q5.selected === "Don't Know") {
      points.push("Operating Profit is an important metric for SME IPO eligibility - book a call with IPO expert team to find your company's Operating Profit");
    }
  }

  const q6 = byId.get(6);
  if (q6) {
    if (q6.selected === "More than 3 Crore") {
      points.push("Your net tangible assets meet SME IPO listing requirements.");
    } else if (q6.selected === "Less than 3 Crore") {
      points.push("Increasing net tangible assets will help meet the SME IPO eligibility threshold.");
    } else if (q6.selected === "Don't Know") {
      points.push("Net Tangible Assets is an important metric for SME IPO eligibility - book a call with IPO expert team to find your company's Net Tangible Assets");
    }
  }

  return points;
}

const OptionBox = ({ selected, onClick, text, letter }: { selected: boolean; onClick: () => void; text: string; letter: string }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full rounded-md border px-4 py-3 text-left transition flex items-center gap-3 ${
      selected ? "border-evernile-navy bg-evernile-navy/10" : "border-gray-300 hover:border-evernile-navy/60"
    }`}
  >
    <span className="font-medium text-evernile-navy">{letter}.</span>
    <span>{text}</span>
  </button>
);

const SMEEligibility = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(0); // 0..QUESTIONS.length then contact
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [showReport, setShowReport] = useState<boolean>(false);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState<boolean>(false);
  const [infoModalOpen, setInfoModalOpen] = useState<boolean>(false);
  const [infoContent, setInfoContent] = useState<{ title: string; description: string; formula: string } | null>(null);

  const allAnswered = useMemo(() => Object.keys(answers).length === QUESTIONS.length, [answers]);
  const current = QUESTIONS[step];
  const canNext = !!(current && answers[current.id]);

  const answerList: Answer[] = useMemo(() => Object.values(answers).sort((a, b) => a.questionId - b.questionId), [answers]);
  const totalWeight = useMemo(() => answerList.reduce((t, a) => t + a.weight, 0), [answerList]);
  const scoreMeta = useMemo(() => mapScore(totalWeight), [totalWeight]);
  const dynamicPoints = useMemo(() => generateDynamicPoints(answerList), [answerList]);

  const onSelect = (q: Q, opt: Option) => {
    setAnswers(prev => ({ ...prev, [q.id]: { questionId: q.id, selected: opt.text, weight: opt.weight } }));
  };

  const onNext = () => {
    if (current && !canNext) return;
    if (step < QUESTIONS.length - 1) setStep(step + 1);
    else setStep(QUESTIONS.length); // contact step
  };

  const openInfoModal = (title: string, description: string, formula: string) => {
    setInfoContent({ title, description, formula });
    setInfoModalOpen(true);
  };

  const onPrevious = () => {
    if (step > 0) setStep(step - 1);
  };

  const canCreateReport = allAnswered && name.trim() !== "" && (email.trim() !== "" || phone.trim() !== "");

  const saveAssessmentData = async () => {
    try {
      // Map answers to individual columns
      const q1 = answers[1]; // Type of Company
      const q2 = answers[2]; // Business Existence
      const q3 = answers[3]; // Debt-to-Equity Ratio
      const q4 = answers[4]; // Net Worth
      const q5 = answers[5]; // Operating Profit
      const q6 = answers[6]; // Net Tangible Assets
      const q7 = answers[7]; // IPO Filing Timeline

      const assessmentData: Omit<AssessmentResponse, 'id' | 'created_at' | 'updated_at'> = {
        assessment_type: 'sme',
        user_name: name.trim(),
        user_email: email.trim(),
        user_phone: phone.trim() || undefined,
        total_score: totalWeight,
        readiness_score: scoreMeta.readiness,
        readiness_label: scoreMeta.label,
        
        // Common questions (Q1, Q2, Q7)
        q1_type_of_company: q1?.selected,
        q1_type_of_company_weight: q1?.weight,
        q2_business_existence: q2?.selected,
        q2_business_existence_weight: q2?.weight,
        q4_ipo_filing_timeline: q7?.selected,
        q4_ipo_filing_timeline_weight: q7?.weight,
        
        // SME-specific questions
        q3_debt_equity_ratio: q3?.selected,
        q3_debt_equity_ratio_weight: q3?.weight,
        q4_net_worth: q4?.selected,
        q4_net_worth_weight: q4?.weight,
        q5_operating_profit: q5?.selected,
        q5_operating_profit_weight: q5?.weight,
        q6_net_tangible_assets: q6?.selected,
        q6_net_tangible_assets_weight: q6?.weight
      };

      await saveAssessmentResponse(assessmentData);
      console.log('Assessment data saved successfully');
    } catch (error) {
      console.error('Failed to save assessment data:', error);
      // You might want to show a toast notification here
    }
  };

  const sendEmailReport = async () => {
    setIsGeneratingReport(true);
    try {
      // Debug: Log the data being sent
      console.log('📧 SME Email Data being sent:');
      console.log('  - answerList:', answerList);
      console.log('  - dynamicPoints:', dynamicPoints);
      console.log('  - scoreMeta:', scoreMeta);
      console.log('  - totalWeight:', totalWeight);

      const emailData: EmailData = {
        to: email.trim(),
        userName: name.trim(),
        assessmentType: 'sme',
        readinessScore: scoreMeta.readiness,
        readinessLabel: scoreMeta.label,
        totalWeight: totalWeight,
        dynamicPoints: dynamicPoints,
        closingMessage: closingMessage(scoreMeta.readiness)
      };

      console.log('📧 Final email data:', emailData);

      const success = await sendAssessmentReport(emailData);
      if (success) {
        setIsEmailSent(true);
        setShowReport(true);
      }
    } catch (error) {
      console.error('Failed to send email report:', error);
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const progressPct = useMemo(() => {
    const completed = Math.min(step, QUESTIONS.length);
    return Math.round((completed / QUESTIONS.length) * 100);
  }, [step]);

  const AnimatedGauge = ({ score }: { score: number }) => {
    const [animatedScore, setAnimatedScore] = useState(0);
    
    useEffect(() => {
      const timer = setTimeout(() => {
        setAnimatedScore(score);
      }, 100);
      return () => clearTimeout(timer);
    }, [score]);

    const pct = (animatedScore / 5) * 100;
    const color = "#0a2a5e"; // evernile navy approx
    
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-full max-w-2xl">
          <svg viewBox="0 0 100 50" className="w-full">
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0a2a5e" />
                <stop offset="100%" stopColor="#0a2a5e" />
              </linearGradient>
            </defs>
            <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="#e5e7eb" strokeWidth="10" strokeLinecap="round" />
            <path 
              d="M10,50 A40,40 0 0,1 90,50" 
              fill="none" 
              stroke="url(#g)" 
              strokeWidth="10" 
              strokeLinecap="round" 
              strokeDasharray={`${pct} 100`}
              style={{
                transition: 'stroke-dasharray 2s ease-in-out'
              }}
            />
          </svg>
        </div>
        <div className="text-2xl font-bold text-evernile-navy">
          {animatedScore.toFixed(1)} out of 5
        </div>
        <div className="text-sm text-muted-foreground text-center">
          The IPO readiness score is generated based on the data provided.
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with back button, logo, and title */}
        <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-4">
              <Button variant="ghost" onClick={() => navigate('/')} className="text-evernile-navy hover:text-evernile-navy/80 h-8 sm:h-10 px-2 sm:px-4 text-xs sm:text-sm">
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Back</span>
              </Button>
                <div className="h-4 sm:h-6 border-l border-gray-300" />
                <div className="flex flex-col items-center">
                  <div className="text-lg sm:text-xl font-bold text-evernile-navy">EVERNILE</div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="h-0.5 w-4 sm:w-6 bg-evernile-red"></div>
                    <div className="text-xs text-evernile-navy">CAPITAL</div>
                    <div className="h-0.5 w-4 sm:w-6 bg-evernile-red"></div>
                  </div>
                </div>
              </div>
              <div className="text-sm sm:text-lg font-semibold text-evernile-navy text-right">
                <span className="hidden sm:inline">SME IPO Readiness Assessment</span>
                <span className="sm:hidden">SME IPO</span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      {!showReport && (
        <div className="border-b border-gray-200 bg-white">
          <div className="container mx-auto px-4 py-2">
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-evernile-red transition-all"
                style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>
      )}

      <main className="container mx-auto px-4 py-6 sm:py-10">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-lg sm:text-2xl">{showReport ? "SME IPO Readiness Assessment Report" : ""}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
              {!showReport && step < QUESTIONS.length && current && (
                <div className="space-y-6">
                  <div className="flex justify-between items-start sm:items-center">
                    <div className="text-lg sm:text-xl font-bold text-left flex items-start sm:items-center gap-2 flex-1">
                      <span className="flex-1">{current.question}</span>
                    {current.id === 3 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0 flex-shrink-0"
                        onClick={() => openInfoModal(
                          "Debt-to-Equity (D/E) Ratio",
                          "The Debt-to-Equity (D/E) Ratio is a financial metric that measures a company's financial leverage by comparing its total debt to its shareholder equity.",
                          "Debt-to-Equity Ratio = Total Debt / Shareholders' Equity"
                        )}
                      >
                        <Info className="h-4 w-4 text-evernile-navy/70" />
                      </Button>
                    )}
                    {current.id === 4 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0 flex-shrink-0"
                        onClick={() => openInfoModal(
                          "Net Worth",
                          "Net worth is the value of a company's assets minus its liabilities.",
                          "Net Worth = Total Assets − Total Liabilities"
                        )}
                      >
                        <Info className="h-4 w-4 text-evernile-navy/70" />
                      </Button>
                    )}
                    {current.id === 5 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0 flex-shrink-0"
                        onClick={() => openInfoModal(
                          "Operating Profit",
                          "Operating profit is the profit earned from a company's core business operations after deducting operating expenses but before interest and taxes.",
                          "Operating Profit = Gross Profit − Operating Expenses − Depreciation − Amortization"
                        )}
                      >
                        <Info className="h-4 w-4 text-evernile-navy/70" />
                                    </Button>
                    )}
                    {current.id === 6 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0 flex-shrink-0"
                        onClick={() => openInfoModal(
                          "Net Tangible Assets (NTA)",
                          "Net Tangible Assets (NTA) represent the value of a company's physical assets after subtracting liabilities and intangible assets.",
                          "Net Tangible Assets = Total Assets − Intangible Assets − Total Liabilities"
                        )}
                      >
                        <Info className="h-4 w-4 text-evernile-navy/70" />
                      </Button>
                              )}
                            </div>
                    <div className="text-sm text-gray-500 font-medium">
                      {step + 1}/{QUESTIONS.length}
                    </div>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    {current.options.map((o, index) => (
                      <OptionBox
                        key={o.text}
                        text={o.text}
                        letter={String.fromCharCode(97 + index)}
                        selected={answers[current.id]?.selected === o.text}
                        onClick={() => onSelect(current, o)}
                      />
                    ))}
                              </div>
                  <div className="flex justify-between pt-2 gap-2">
                    {step > 0 ? (
                      <Button onClick={onPrevious} variant="outline" className="border-evernile-navy text-evernile-navy hover:bg-evernile-navy hover:text-white h-10 sm:h-11 text-sm sm:text-base flex-1 sm:flex-none">
                        Previous
                      </Button>
                    ) : (
                      <div></div>
                    )}
                    <Button onClick={onNext} disabled={!canNext} className="bg-evernile-navy text-white h-10 sm:h-11 text-sm sm:text-base flex-1 sm:flex-none">
                      Next
                    </Button>
                            </div>
                          </div>
              )}

              {!showReport && step === QUESTIONS.length && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="text-base sm:text-lg font-semibold text-evernile-navy px-2">Almost there! Please fill out few details and generate your IPO Readiness Assessment Report.</div>
                  <div className="text-base sm:text-lg font-medium">Your Details</div>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid gap-1">
                      <Label htmlFor="name" className="text-sm sm:text-base">Name<span className="text-red-500">*</span></Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="h-10 sm:h-11 text-sm sm:text-base" />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="email" className="text-sm sm:text-base">Email ID<span className="text-red-500">*</span></Label>
                      <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="h-10 sm:h-11 text-sm sm:text-base" />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="phone" className="text-sm sm:text-base">Mobile No.</Label>
                      <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="XXXXXXXXXX" className="h-10 sm:h-11 text-sm sm:text-base" />
                    </div>
            </div>

                  <div className="flex justify-center">
              <Button 
                      disabled={!canCreateReport || isGeneratingReport}
                      onClick={async () => {
                        await saveAssessmentData();
                        await sendEmailReport();
                      }}
                      className="bg-evernile-red text-evernile-red-foreground h-12 sm:h-14 w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8"
                    >
                      {isGeneratingReport ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-sm sm:text-base">Generating Report...</span>
                        </div>
                      ) : (
                        <>
                          <span className="hidden sm:inline">Generate & Email SME IPO Readiness Assessment Report</span>
                          <span className="sm:hidden">Generate SME IPO Report</span>
                        </>
                      )}
              </Button>
            </div>
          </div>
              )}

              {showReport && (
                <div className="space-y-6 text-center">
                  <div className="space-y-4">
                    <div className="text-6xl">📧</div>
                    <h2 className="text-2xl font-bold text-evernile-navy">Report Sent Successfully!</h2>
                    <p className="text-lg text-gray-600">
                      Your SME IPO Readiness Assessment report has been sent to <strong>{email}</strong>
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-green-800">
                        <strong>Readiness Score:</strong> {scoreMeta.readiness} out of 5<br/>
                        <strong>Readiness Level:</strong> {scoreMeta.label}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">
                      Please check your email inbox (and spam folder) for the detailed report.
                    </p>
                  </div>
                  
                  {/* Book Readiness Call and Contact Details side by side */}
                  <div className="flex flex-col md:flex-row gap-4 mt-6">
                    <div className="flex-1 p-3 sm:p-4 bg-evernile-red rounded-lg flex items-center justify-center">
                      <a href="https://calendly.com/bdinesh-evernile/30min" target="_blank" rel="noreferrer noopener">
                        <Button className="bg-transparent hover:bg-transparent text-white border-0 h-auto py-2 px-4 text-sm sm:text-base font-medium">Book a call with our IPO Expert</Button>
                      </a>
                    </div>
                    <div className="flex-1 p-3 sm:p-4 bg-gray-50 rounded-lg">
                      <div className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Contact Details:</div>
                      <div className="text-xs sm:text-sm text-gray-600">Email: bdinesh@evernile.com</div>
                      <div className="text-xs sm:text-sm text-gray-600">Mobile: +91-8889926196</div>
                    </div>
                  </div>
                  
                  {/* Disclaimer at the end */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="text-xs text-muted-foreground text-center">
                      This is an initial readiness assessment and is not a substitute for a comprehensive evaluation. For full eligibility verification, please book a free consultation with us.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Copyright Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-4 z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">Copyright © 2025 Evernile. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Information Modal */}
      <Dialog open={infoModalOpen} onOpenChange={setInfoModalOpen}>
        <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-evernile-navy">
              {infoContent?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              {infoContent?.description}
            </p>
            {infoContent?.formula && (
              <div className="bg-gray-50 p-4 rounded-lg border">
                <p className="text-sm font-medium text-gray-600 mb-2">Formula:</p>
                <p className="font-mono text-lg font-semibold text-evernile-navy">
                  {infoContent.formula}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SMEEligibility;
