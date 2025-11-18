import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, XCircle, Download, Mail, Phone, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AssessmentResult } from "@/types/questionnaire";
import { NSE_EMERGE_QUESTIONS } from "@/data/nseEmergeQuestions";
import { toast } from "@/hooks/use-toast";
import evernileLogo from "@/assets/evernile-logo.png";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, type } = location.state as { result: AssessmentResult; type: 'eligible' | 'not-eligible' };
  
  const [showDownloadForm, setShowDownloadForm] = useState(false);
  const [userDetails, setUserDetails] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: ''
  });

  const handleDownload = () => {
    // This needs Supabase integration to work properly
    if (!userDetails.companyName || !userDetails.contactName || !userDetails.email) {
      toast({
        title: "Missing Information", 
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // For now, show a message about needing Supabase integration
    toast({
      title: "Integration Required",
      description: "Please connect to Supabase to enable certificate generation and data storage.",
      variant: "destructive"
    });
    
    setShowDownloadForm(false);
  };

  const backToDashboard = () => {
    navigate('/');
  };

  if (!result) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={backToDashboard} className="text-evernile-navy hover:text-evernile-navy/80">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div className="h-6 border-l border-border" />
            <img src={evernileLogo} alt="Eversile Capital" className="h-6 w-auto" />
            <h1 className="text-lg font-semibold text-evernile-navy">Assessment Results</h1>
          </div>
        </div>
      </header>

      {/* Main Content with top margin for fixed header */}
      <main className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mt-[30px]">
            
            {/* Results Card */}
            {result.isEligible ? (
              // Eligible Results
              <Card className={`eligibility-result gradient-success text-white mb-8`}>
                <CardContent className="flex flex-col items-center space-y-6">
                  <CheckCircle className="h-16 w-16" />
                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-2">Congratulations!</h2>
                    <p className="text-xl mb-4">Your company is eligible for listing</p>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-4">
                    <Dialog open={showDownloadForm} onOpenChange={setShowDownloadForm}>
                      <DialogTrigger asChild>
                        <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                          <Download className="h-4 w-4 mr-2" />
                          Download Certificate
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Download Eligibility Certificate</DialogTitle>
                          <DialogDescription>
                            Please provide your details to generate and download your eligibility certificate.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="companyName">Company Name *</Label>
                            <Input
                              id="companyName"
                              value={userDetails.companyName}
                              onChange={(e) => setUserDetails(prev => ({...prev, companyName: e.target.value}))}
                              placeholder="Enter your company name"
                            />
                          </div>
                          <div>
                            <Label htmlFor="contactName">Contact Person Name *</Label>
                            <Input
                              id="contactName"
                              value={userDetails.contactName}
                              onChange={(e) => setUserDetails(prev => ({...prev, contactName: e.target.value}))}
                              placeholder="Enter contact person name"
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={userDetails.email}
                              onChange={(e) => setUserDetails(prev => ({...prev, email: e.target.value}))}
                              placeholder="Enter email address"
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              value={userDetails.phone}
                              onChange={(e) => setUserDetails(prev => ({...prev, phone: e.target.value}))}
                              placeholder="Enter phone number"
                            />
                          </div>
                          <Button onClick={handleDownload} className="w-full bg-evernile-red hover:bg-evernile-red/90 text-white">
                            Generate & Download Certificate
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ) : (
              // Not Eligible Results
              <Card className={`eligibility-result gradient-error text-white mb-8`}>
                <CardContent className="flex flex-col items-center space-y-6">
                  <XCircle className="h-16 w-16" />
                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-2">Not Eligible</h2>
                    <p className="text-xl mb-4">Currently not eligible for listing</p>
                    <p className="text-lg opacity-90">
                      Your company does not meet the required criteria due to non-compliance with regulatory requirements.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Failed Questions Details (if not eligible) */}
            {!result.isEligible && result.failedQuestions.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-error flex items-center gap-2">
                    <XCircle className="h-5 w-5" />
                    Non-Compliance Issues ({result.failedQuestions.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {result.failedQuestions.map((question) => (
                      <div key={question.id} className="p-4 border border-error/20 rounded-lg bg-error/5">
                        <div className="flex items-start gap-3">
                          <Badge variant="destructive">Q{question.id}</Badge>
                          <div className="flex-1">
                            <p className="font-medium text-sm mb-2">{question.text}</p>
                            <p className="text-xs text-muted-foreground">
                              Refer to SEBI NSE Emerge regulation for detailed requirements regarding this criterion.
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Next Steps:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Address the non-compliance issues identified above</li>
                      <li>• Consult with regulatory experts for detailed guidance</li>
                      <li>• Retry the assessment once compliance is achieved</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-1 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Get Expert Support</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 rounded bg-muted">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Email Support</p>
                          <p className="text-xs text-muted-foreground">info@evernile.com</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded bg-muted">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Phone Support</p>
                          <p className="text-xs text-muted-foreground">+91 XXXXX XXXXX</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded bg-muted">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Advisory Services</p>
                          <p className="text-xs text-muted-foreground">Expert IPO consultation</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;