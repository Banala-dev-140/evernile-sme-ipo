import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const MainboardEligibility = () => {
  return (
    <div className="min-h-screen gradient-hero">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-white/90">
            <CardHeader>
              <CardTitle className="text-2xl">Mainboard IPO Eligibility</CardTitle>
              <CardDescription>
                This is a placeholder. We will add detailed questions and validation soon.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Use the navigation to return to the dashboard or proceed with SME IPO assessment.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MainboardEligibility;





