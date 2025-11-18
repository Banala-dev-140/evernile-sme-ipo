import { useState } from "react";
import { ArrowLeft, HelpCircle, Info, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useNavigate } from "react-router-dom";
import { NSE_EMERGE_QUESTIONS } from "@/data/nseEmergeQuestions";
import { QuestionnaireResponse, AssessmentResult } from "@/types/questionnaire";
import evernileLogo from "@/assets/evernile-logo.png";

const NSEEmerge = () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState<Record<number, boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [openQuestions, setOpenQuestions] = useState<Set<number>>(new Set(NSE_EMERGE_QUESTIONS.map(q => q.id)));

  const handleResponseChange = (questionId: number, answer: boolean) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: answer
    }));
    
    // Collapse question once answered
    setOpenQuestions(prev => {
      const newSet = new Set(prev);
      newSet.delete(questionId);
      return newSet;
    });
  };

  const toggleQuestion = (questionId: number) => {
    setOpenQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const calculateResults = (): AssessmentResult => {
    const questionnaireResponses: QuestionnaireResponse[] = NSE_EMERGE_QUESTIONS.map(q => ({
      questionId: q.id,
      answer: responses[q.id] ?? false
    }));

    const failedQuestions = NSE_EMERGE_QUESTIONS.filter(q => 
      responses[q.id] !== q.correctAnswer
    );

    return {
      isEligible: failedQuestions.length === 0 && Object.keys(responses).length === NSE_EMERGE_QUESTIONS.length,
      failedQuestions,
      responses: questionnaireResponses
    };
  };

  const handleSubmit = () => {
    const result = calculateResults();
    setAssessmentResult(result);
    setShowResults(true);
    
    if (result.isEligible) {
      navigate('/results', { state: { result, type: 'eligible' } });
    } else {
      navigate('/results', { state: { result, type: 'not-eligible' } });
    }
  };

  const handleReset = () => {
    setResponses({});
    setShowResults(false);
    setAssessmentResult(null);
    setOpenQuestions(new Set(NSE_EMERGE_QUESTIONS.map(q => q.id)));
  };

  const isComplete = Object.keys(responses).length === NSE_EMERGE_QUESTIONS.length;
  const canSubmit = isComplete;

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/')} className="text-evernile-navy hover:text-evernile-navy/80">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div className="h-6 border-l border-border" />
              <img src={evernileLogo} alt="Evernile Capital" className="h-6 w-auto" />
              <h1 className="text-lg font-semibold text-evernile-navy">NSE Emerge Eligibility Assessment</h1>
            </div>
            <Badge className="bg-evernile-red text-white">
              {Object.keys(responses).length}/{NSE_EMERGE_QUESTIONS.length} Completed
            </Badge>
          </div>
        </div>
      </header>

      {/* Fixed Progress Bar */}
      <div className="fixed top-[73px] left-0 right-0 z-40 border-b bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-evernile-red h-2 rounded-full transition-all duration-300"
              style={{ width: `${(Object.keys(responses).length / NSE_EMERGE_QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content with top margin for fixed header */}
      <main className="pt-32 pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mt-[30px]">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-evernile-navy mb-3">NSE Emerge Eligibility Checklist</h2>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                All questions are compulsory to get a correct assessment
              </p>
            </div>

            {/* Questions */}
            <div className="space-y-4 mb-8">
              {NSE_EMERGE_QUESTIONS.map((question) => {
                const isAnswered = question.id in responses;
                const isOpen = openQuestions.has(question.id);
                
                return (
                  <Card key={question.id} className={`transition-all duration-200 ${
                    isAnswered 
                      ? 'border-evernile-navy/20 bg-evernile-navy/5' 
                      : 'border-border hover:shadow-md'
                  }`}>
                    <Collapsible open={isOpen} onOpenChange={() => toggleQuestion(question.id)}>
                      <CollapsibleTrigger asChild>
                        <CardHeader className="pb-3 cursor-pointer hover:bg-muted/30 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-base font-medium mb-2 flex items-start gap-3">
                                <Badge 
                                  variant={isAnswered ? "default" : "outline"} 
                                  className={`shrink-0 ${isAnswered ? 'bg-evernile-navy text-white' : ''}`}
                                >
                                  Q{question.id}
                                </Badge>
                                <span className="leading-relaxed text-sm">{question.text}</span>
                              </CardTitle>
                              
                              {question.tag && (
                                <div className="flex items-center gap-2 mt-2 ml-12">
                                  <Badge variant="secondary" className="text-xs">
                                    <Info className="h-3 w-3 mr-1" />
                                    {question.tag}
                                  </Badge>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-2 shrink-0 ml-4">
                              {question.tooltip && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <HelpCircle className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent className="max-w-sm">
                                    <div className="space-y-2">
                                      <p className="font-medium">Additional Information:</p>
                                      <p className="text-sm">{question.tooltip}</p>
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                              
                              {isAnswered ? (
                                <Badge className="bg-success text-white text-xs">
                                  {responses[question.id] ? 'Yes' : 'No'}
                                </Badge>
                              ) : null}
                              
                              {isOpen ? (
                                <ChevronUp className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          <div className="flex items-center justify-center space-x-8">
                            <div className="flex items-center space-x-3">
                              <Switch
                                id={`${question.id}-yes`}
                                checked={responses[question.id] === true}
                                onCheckedChange={() => handleResponseChange(question.id, true)}
                              />
                              <Label 
                                htmlFor={`${question.id}-yes`}
                                className="font-medium cursor-pointer"
                              >
                                Yes
                              </Label>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <Switch
                                id={`${question.id}-no`}
                                checked={responses[question.id] === false}
                                onCheckedChange={() => handleResponseChange(question.id, false)}
                              />
                              <Label 
                                htmlFor={`${question.id}-no`}
                                className="font-medium cursor-pointer"
                              >
                                No
                              </Label>
                            </div>
                          </div>

                          {/* Special FCFE Dialog for Question 5 */}
                          {question.id === 5 && (
                            <div className="mt-4 text-center">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <HelpCircle className="h-4 w-4 mr-2" />
                                    Need Help with FCFE calculation?
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Free Cash Flow to Equity (FCFE) Calculation</DialogTitle>
                                    <DialogDescription>
                                      FCFE calculation methodology and guidance will be provided here.
                                      This is a placeholder for detailed calculation assistance.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <p className="text-sm text-muted-foreground">
                                      FCFE = Net Income + Depreciation - Capital Expenditure - Change in Working Capital - Principal Debt Repayment + New Debt Issues
                                    </p>
                                    <Badge variant="secondary" className="w-fit">
                                      Feature coming soon - Contact our team for assistance
                                    </Badge>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          )}
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center space-x-4">
              <Button variant="outline" onClick={handleReset}>
                Reset Assessment
              </Button>
              <Button 
                className="bg-evernile-navy hover:bg-evernile-navy/90 text-white px-8"
                onClick={handleSubmit}
                disabled={!canSubmit}
              >
                Submit Assessment
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NSEEmerge;