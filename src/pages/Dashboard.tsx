import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import evernileLogo from "@/assets/Evernile Capital Logo_OG (1).png";
import ipoCompassLogo from "@/assets/IPO Compass Logo.png";
import mainboardIllustration from "@/assets/Types-of-IPO--01.jpg";
import smeIllustration from "@/assets/Types-of-IPO--02.jpg";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-evernile-navy">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/30 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-8 sm:py-5">
          <img
            src={evernileLogo}
            alt="Evernile Capital"
            className="h-9 w-auto sm:h-12"
          />
          <img
            src={ipoCompassLogo}
            alt="IPO Compass"
            className="h-9 w-auto sm:h-12"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-5 sm:px-8 lg:px-10">
        <div className="mt-6 mb-6 text-center sm:mb-8">
          <h1 className="mb-2 px-2 text-3xl font-semibold text-white sm:text-4xl">
            IPO Readiness Assessment
          </h1>
          <p className="px-2 text-sm text-white/80 sm:text-base">
            Quick check for IPO readiness and compliance
          </p>
        </div>

        <div className="grid w-full flex-1 items-stretch gap-5 md:grid-cols-2 lg:gap-7">
          {/* Mainboard IPO Card */}
          <Card className="flex h-full flex-col justify-between border-2 border-[#1d3f91] bg-white shadow-md rounded-none">
            <CardContent className="flex flex-col gap-6 px-6 pt-6 pb-3 lg:flex-row lg:items-center lg:gap-10">
              <div className="flex w-full items-center justify-center lg:w-[42%]">
                <img
                  src={mainboardIllustration}
                  alt="Mainboard IPO illustration"
                  className="max-h-40 w-full max-w-[230px] object-contain"
                />
              </div>
              <div className="text-left lg:flex-1">
                <CardTitle className="text-2xl font-semibold text-[#1d3f91] sm:text-3xl">
                  Mainboard IPO
                </CardTitle>
                <CardDescription className="mt-2 text-sm text-[#445b9c] sm:text-base">
                  For larger companies targeting main stock exchanges
              </CardDescription>
              </div>
            </CardContent>
            <div className="px-6 pb-6">
              <Button 
                variant="outline"
                className="flex h-11 w-full items-center justify-center gap-3 border-2 border-[#1d3f91] text-sm font-semibold text-[#1d3f91] transition hover:border-[#152d6a] hover:bg-[#f4f7ff] sm:h-12 sm:text-base rounded-none"
                onClick={() => navigate("/mainboard-eligibility")}
              >
                Start Assessment
                <span className="flex h-6 w-6 items-center justify-center bg-evernile-red text-white sm:h-7 sm:w-7">
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </span>
              </Button>
            </div>
          </Card>

          {/* SME IPO Card */}
          <Card className="flex h-full flex-col justify-between border-2 border-[#1d3f91] bg-white shadow-md rounded-none">
            <CardContent className="flex flex-col gap-6 px-6 pt-6 pb-3 lg:flex-row lg:items-center lg:gap-10">
              <div className="flex w-full items-center justify-center lg:w-[42%]">
                <img
                  src={smeIllustration}
                  alt="SME IPO illustration"
                  className="max-h-40 w-full max-w-[230px] object-contain"
                />
              </div>
              <div className="text-left lg:flex-1">
                <CardTitle className="text-2xl font-semibold text-[#1d3f91] sm:text-3xl">
                  SME IPO
                </CardTitle>
                <CardDescription className="mt-2 text-sm text-[#445b9c] sm:text-base">
                  For small & medium enterprises listing on SME platforms
                </CardDescription>
              </div>
            </CardContent>
            <div className="px-6 pb-6">
              <Button
                variant="outline"
                className="flex h-11 w-full items-center justify-center gap-3 border-2 border-[#1d3f91] text-sm font-semibold text-[#1d3f91] transition hover:border-[#152d6a] hover:bg-[#f4f7ff] sm:h-12 sm:text-base rounded-none"
                onClick={() => navigate("/sme-eligibility")}
              >
                Start Assessment
                <span className="flex h-6 w-6 items-center justify-center bg-evernile-red text-white sm:h-7 sm:w-7">
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </span>
              </Button>
            </div>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 mb-4">
          <div className="flex flex-col gap-6 rounded-xl border border-white/40 bg-[#0a1f4e] p-6 text-white shadow-lg sm:p-8 md:flex-row md:items-center md:justify-between">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl leading-none">✅</span>
                <p className="text-base sm:text-lg">
                  <span className="font-semibold">Initial Criteria Check</span> – Eligibility & listing thresholds
                </p>
                </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl leading-none">✅</span>
                <p className="text-base sm:text-lg">
                  <span className="font-semibold">Readiness Score</span> – Measure of preparedness level
                </p>
                   </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl leading-none">✅</span>
                <p className="text-base sm:text-lg">
                  <span className="font-semibold">Readiness Assessment</span> – Detailed evaluation & roadmap
                </p>
                  </div>
                </div>
            <div className="flex flex-col gap-4 md:w-[300px]">
              <p className="text-xs leading-relaxed text-white/80 sm:text-sm">
                Need support with your assessment? Book a session with our team for tailored guidance.
              </p>
              <a
                href="https://calendly.com/bdinesh-evernile/30min"
                target="_blank"
                rel="noreferrer noopener"
              >
                <Button className="h-11 w-full bg-evernile-red text-base font-semibold text-white transition hover:bg-evernile-red/90 sm:h-12 rounded-none">
                  Book Session
                </Button>
              </a>
                </div>
          </div>
        </div>
      </main>

      {/* Copyright Footer */}
      <footer className="bg-evernile-navy py-1.5 sm:py-2.5">
        <div className="mx-auto w-full max-w-6xl px-4 text-center">
          <p className="text-xs text-white/70 sm:text-sm">Copyright © 2025 Evernile. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;