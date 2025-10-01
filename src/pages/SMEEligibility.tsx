import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import evernileLogo from "@/assets/evernile-logo.png";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
    ],
  },
  {
    id: 2,
    question: "Business existence period",
    options: [
      { text: "Under 2 years", weight: 2 },
      { text: "Under 3 years", weight: 3 },
      { text: "More than 3 years", weight: 4 },
    ],
  },
  {
    id: 3,
    question: "Debt-to-Equity (D/E) Ratio",
    options: [
      { text: "Less than or equal to 3:1", weight: 4 },
      { text: "More than 3:1", weight: 2 },
      { text: "Don't know", weight: 2 },
    ],
  },
  {
    id: 4,
    question: "Net Worth in preceding financial year",
    options: [
      { text: "Not Yet Positive", weight: 1 },
      { text: "Less than 1 Crore", weight: 2 },
      { text: "1 to 5 Crore", weight: 3 },
      { text: "More than 5 Crore", weight: 4 },
    ],
  },
  {
    id: 5,
    question: "Operating profit positive for last 2 out of 3 financial years",
    options: [
      { text: "Yes", weight: 4 },
      { text: "No", weight: 2 },
      { text: "Don't know", weight: 2 },
    ],
  },
  {
    id: 6,
    question: "Net Tangible Assets",
    options: [
      { text: "More than 3 Crore", weight: 3 },
      { text: "Less than 3 Crore", weight: 2 },
      { text: "Don't know", weight: 1 },
    ],
  },
  {
    id: 7,
    question: "Estimated time to file the IPO",
    options: [
      { text: "In one year", weight: 3 },
      { text: "In two years", weight: 2 },
      { text: "Not Sure", weight: 1 },
    ],
  },
];

type Answer = { questionId: number; selected: string; weight: number };

function mapScore(total: number): { readiness: number; label: string } {
  if (total >= 23) return { readiness: 4.5, label: "High Readiness" };
  if (total >= 20) return { readiness: 4.0, label: "Good Readiness" };
  if (total >= 17) return { readiness: 3.5, label: "Moderate Readiness" };
  if (total >= 14) return { readiness: 3.0, label: "Basic Readiness" };
  return { readiness: 2.5, label: "Needs Improvement" };
}

function closingMessage(score: number): string {
  if (score === 4.5) {
    return "Based on the assessment, your company shows high SME IPO readiness. Book a consultation with our experts to discuss next steps and detailed evaluation.";
  } else if (score === 4.0) {
    return "Based on the assessment, your company has good SME IPO readiness. Please book a consultation to move forward with confidence.";
  } else if (score === 3.5) {
    return "Based on the assessment, your company shows moderate SME IPO readiness. Schedule a consultation for tailored guidance.";
  } else if (score === 3.0) {
    return "Based on the assessment, your company has basic SME IPO readiness. Book a consultation for strategy to enhance compliance.";
  }
  return "Based on the assessment, your company needs to improve SME IPO readiness. Consult our advisory team for focused planning.";
}

function generateDynamicPoints(answers: Answer[]): string[] {
  const points: string[] = [];
  const byId = new Map<number, Answer>(answers.map(a => [a.questionId, a]));

  const q2 = byId.get(2);
  if (q2) {
    if (q2.selected === "More than 3 years") {
      points.push("Your company meets the SME IPO minimum operational history requirement of 3 years.");
      } else {
      points.push("Building a consistent operational history of at least 3 years is essential to qualify for SME IPO listing.");
    }
  }

  const q3 = byId.get(3);
  if (q3) {
    if (q3.selected === "Less than or equal to 3:1") {
      points.push("Your company's leverage is within the optimal range, meeting regulatory financial strength standards.");
    } else {
      points.push("Optimizing your debt-to-equity ratio will enhance financial stability and improve SME IPO eligibility.");
    }
  }

  const q4 = byId.get(4);
  if (q4) {
    if (q4.selected === "1 to 5 Crore" || q4.selected === "More than 5 Crore") {
      points.push("Your net worth satisfies the minimum requirement for SME IPO listing eligibility.");
    } else {
      points.push("Enhancing your net worth to meet or exceed ₹1 Crore will improve your SME IPO readiness.");
    }
  }

  const q5 = byId.get(5);
  if (q5) {
    if (q5.selected === "Yes") {
      points.push("Your profitability track record supports the operational viability required for SME IPO.");
    } else {
      points.push("Strengthening profitability for consecutive years is important to align with SME IPO standards.");
    }
  }

  const q6 = byId.get(6);
  if (q6) {
    if (q6.selected === "More than 3 Crore") {
      points.push("Your net tangible assets meet SME IPO listing requirements.");
    } else {
      points.push("Increasing net tangible assets will help meet the SME IPO eligibility threshold.");
    }
  }

  return points;
}

