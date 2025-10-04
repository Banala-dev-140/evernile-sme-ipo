import { useMemo, useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
    question: "The Business is in existence for",
    options: [
      { text: "0 to 2 Years", weight: 2 },
      { text: "2 to 3 Years", weight: 3 },
      { text: "3 to 10 Years", weight: 4 },
      { text: "More than 10 Years", weight: 4 },
    ],
  },
  {
    id: 3,
    question: "Paid up Capital of the company is",
    options: [
      { text: "Less than 10 Crore", weight: 1 },
      { text: "Equal to or more than 10 Crore", weight: 3 },
      { text: "Don't Know", weight: 1 },
    ],
  },
  {
    id: 4,
    question: "When are you planning to file the IPO",
    options: [
      { text: "In one year", weight: 3 },
      { text: "In two years", weight: 2 },
      { text: "Not sure", weight: 1 },
    ],
  },
  {
    id: 5,
    question: "PAT/Net profit of the company for the last financial Year",
    options: [
      { text: "0 to 5 Crore", weight: 3 },
      { text: "5 to 10 Crore", weight: 4 },
      { text: "More than 10 Crore", weight: 4 },
      { text: "Don't know", weight: 1 },
    ],
  },
];

type Answer = { questionId: number; selected: string; weight: number };

function mapScore(total: number): { readiness: number; label: string } {
  if (total >= 17) return { readiness: 4.5, label: "High IPO Readiness" };
  if (total >= 14) return { readiness: 4.0, label: "Good IPO Readiness" };
  if (total >= 11) return { readiness: 3.5, label: "Moderate IPO Readiness" };
  if (total >= 8) return { readiness: 3.0, label: "Basic IPO Readiness" };
  return { readiness: 2.5, label: "Low Readiness" };
}

function closingMessage(score: number): string {
  if (score === 4.5) {
    return "Based on the data provided in the assessment, your company has a high IPO readiness. To understand how to proceed ahead with the mainboard IPO, please book a Readiness call with our IPO Expert Team.";
  } else if (score === 4.0) {
    return "Based on the data provided in the assessment, your company has a good IPO readiness. To understand how to proceed ahead with the mainboard IPO, please book a Readiness call with our IPO Expert Team.";
  } else if (score === 3.5) {
    return "Based on the data provided in the assessment, your company shows moderate IPO readiness. To explore the next steps and improve readiness, please book a Readiness call with our IPO Expert team.";
  } else if (score === 3.0) {
    return "Based on the data provided in the assessment, your company has basic IPO readiness. We recommend booking a Readiness call with our IPO Expert team to assist in progressing further.";
  }
  return "Based on the data provided in the assessment, your company needs to enhance its IPO readiness. To understand how to strengthen your position, please book a Readiness call with our team.";
}

