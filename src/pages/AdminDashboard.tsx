import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAssessmentResponses, type AssessmentResponse } from "@/lib/supabase";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'mainboard' | 'sme'>('all');

  useEffect(() => {
    fetchResponses();
  }, [filter]);

  const fetchResponses = async () => {
    try {
      setLoading(true);
      const data = await getAssessmentResponses(filter === 'all' ? undefined : filter);
      setResponses(data || []);
    } catch (error) {
      console.error('Failed to fetch responses:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const csvData = responses.map(response => ({
      'Assessment Type': response.assessment_type,
      'Name': response.user_name,
      'Email': response.user_email,
      'Phone': response.user_phone || '',
      'Total Score': response.total_score,
      'Readiness Score': response.readiness_score,
      'Readiness Label': response.readiness_label,
      'Created At': new Date(response.created_at || '').toLocaleString(),
      'Responses': JSON.stringify(response.responses)
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `assessment-responses-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getReadinessBadgeColor = (label: string) => {
    switch (label) {
      case 'High Readiness':
        return 'bg-green-100 text-green-800';
      case 'Good Readiness':
        return 'bg-blue-100 text-blue-800';
      case 'Moderate Readiness':
        return 'bg-yellow-100 text-yellow-800';
      case 'Basic Readiness':
        return 'bg-orange-100 text-orange-800';
      case 'Needs Improvement':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/')} className="text-evernile-navy hover:text-evernile-navy/80">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div className="h-6 border-l border-gray-300" />
              <div className="flex flex-col items-center">
                <div className="text-xl font-bold text-evernile-navy">EVERNILE</div>
                <div className="flex items-center gap-2">
                  <div className="h-0.5 w-6 bg-evernile-red"></div>
                  <div className="text-xs text-evernile-navy">CAPITAL</div>
                  <div className="h-0.5 w-6 bg-evernile-red"></div>
                </div>
              </div>
            </div>
            <div className="text-lg font-semibold text-evernile-navy">
              Assessment Responses Dashboard
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
                size="sm"
              >
                All ({responses.length})
              </Button>
              <Button
                variant={filter === 'mainboard' ? 'default' : 'outline'}
                onClick={() => setFilter('mainboard')}
                size="sm"
              >
                Mainboard
              </Button>
              <Button
                variant={filter === 'sme' ? 'default' : 'outline'}
                onClick={() => setFilter('sme')}
                size="sm"
              >
                SME
              </Button>
            </div>
            <Button onClick={exportToCSV} className="bg-evernile-navy text-white">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{responses.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Mainboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {responses.filter(r => r.assessment_type === 'mainboard').length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">SME</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {responses.filter(r => r.assessment_type === 'sme').length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">High Readiness</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {responses.filter(r => r.readiness_label === 'High Readiness').length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Responses Table */}
          <Card>
            <CardHeader>
              <CardTitle>Assessment Responses</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : responses.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No responses found</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Name</th>
                        <th className="text-left py-2">Email</th>
                        <th className="text-left py-2">Type</th>
                        <th className="text-left py-2">Score</th>
                        <th className="text-left py-2">Readiness</th>
                        <th className="text-left py-2">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {responses.map((response) => (
                        <tr key={response.id} className="border-b hover:bg-gray-50">
                          <td className="py-2">{response.user_name}</td>
                          <td className="py-2">{response.user_email}</td>
                          <td className="py-2">
                            <Badge variant="outline">
                              {response.assessment_type.toUpperCase()}
                            </Badge>
                          </td>
                          <td className="py-2">{response.total_score}</td>
                          <td className="py-2">
                            <Badge className={getReadinessBadgeColor(response.readiness_label)}>
                              {response.readiness_label}
                            </Badge>
                          </td>
                          <td className="py-2">
                            {new Date(response.created_at || '').toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
