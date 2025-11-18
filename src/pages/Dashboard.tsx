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
            loading="eager"
            decoding="async"
          />
          <img
            src={ipoCompassLogo}
            alt="IPO Compass"
            className="h-9 w-auto sm:h-12"
            loading="eager"
            decoding="async"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-2 sm:px-8 lg:px-10">
        <div className="mt-[30px] mb-6 text-center">
          <h1 className="mb-0 px-2 font-semibold text-white text-[clamp(26px,4vw,34px)] leading-tight">
            IPO Readiness Assessment
          </h1>
          <p className="-mt-1 px-2 text-white/80 text-[clamp(14px,2.6vw,18px)]">
            Quick check for IPO readiness and compliance
          </p>
        </div>

        <div className="grid w-full items-start gap-5 md:grid-cols-2">
          {/* Mainboard IPO Card */}
          <Card className="flex flex-col border-2 border-[#1d3f91] bg-white shadow-md rounded-none">
            <CardContent className="flex flex-col gap-4 px-6 pt-4 pb-3 md:flex-row md:items-start md:gap-4">
              <div className="flex w-full items-center justify-center md:w-[40%]">
                <img
                  src={mainboardIllustration}
                  alt="Mainboard IPO illustration"
                  className="max-h-40 w-full max-w-[220px] object-contain md:max-h-44"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div className="text-left md:flex-1 md:mt-5">
                <CardTitle className="font-semibold text-[#1d3f91] text-[clamp(20px,3.2vw,28px)] leading-tight">
                  Mainboard IPO
                </CardTitle>
                <CardDescription className="mt-0 text-[#445b9c] text-[clamp(14px,2.6vw,18px)]">
                  For larger companies targeting main stock exchanges
                </CardDescription>
              </div>
            </CardContent>
            <div className="px-6 pb-5">
              <Button 
                variant="outline"
                className="flex h-11 w-full items-center justify-center gap-3 border-2 border-[#1d3f91] font-semibold text-[#1d3f91] transition hover:border-[#152d6a] hover:bg-[#f4f7ff] sm:h-12 rounded-none text-[clamp(14px,2.4vw,16px)]"
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
          <Card className="flex flex-col border-2 border-[#1d3f91] bg-white shadow-md rounded-none">
            <CardContent className="flex flex-col gap-4 px-6 pt-4 pb-3 md:flex-row md:items-start md:gap-4">
              <div className="flex w-full items-center justify-center md:w-[40%]">
                <img
                  src={smeIllustration}
                  alt="SME IPO illustration"
                  className="max-h-40 w-full max-w-[220px] object-contain md:max-h-44"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div className="text-left md:flex-1 md:mt-5">
                <CardTitle className="font-semibold text-[#1d3f91] text-[clamp(20px,3.2vw,28px)] leading-tight">
                  SME IPO
                </CardTitle>
                <CardDescription className="mt-0 text-[#445b9c] text-[clamp(14px,2.6vw,18px)]">
                  For small & medium enterprises listing on SME platforms
                </CardDescription>
              </div>
            </CardContent>
            <div className="px-6 pb-5">
              <Button
                variant="outline"
                className="flex h-11 w-full items-center justify-center gap-3 border-2 border-[#1d3f91] font-semibold text-[#1d3f91] transition hover:border-[#152d6a] hover:bg-[#f4f7ff] sm:h-12 rounded-none text-[clamp(14px,2.4vw,16px)]"
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
        <div className="mt-[25px] mb-2">
          <div className="flex flex-col gap-3 border border-white/40 bg-[#0a1f4e] p-4 text-white shadow-lg sm:p-5 md:flex-row md:items-center md:justify-between rounded-none">
            <div className="flex-1 space-y-2.5 text-left">
              <div className="flex items-center gap-3">
                <span className="text-2xl leading-none">✅</span>
                <p className="text-[clamp(15px,2.4vw,18px)]">
                  <span className="font-semibold">Initial Criteria Check</span> – Eligibility & listing thresholds
                </p>
                </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl leading-none">✅</span>
                <p className="text-[clamp(15px,2.4vw,18px)]">
                  <span className="font-semibold">Readiness Score</span> – Measure of preparedness level
                </p>
                   </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl leading-none">✅</span>
                <p className="text-[clamp(15px,2.4vw,18px)]">
                  <span className="font-semibold">Readiness Assessment</span> – Detailed evaluation & roadmap
                </p>
                  </div>
                </div>
            <div className="flex flex-col gap-4 md:w-[320px]">
              <p className="text-white/80 text-[clamp(13px,2.2vw,16px)] leading-relaxed">
                Need support with your assessment? Book a session with our team for tailored guidance.
              </p>
              <a
                href="https://calendly.com/bdinesh-evernile/30min"
                target="_blank"
                rel="noreferrer noopener"
              >
                <Button className="h-11 w-full bg-evernile-red font-semibold text-white transition hover:bg-evernile-red/90 sm:h-12 rounded-none text-[clamp(14px,2.4vw,16px)]">
                  Book Session
                </Button>
              </a>
                </div>
          </div>
        </div>
      </main>

      {/* Copyright Footer */}
      <footer className="mt-auto bg-evernile-navy py-4 sm:py-5">
        <div className="mx-auto w-full max-w-6xl px-4 text-center">
          <p className="text-xs text-white/70 sm:text-sm">
            Copyright © 2025 Evernile. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;