import { useState } from "react";
import { ArrowLeft, Info, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useNavigate } from "react-router-dom";
import { SME_ELIGIBILITY_QUESTIONS } from "@/data/smeEligibilityQuestions";
import evernileLogo from "@/assets/evernile-logo.png";

const SMEEligibility = () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [openQuestions, setOpenQuestions] = useState<Set<number>>(new Set(SME_ELIGIBILITY_QUESTIONS.map(q => q.id)));

  const handleResponseChange = (questionId: number, value: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // Collapse question once answered
    setOpenQuestions(prev => {
      const newSet = new Set(prev);
      newSet.delete(questionId);
      return newSet;
    });
  };

  const isAnswerCorrect = (questionId: number) => {
    const question = SME_ELIGIBILITY_QUESTIONS.find(q => q.id === questionId);
    const response = responses[questionId];
    if (!question || !response) return null;
    return question.correctAnswers.includes(response);
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

  const calculateResults = () => {
    const failedQuestions = SME_ELIGIBILITY_QUESTIONS.filter(q => 
      !q.correctAnswers.includes(responses[q.id] || '')
    );

    const isEligible = failedQuestions.length === 0 && Object.keys(responses).length === SME_ELIGIBILITY_QUESTIONS.length;
    
    return {
      isEligible,
      failedQuestions: failedQuestions.map(q => ({
        id: q.id,
        text: q.text,
        correctAnswer: true // Dummy value for compatibility
      })),
      responses: SME_ELIGIBILITY_QUESTIONS.map(q => ({
        questionId: q.id,
        answer: responses[q.id] === q.correctAnswers[0]
      }))
    };
  };

  const handleSubmit = () => {
    const result = calculateResults();
    
    if (result.isEligible) {
      navigate('/results', { state: { result, type: 'eligible' } });
    } else {
      navigate('/results', { state: { result, type: 'not-eligible' } });
    }
  };

  const handleReset = () => {
    setResponses({});
    setOpenQuestions(new Set(SME_ELIGIBILITY_QUESTIONS.map(q => q.id)));
  };

  const isComplete = Object.keys(responses).length === SME_ELIGIBILITY_QUESTIONS.length;
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
              <h1 className="text-lg font-semibold text-evernile-navy">SME IPO Eligibility Assessment</h1>
            </div>
            <Badge className="bg-evernile-red text-white">
              {Object.keys(responses).length}/{SME_ELIGIBILITY_QUESTIONS.length} Completed
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
              style={{ width: `${(Object.keys(responses).length / SME_ELIGIBILITY_QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content with top margin for fixed header */}
      <main className="pt-32 pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-evernile-navy mb-3">SME IPO Eligibility Checklist</h2>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                All questions are compulsory to get a correct assessment
              </p>
            </div>

            {/* Questions */}
            <div className="space-y-4 mb-8">
            {SME_ELIGIBILITY_QUESTIONS.map((question) => {
                const isAnswered = question.id in responses;
                const isOpen = openQuestions.has(question.id);
                const isCorrect = isAnswerCorrect(question.id);
                
                return (
                  <Card key={question.id} className={`transition-all duration-200 ${
                    isAnswered 
                      ? isCorrect === false
                        ? 'border-red-500 bg-red-50'
                        : 'border-evernile-navy/20 bg-evernile-navy/5'
                      : 'border-border hover:shadow-md'
                  }`}>
                    <Collapsible open={isOpen} onOpenChange={() => toggleQuestion(question.id)}>
                      <CollapsibleTrigger asChild>
                        <CardHeader className="py-3 px-4 cursor-pointer hover:bg-muted/30 transition-colors">
                          <div className="flex items-center gap-3">
                            <Badge 
                              variant={isAnswered ? "default" : "outline"} 
                              className={`shrink-0 ${isAnswered ? isCorrect === false ? 'bg-red-500 text-white' : 'bg-evernile-navy text-white' : ''}`}
                            >
                              Q{question.id}
                            </Badge>
                            
                            <div className="flex-1 flex items-center gap-3">
                              <span className="text-sm font-medium">{question.text}</span>
                              
                              {question.tooltip && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0">
                                      <Info className="h-3 w-3" />
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
                              
                              {question.tag && (
                                <Badge variant="secondary" className="text-xs shrink-0">
                                  <Info className="h-3 w-3 mr-1" />
                                  {question.tag}
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-2 shrink-0">
                              <div className="w-[200px]">
                                <Select
                                  value={responses[question.id] || ''}
                                  onValueChange={(value) => handleResponseChange(question.id, value)}
                                >
                                  <SelectTrigger className="h-8 text-xs">
                                    <SelectValue placeholder="Select option" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {question.options.map((option) => (
                                      <SelectItem key={option.value} value={option.value} className="text-xs">
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              {isOpen ? (
                                <ChevronUp className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
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

export default SMEEligibility;
