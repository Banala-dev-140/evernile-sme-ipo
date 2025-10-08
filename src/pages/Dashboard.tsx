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
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div className="text-xl sm:text-2xl font-bold text-evernile-navy">EVERNILE</div>
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="h-0.5 w-6 sm:w-8 bg-evernile-red"></div>
                <div className="text-xs sm:text-sm text-evernile-navy">CAPITAL</div>
                <div className="h-0.5 w-6 sm:w-8 bg-evernile-red"></div>
              </div>
            </div>
            <div className="flex gap-1 sm:gap-2">
              <Button 
                variant="outline" 
                onClick={() => navigate('/admin')}
                className="border-white text-white hover:bg-white hover:text-evernile-navy h-8 sm:h-9 px-2 sm:px-4 text-xs sm:text-sm"
              >
                Admin
              </Button>
              <a href="https://calendly.com/bdinesh-evernile/30min" target="_blank" rel="noreferrer noopener">
                <Button className="bg-evernile-red hover:bg-evernile-red/90 text-evernile-red-foreground h-8 sm:h-9 px-2 sm:px-4 text-xs sm:text-sm">
                  Book session
                </Button>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 sm:py-12 min-h-[calc(100vh-120px)] sm:min-h-[calc(100vh-144px)] flex flex-col">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 px-2">
            IPO Readiness Assessment
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/80 px-4">
            Quick check for IPO readiness and compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 max-w-5xl w-full mx-auto flex-1 items-stretch">
          {/* Mainboard IPO Card */}
          <Card className="bg-white text-evernile-navy shadow-md h-full flex flex-col">
            <CardHeader className="pb-2 md:pb-3 px-4 sm:px-6">
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl">Mainboard IPO</CardTitle>
              <CardDescription className="text-evernile-navy/70 text-xs sm:text-sm md:text-base">
                For larger companies targeting main stock exchanges.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2 flex flex-col px-4 sm:px-6">
              <div className="space-y-3 md:space-y-4 text-left">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Gauge className="h-4 w-4 sm:h-5 sm:w-5 text-evernile-navy/70 flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base">Readiness Score</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <ListChecks className="h-4 w-4 sm:h-5 sm:w-5 text-evernile-navy/70 flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base">Initial criteria check</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <ClipboardCheck className="h-4 w-4 sm:h-5 sm:w-5 text-evernile-navy/70 flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base">Readiness assessment</span>
                </div>
              </div>
              <Button
                className="mt-4 sm:mt-6 w-full bg-evernile-red hover:bg-evernile-red/90 text-evernile-red-foreground h-10 sm:h-11 text-sm sm:text-base"
                onClick={() => navigate('/mainboard-eligibility')}
              >
                Start Assessment
              </Button>
            </CardContent>
          </Card>

          {/* SME IPO Card */}
          <Card className="bg-white text-evernile-navy shadow-md h-full flex flex-col">
            <CardHeader className="pb-2 md:pb-3 px-4 sm:px-6">
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl">SME IPO</CardTitle>
              <CardDescription className="text-evernile-navy/70 text-xs sm:text-sm md:text-base">
                For small and medium enterprises listing on SME platforms.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2 flex flex-col px-4 sm:px-6">
              <div className="space-y-3 md:space-y-4 text-left">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Gauge className="h-4 w-4 sm:h-5 sm:w-5 text-evernile-navy/70 flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base">Readiness Score</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <ListChecks className="h-4 w-4 sm:h-5 sm:w-5 text-evernile-navy/70 flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base">Initial criteria check</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <ClipboardCheck className="h-4 w-4 sm:h-5 sm:w-5 text-evernile-navy/70 flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base">Readiness assessment</span>
                </div>
              </div>
              <Button
                className="mt-4 sm:mt-6 w-full bg-evernile-red hover:bg-evernile-red/90 text-evernile-red-foreground h-10 sm:h-11 text-sm sm:text-base"
                onClick={() => navigate('/sme-eligibility')}
              >
                Start Assessment
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8 sm:mt-12 mb-6 sm:mb-8 px-4">
          <p className="text-white mb-3 sm:mb-4 text-sm sm:text-base">Need support with your assessment? Book a session with our team for tailored guidance.</p>
          <a href="https://calendly.com/bdinesh-evernile/30min" target="_blank" rel="noreferrer noopener">
            <Button className="bg-evernile-red hover:bg-evernile-red/90 text-evernile-red-foreground h-10 sm:h-11 text-sm sm:text-base px-4 sm:px-6">
              Book session
            </Button>
          </a>
        </div>
      </main>

      {/* Copyright Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-evernile-navy py-3 sm:py-4 z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs sm:text-sm text-white">Copyright © 2025 Evernile. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;