const OptionBox = ({ selected, onClick, text }: { selected: boolean; onClick: () => void; text: string }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full rounded-md border px-4 py-3 text-left transition ${
      selected ? "border-evernile-navy bg-evernile-navy/10" : "border-gray-300 hover:border-evernile-navy/60"
    }`}
  >
    {text}
  </button>
);

const SMEEligibility = () => {
  const [step, setStep] = useState<number>(0); // 0..QUESTIONS.length then contact
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [showReport, setShowReport] = useState<boolean>(false);

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

  const canCreateReport = allAnswered && name.trim() !== "" && (email.trim() !== "" || phone.trim() !== "");

  const progressPct = useMemo(() => {
    const completed = Math.min(step, QUESTIONS.length);
    return Math.round((completed / QUESTIONS.length) * 100);
  }, [step]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header with larger logo and book consultation on report page */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <img src={evernileLogo} alt="Evernile Capital" className="h-10 md:h-12 w-auto" />
            {showReport ? (
              <a href="https://calendly.com/bdinesh-evernile/30min" target="_blank" rel="noreferrer noopener">
                <Button className="bg-evernile-red hover:bg-evernile-red/90 text-evernile-red-foreground h-9 px-4">Book consultation</Button>
              </a>
            ) : (
              <div className="w-48 md:w-80">
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-evernile-red transition-all"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <div className="mt-1 text-[10px] text-right text-muted-foreground">{progressPct}%</div>
            </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-2xl">{showReport ? "SME IPO Readiness Assessment Report" : "SME IPO Readiness Assessment"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!showReport && step < QUESTIONS.length && current && (
                <div className="space-y-4 min-h-[50vh] flex flex-col justify-center">
                  <div className="text-lg font-medium flex items-center gap-2 justify-center text-center">
                    {current.question}
                    {current.id === 3 && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-evernile-navy/70" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Debt-to-Equity ratio measures the relative proportion of debt and equity used to finance a company's assets.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  <div className="space-y-3">
                    {current.options.map((o) => (
                      <OptionBox
                        key={o.text}
                        text={o.text}
                        selected={answers[current.id]?.selected === o.text}
                        onClick={() => onSelect(current, o)}
                      />
                    ))}
                              </div>
                  <div className="flex justify-end pt-2">
                    <Button onClick={onNext} disabled={!canNext} className="bg-evernile-navy text-white">
                      Next
                    </Button>
                            </div>
                          </div>
              )}

              {!showReport && step === QUESTIONS.length && (
                <div className="space-y-4">
                  <div className="text-lg font-semibold text-evernile-navy">Readiness assessment is completed</div>
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

                  <div className="flex justify-end">
              <Button 
                      disabled={!canCreateReport}
                      onClick={() => setShowReport(true)}
                      className="bg-evernile-red text-evernile-red-foreground"
                    >
                      Create SME IPO Readiness Assessment report
              </Button>
            </div>
          </div>
              )}

              {showReport && (
                <div className="space-y-6">
                  <div className="text-xl font-semibold text-center">SME IPO Readiness Score</div>

                  {/* Half gauge centered (thicker arc) */}
                  <div className="flex justify-center">
                    <div className="relative w-full max-w-2xl">
                      <svg viewBox="0 0 100 50" className="w-full">
                        <defs>
                          <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#0a2a5e" />
                            <stop offset="100%" stopColor="#0a2a5e" />
                          </linearGradient>
                        </defs>
                        <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="#e5e7eb" strokeWidth="10" strokeLinecap="round" />
                        <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="url(#g)" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${(scoreMeta.readiness/5)*100} 100`} />
                      </svg>
                    </div>
                  </div>

                  <div className="text-center text-sm text-muted-foreground">
                    Based on the assessment, your company's SME IPO readiness score is {scoreMeta.readiness.toFixed(1)} out of 5.
                  </div>

                  <div className="text-sm text-muted-foreground text-center">{scoreMeta.label}</div>
                  <div className="pt-2">
                    <div className="font-medium mb-2">Assessment:</div>
                    <ul className="list-disc pl-5 space-y-1">
                      {dynamicPoints.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-2">
                    <div className="font-medium mb-1">Summary</div>
                    <p>{closingMessage(scoreMeta.readiness)}</p>
                    <p className="mt-4 text-xs text-muted-foreground">
                      This is an initial readiness assessment and is not a substitute for a comprehensive evaluation. For full eligibility verification, book a detailed advisory session.
                    </p>
                    <div className="mt-4">
                      <a href="https://calendly.com/bdinesh-evernile/30min" target="_blank" rel="noreferrer noopener">
                        <Button className="bg-evernile-red hover:bg-evernile-red/90 text-evernile-red-foreground">Book consultation</Button>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SMEEligibility;
