import { Gauge, ListChecks, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import evernileLogo from "@/assets/evernile-logo.png";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-evernile-navy">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <img src={evernileLogo} alt="Evernile Capital" className="h-10 w-auto" />
            <a href="https://calendly.com/bdinesh-evernile/30min" target="_blank" rel="noreferrer noopener">
              <Button className="bg-evernile-red hover:bg-evernile-red/90 text-evernile-red-foreground h-9 px-4">
                Book session
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 min-h-[calc(100vh-72px)] flex flex-col">
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
          <p className="text-white mb-4">Need guidance with the assessment, book a session with us, our team will guide through the assessment</p>
          <a href="https://calendly.com/bdinesh-evernile/30min" target="_blank" rel="noreferrer noopener">
            <Button className="bg-evernile-red hover:bg-evernile-red/90 text-evernile-red-foreground">
              Book session
            </Button>
          </a>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;