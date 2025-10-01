import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    question: "The Business is in existence for",
    options: [
      { text: "under 2 years", weight: 2 },
      { text: "under 3 Years", weight: 3 },
      { text: "more than 3 years", weight: 4 },
    ],
  },
  {
    id: 3,
    question: "Paid up Capital of the company is",
    options: [
      { text: "Less then 10 Cr", weight: 1 },
      { text: "equal to or more than 10 Crore", weight: 3 },
      { text: "Don't Know", weight: 1 },
    ],
  },
  {
    id: 4,
    question: "When are you planning to file the IPO",
    options: [
      { text: "In one 1 year", weight: 3 },
      { text: "In two year", weight: 2 },
      { text: "Not Sure", weight: 1 },
    ],
  },
  {
    id: 5,
    question: "PAT/Net profit of the company for the last financial Year",
    options: [
      { text: "Less then 10 Cr", weight: 3 },
      { text: "More then 10 Cr", weight: 4 },
      { text: "Don't Know", weight: 1 },
    ],
  },
];

type Answer = { questionId: number; selected: string; weight: number };

function mapScore(total: number): { readiness: number; label: string } {
  if (total >= 17) return { readiness: 4.5, label: "High IPO Readiness" };
  if (total >= 14) return { readiness: 4.0, label: "Good IPO Readiness" };
  if (total >= 11) return { readiness: 3.5, label: "Moderate IPO Readiness" };
  if (total >= 8) return { readiness: 3.0, label: "Basic IPO Readiness" };
  return { readiness: 2.5, label: "Needs Improvement" };
}

function closingMessage(score: number): string {
  if (score === 4.5) {
    return "Based on the data provided in the assessment, your company has a high IPO readiness. To understand how to proceed ahead with the mainboard IPO, please book a Readiness call with our team.";
  } else if (score === 4.0) {
    return "Based on the data provided in the assessment, your company has a good IPO readiness. To understand how to proceed ahead with the mainboard IPO, please book a Readiness call with our team.";
  } else if (score === 3.5) {
    return "Based on the data provided in the assessment, your company shows moderate IPO readiness. To explore the next steps and improve readiness, please book a Readiness call with our team.";
  } else if (score === 3.0) {
    return "Based on the data provided in the assessment, your company has basic IPO readiness. We recommend booking a Readiness call with our team to assist in progressing further.";
  }
  return "Based on the data provided in the assessment, your company needs to enhance its IPO readiness. To understand how to strengthen your position, please book a Readiness call with our team.";
}

function generateDynamicPoints(answers: Answer[]): string[] {
  const points: string[] = [];
  const byId = new Map<number, Answer>(answers.map(a => [a.questionId, a]));

  const q2 = byId.get(2);
  if (q2) {
    if (q2.selected === "under 2 years" || q2.selected === "under 3 Years") {
      points.push("As per regulatory guideline a company should be in existence for 3 or more years");
    } else if (q2.selected === "more than 3 years") {
      points.push("Your company fulfills the regulatory criteria of existence for more than 3 years");
    }
  }

  const q3 = byId.get(3);
  if (q3) {
    if (q3.selected === "equal to or more than 10 Crore") {
      points.push("Your company fulfills the regulatory criteria of having a paid-up capital of equal to or more than 10 Cr");
    } else if (q3.selected === "Less then 10 Cr") {
      points.push("As per regulations, a company needs to have paid-up capital equal to or more than 10 Cr");
    } else if (q3.selected === "Don't Know") {
      points.push("As per regulations, a company needs to have paid-up capital equal to or more than 10 Cr; to understand how to calculate this, please book a session with our team");
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

const MainboardEligibility = () => {
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

  const Gauge = ({ score }: { score: number }) => {
    const pct = (score / 5) * 100;
    const color = "#0a2a5e"; // evernile navy approx
    return (
      <div className="flex items-center gap-4">
        <div
          className="relative h-24 w-24 rounded-full"
          style={{
            background: `conic-gradient(${color} ${pct}%, #e5e7eb ${pct}%)`,
          }}
        >
          <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center text-evernile-navy font-semibold">
            {score.toFixed(1)}
          </div>
        </div>
        <div className="text-sm text-muted-foreground">0
          <span className="mx-2">–</span>5
        </div>
      </div>
    );
  };

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
              <CardTitle className="text-2xl">{showReport ? "Mainboard IPO Readiness Assessment Report" : "Mainboard IPO Readiness Assessment"}</CardTitle>
              {/* Helper text removed as requested */}
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
                            <p>Paid-up capital is the amount of money a company has received from shareholders in exchange for shares.</p>
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
                      Create IPO Readiness Assessment report
                    </Button>
                  </div>
                </div>
              )}

              {showReport && (
                <div className="space-y-6">
                  {/* Report header with actions */}
                  <div className="flex items-center justify-between">
                    <a href="https://calendly.com/bdinesh-evernile/30min" target="_blank" rel="noreferrer noopener">
                      <Button className="bg-evernile-red hover:bg-evernile-red/90 text-evernile-red-foreground h-9 px-4">Book consultation</Button>
                    </a>
                    <img src={evernileLogo} alt="Evernile Capital" className="h-8 w-auto" />
                  </div>

                  <div className="text-xl font-semibold text-center">Mainboard IPO Readiness Score</div>

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
                    Based on the answers given on the assessment, the IPO Readiness score is {scoreMeta.readiness.toFixed(1)} out of 5.
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
                      Note: This is a basic initial IPO readiness assessment designed to give a preliminary understanding of your company’s preparedness. It does not constitute a final or comprehensive evaluation. For a complete and detailed assessment, book a consultation with us.
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

export default MainboardEligibility;