function generateDynamicPoints(answers: Answer[]): string[] {
  const points: string[] = [];
  const byId = new Map<number, Answer>(answers.map(a => [a.questionId, a]));

  // Question 1: Type of Company
  const q1 = byId.get(1);
  if (q1) {
    if (q1.selected === "Public Limited" || q1.selected === "Private Limited") {
      points.push("Your company structure is suitable for mainboard IPO listing requirements.");
    } else if (q1.selected === "Partnership Firm" || q1.selected === "Proprietorship") {
      points.push("Consider converting to a Private Limited or Public Limited company structure to meet mainboard IPO eligibility criteria.");
    }
  }

  // Question 2: Business Existence Duration
  const q2 = byId.get(2);
  if (q2) {
    if (q2.selected === "0 to 2 Years" || q2.selected === "2 to 3 Years") {
      points.push("As per regulatory guideline a company should be in existence for 3 or more years");
    } else if (q2.selected === "3 to 10 Years" || q2.selected === "More than 10 Years") {
      points.push("Your company fulfills the regulatory criteria of existence for more than 3 years");
    }
  }

  // Question 3: Paid-up Capital
  const q3 = byId.get(3);
  if (q3) {
    if (q3.selected === "Equal to or more than 10 Crore") {
      points.push("Your company fulfills the regulatory criteria of having a paid-up capital of equal to or more than 10 Crore");
    } else if (q3.selected === "Less than 10 Crore") {
      points.push("As per regulations, a company needs to have paid-up capital equal to or more than 10 Crore");
    } else if (q3.selected === "Don't know") {
      points.push("As per regulations, a company needs to have paid-up capital equal to or more than 10 Crore; to understand this please book a session with IPO expert team");
    }
  }

  // Question 4: IPO Filing Timeline
  const q4 = byId.get(4);
  if (q4) {
    if (q4.selected === "In one year") {
      points.push("Your timeline for IPO filing is aggressive and requires immediate preparation and compliance work.");
    } else if (q4.selected === "In two years") {
      points.push("Your IPO timeline provides adequate time for preparation and regulatory compliance.");
    } else if (q4.selected === "Not sure") {
      points.push("Having a clear IPO timeline is crucial for planning and preparation - consider booking a consultation to develop a structured roadmap.");
    }
  }

  // Question 5: PAT/Net Profit
  const q5 = byId.get(5);
  if (q5) {
    if (q5.selected === "More than 10 Crore") {
      points.push("Your company's profitability meets the high standards required for mainboard IPO listing.");
    } else if (q5.selected === "5 to 10 Crore") {
      points.push("Your company's profitability is within the acceptable range for mainboard IPO eligibility.");
    } else if (q5.selected === "0 to 5 Crore") {
      points.push("Consider improving profitability to strengthen your mainboard IPO readiness and attract better valuations.");
    } else if (q5.selected === "Don't know") {
      points.push("Profitability is a key metric for mainboard IPO success - book a consultation to assess your financial readiness.");
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

const MainboardEligibility = () => {
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
      const q1 = answers[1];
      const q2 = answers[2];
      const q3 = answers[3];
      const q4 = answers[4];
      const q5 = answers[5];

      const assessmentData: Omit<AssessmentResponse, 'id' | 'created_at' | 'updated_at'> = {
        assessment_type: 'mainboard',
        user_name: name.trim(),
        user_email: email.trim(),
        user_phone: phone.trim() || undefined,
        total_score: totalWeight,
        readiness_score: scoreMeta.readiness,
        readiness_label: scoreMeta.label,
        
        // Mainboard IPO Questions
        q1_type_of_company: q1?.selected,
        q1_type_of_company_weight: q1?.weight,
        q2_business_existence: q2?.selected,
        q2_business_existence_weight: q2?.weight,
        q3_paid_up_capital: q3?.selected,
        q3_paid_up_capital_weight: q3?.weight,
        q4_ipo_filing_timeline: q4?.selected,
        q4_ipo_filing_timeline_weight: q4?.weight,
        q5_pat_net_profit: q5?.selected,
        q5_pat_net_profit_weight: q5?.weight
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
      console.log('📧 Mainboard Email Data being sent:');
      console.log('  - answerList:', answerList);
      console.log('  - dynamicPoints:', dynamicPoints);
      console.log('  - scoreMeta:', scoreMeta);
      console.log('  - totalWeight:', totalWeight);

      const emailData: EmailData = {
        to: email.trim(),
        userName: name.trim(),
        assessmentType: 'mainboard',
        readinessScore: scoreMeta.readiness,
        readinessLabel: scoreMeta.label,
        totalScore: totalWeight,
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
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => navigate('/')} className="text-evernile-navy hover:text-evernile-navy/80">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
                <div className="h-6 border-l border-gray-300" />
                <div className="flex flex-col items-center">
                  <div className="text-xl font-bold text-evernile-navy">EVERNILE</div>
                  <div className="flex items-center gap-2">
                    <div className="h-0.5 w-6 bg-evernile-red"></div>
                    <div className="text-xs text-evernile-navy">CAPITAL</div>
                    <div className="h-0.5 w-6 bg-evernile-red"></div>
                  </div>
                </div>
              </div>
              <div className="text-lg font-semibold text-evernile-navy">
                Mainboard IPO Readiness Assessment
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

      <main className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-2xl">{showReport ? "Mainboard IPO Readiness Assessment Report" : ""}</CardTitle>
              {/* Helper text removed as requested */}
            </CardHeader>
            <CardContent className="space-y-6">
              {!showReport && step < QUESTIONS.length && current && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="text-xl font-bold text-left flex items-center gap-2">
                      {current.question}
                    {current.id === 3 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0"
                        onClick={() => openInfoModal(
                          "Paid-up Capital",
                          "Paid-up capital is the amount received by a company from shareholders for shares that have been fully paid for, forming part of the issued share capital, and cannot exceed the authorised capital set in the company's charter.",
                          ""
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
                  <div className="space-y-3">
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
                  <div className="flex justify-between pt-2">
                    {step > 0 ? (
                      <Button onClick={onPrevious} variant="outline" className="border-evernile-navy text-evernile-navy hover:bg-evernile-navy hover:text-white">
                        Previous
                      </Button>
                    ) : (
                      <div></div>
                    )}
                    <Button onClick={onNext} disabled={!canNext} className="bg-evernile-navy text-white">
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {!showReport && step === QUESTIONS.length && (
                <div className="space-y-4">
                  <div className="text-lg font-semibold text-evernile-navy">Almost there! Please fill out few details and generate your IPO Readiness Assessment Report.</div>
                  <div className="text-lg font-medium">Your Details</div>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid gap-1">
                      <Label htmlFor="name">Name<span className="text-red-500">*</span></Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="email">Email ID<span className="text-red-500">*</span></Label>
                      <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="phone">Mobile No.</Label>
                      <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="XXXXXXXXXX" />
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      disabled={!canCreateReport || isGeneratingReport}
                      onClick={async () => {
                        await saveAssessmentData();
                        await sendEmailReport();
                      }}
                      className="bg-evernile-red text-evernile-red-foreground"
                    >
                      {isGeneratingReport ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Generating Report...
                        </div>
                      ) : (
                        "Generate & Email IPO Readiness Assessment Report"
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
                      Your Mainboard IPO Readiness Assessment report has been sent to <strong>{email}</strong>
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
                    <div className="flex-1 p-4 bg-evernile-red rounded-lg flex items-center justify-center">
                      <a href="https://calendly.com/bdinesh-evernile/30min" target="_blank" rel="noreferrer noopener">
                        <Button className="bg-transparent hover:bg-transparent text-white border-0 h-auto py-2 px-4 text-base font-medium">Book call with our IPO Expert</Button>
                      </a>
                    </div>
                    <div className="flex-1 p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-700 mb-2">Contact Details:</div>
                      <div className="text-sm text-gray-600">Email: bdinesh@evernile.com</div>
                      <div className="text-sm text-gray-600">Mobile: +91-8889926196</div>
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

export default MainboardEligibility;





