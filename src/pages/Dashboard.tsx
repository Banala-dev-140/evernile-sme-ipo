import { Building2, FileCheck, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import evernileLogo from "@/assets/evernile-logo.png";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-hero">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={evernileLogo} alt="Evernile Capital" className="h-8 w-auto" />
            </div>
            <Badge variant="outline" className="border-white/20 text-white">
              SME IPO Eligibility Checker
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            IPO Eligibility Checker
          </h1>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Choose your path to evaluate IPO readiness and compliance criteria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* SME IPO Card */}
          <Card className="dashboard-card hover:shadow-2xl transition-all duration-300 border-4 border-brand-red/30 hover:border-brand-red/60 bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl md:text-3xl text-primary font-bold">SME IPO</CardTitle>
                <Badge className="bg-success text-success-foreground">Live</Badge>
              </div>
              <CardDescription className="text-muted-foreground">
                Eligibility assessment for SME platforms (NSE Emerge / BSE SME)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FileCheck className="h-4 w-4 text-success" />
                  <span className="text-sm">Financial Metrics Check</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <span className="text-sm">Legal Structure Validation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-success" />
                  <span className="text-sm">Quick Assessment Report</span>
                </div>
              </div>
              <Button 
                className="w-full bg-brand-red hover:bg-brand-red/90 text-brand-red-foreground"
                onClick={() => navigate('/sme-eligibility')}
              >
                Start SME Eligibility
              </Button>
            </CardContent>
          </Card>

          {/* Mainboard IPO Card */}
          <Card className="dashboard-card hover:shadow-2xl transition-all duration-300 border hover:border-brand-red/30">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl md:text-3xl text-primary font-bold">Mainboard IPO</CardTitle>
                <Badge variant="outline" className="border-white/20 text-white">Beta</Badge>
              </div>
              <CardDescription className="text-muted-foreground">
                Preliminary assessment for Mainboard listing readiness
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FileCheck className="h-4 w-4 text-success" />
                  <span className="text-sm">Regulatory Compliance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <span className="text-sm">Financial Thresholds</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-success" />
                  <span className="text-sm">Disclosure Requirements</span>
                </div>
              </div>
              <Button 
                className="w-full"
                variant="secondary"
                onClick={() => navigate('/mainboard-eligibility')}
              >
                Explore Mainboard Eligibility
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;