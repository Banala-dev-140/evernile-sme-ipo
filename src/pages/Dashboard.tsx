import { Gauge, ListChecks, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-evernile-navy">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-evernile-navy">EVERNILE</div>
              <div className="flex items-center gap-2">
                <div className="h-0.5 w-8 bg-evernile-red"></div>
                <div className="text-sm text-evernile-navy">CAPITAL</div>
                <div className="h-0.5 w-8 bg-evernile-red"></div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => navigate('/admin')}
                className="border-white text-white hover:bg-white hover:text-evernile-navy h-9 px-4"
              >
                Admin
              </Button>
              <a href="https://calendly.com/bdinesh-evernile/30min" target="_blank" rel="noreferrer noopener">
                <Button className="bg-evernile-red hover:bg-evernile-red/90 text-evernile-red-foreground h-9 px-4">
                  Book session
                </Button>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 min-h-[calc(100vh-144px)] flex flex-col">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            IPO Readiness Assessment
          </h1>
          <p className="text-base md:text-lg text-white/80">
            Quick check for IPO readiness and compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl w-full mx-auto flex-1 items-stretch">
          {/* Mainboard IPO Card */}
          <Card className="bg-white text-evernile-navy shadow-md h-full flex flex-col">
            <CardHeader className="pb-2 md:pb-3">
              <CardTitle className="text-3xl md:text-4xl">Mainboard IPO</CardTitle>
              <CardDescription className="text-evernile-navy/70 text-xs md:text-sm whitespace-nowrap overflow-hidden truncate">
                For larger companies targeting main stock exchanges.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2 flex flex-col">
              <div className="space-y-3 md:space-y-4 text-left">
                <div className="flex items-center gap-3 whitespace-nowrap leading-6">
                  <Gauge className="h-5 w-5 text-evernile-navy/70" />
                  <span className="text-sm md:text-base">Readiness Score</span>
                </div>
                <div className="flex items-center gap-3 whitespace-nowrap leading-6">
                  <ListChecks className="h-5 w-5 text-evernile-navy/70" />
                  <span className="text-sm md:text-base">Initial criteria check</span>
                </div>
                <div className="flex items-center gap-3 whitespace-nowrap leading-6">
                  <ClipboardCheck className="h-5 w-5 text-evernile-navy/70" />
                  <span className="text-sm md:text-base">Readiness assessment</span>
                </div>
              </div>
              <Button
                className="mt-6 w-full bg-evernile-red hover:bg-evernile-red/90 text-evernile-red-foreground"
                onClick={() => navigate('/mainboard-eligibility')}
              >
                Start Assessment
              </Button>
            </CardContent>
          </Card>

          {/* SME IPO Card */}
          <Card className="bg-white text-evernile-navy shadow-md h-full flex flex-col">
            <CardHeader className="pb-2 md:pb-3">
              <CardTitle className="text-3xl md:text-4xl">SME IPO</CardTitle>
              <CardDescription className="text-evernile-navy/70 text-xs md:text-sm whitespace-nowrap overflow-hidden truncate">
                For small and medium enterprises listing on SME platforms.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2 flex flex-col">
              <div className="space-y-3 md:space-y-4 text-left">
                <div className="flex items-center gap-3 whitespace-nowrap leading-6">
                  <Gauge className="h-5 w-5 text-evernile-navy/70" />
                  <span className="text-sm md:text-base">Readiness Score</span>
                </div>
                <div className="flex items-center gap-3 whitespace-nowrap leading-6">
                  <ListChecks className="h-5 w-5 text-evernile-navy/70" />
                  <span className="text-sm md:text-base">Initial criteria check</span>
                </div>
                <div className="flex items-center gap-3 whitespace-nowrap leading-6">
                  <ClipboardCheck className="h-5 w-5 text-evernile-navy/70" />
                  <span className="text-sm md:text-base">Readiness assessment</span>
                </div>
              </div>
              <Button
                className="mt-6 w-full bg-evernile-red hover:bg-evernile-red/90 text-evernile-red-foreground"
                onClick={() => navigate('/sme-eligibility')}
              >
                Start Assessment
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 mb-8">
          <p className="text-white mb-4">Need support with your assessment? Book a session with our team for tailored guidance.</p>
          <a href="https://calendly.com/bdinesh-evernile/30min" target="_blank" rel="noreferrer noopener">
            <Button className="bg-evernile-red hover:bg-evernile-red/90 text-evernile-red-foreground">
              Book session
            </Button>
          </a>
        </div>
      </main>

      {/* Copyright Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-evernile-navy py-4 z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-white">Copyright © 2025 Evernile. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;