import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Calendar,
  Target,
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
} from "lucide-react";

interface StatsProps {
  totalApplications?: number;
  responseRate?: number;
  averageResponseTime?: number;
  matchedOffers?: number;
  successfulApplications?: number;
  rejectedApplications?: number;
  pendingApplications?: number;
  monthlyData?: Array<{
    month: string;
    applications: number;
    responses: number;
    matches: number;
  }>;
  recentApplications?: Array<{
    id: string;
    company: string;
    position: string;
    date: string;
    status: "pending" | "accepted" | "rejected" | "interview";
    responseTime?: number;
  }>;
}

const Stats = ({
  totalApplications = 127,
  responseRate = 34,
  averageResponseTime = 5.2,
  matchedOffers = 89,
  successfulApplications = 23,
  rejectedApplications = 45,
  pendingApplications = 59,
  monthlyData = [
    { month: "Jan", applications: 15, responses: 6, matches: 12 },
    { month: "Fév", applications: 22, responses: 8, matches: 18 },
    { month: "Mar", applications: 28, responses: 12, matches: 24 },
    { month: "Avr", applications: 35, responses: 15, matches: 28 },
    { month: "Mai", applications: 27, responses: 9, matches: 22 },
  ],
  recentApplications = [
    {
      id: "1",
      company: "Google France",
      position: "Senior React Developer",
      date: "2024-01-15",
      status: "interview",
      responseTime: 3,
    },
    {
      id: "2",
      company: "Spotify",
      position: "Frontend Lead",
      date: "2024-01-14",
      status: "pending",
    },
    {
      id: "3",
      company: "Airbnb",
      position: "Senior React Developer",
      date: "2024-01-13",
      status: "rejected",
      responseTime: 7,
    },
    {
      id: "4",
      company: "BlaBlacar",
      position: "Frontend Developer",
      date: "2024-01-12",
      status: "accepted",
      responseTime: 2,
    },
    {
      id: "5",
      company: "Deezer",
      position: "React Developer",
      date: "2024-01-11",
      status: "pending",
    },
  ],
}: StatsProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return (
          <Badge className="bg-green-100 text-green-800">✅ Accepté</Badge>
        );
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">❌ Refusé</Badge>;
      case "interview":
        return (
          <Badge className="bg-blue-100 text-blue-800">🎯 Entretien</Badge>
        );
      case "pending":
      default:
        return (
          <Badge className="bg-yellow-100 text-yellow-800">⏳ En attente</Badge>
        );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              📊 Mes Statistiques Détaillées
            </h1>
            <p className="text-gray-500">
              Analyse complète de tes candidatures et performances
            </p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                📨 Total Candidatures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalApplications}</div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12% ce mois
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                📈 Taux de Réponse
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{responseRate}%</div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                +5% ce mois
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                ⏱️ Temps Moyen Réponse
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {averageResponseTime} jours
              </div>
              <div className="flex items-center text-sm text-red-600">
                <TrendingDown className="h-4 w-4 mr-1" />
                -0.8j ce mois
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                🎯 Offres Matchées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{matchedOffers}</div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                +8% ce mois
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle>🎯 Vue d'ensemble des Performances</CardTitle>
            <CardDescription>
              Répartition de tes candidatures par statut
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Acceptées</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{successfulApplications}</span>
                  <Progress
                    value={(successfulApplications / totalApplications) * 100}
                    className="w-20"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <span>Refusées</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{rejectedApplications}</span>
                  <Progress
                    value={(rejectedApplications / totalApplications) * 100}
                    className="w-20"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <span>En attente</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{pendingApplications}</span>
                  <Progress
                    value={(pendingApplications / totalApplications) * 100}
                    className="w-20"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for detailed views */}
        <Tabs defaultValue="history" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="history">📋 Historique</TabsTrigger>
            <TabsTrigger value="monthly">📊 Évolution Mensuelle</TabsTrigger>
            <TabsTrigger value="companies">🏢 Entreprises</TabsTrigger>
          </TabsList>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>📋 Historique des Candidatures</CardTitle>
                <CardDescription>
                  Toutes tes candidatures récentes avec leur statut
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.map((application) => (
                    <div
                      key={application.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{application.company}</div>
                        <div className="text-sm text-gray-600">
                          {application.position}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(application.date)}
                          {application.responseTime && (
                            <>
                              <Separator
                                orientation="vertical"
                                className="h-3"
                              />
                              <Clock className="h-3 w-3" />
                              Réponse en {application.responseTime}j
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(application.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly">
            <Card>
              <CardHeader>
                <CardTitle>📊 Évolution Mensuelle</CardTitle>
                <CardDescription>
                  Suivi de tes performances mois par mois
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {monthlyData.map((month) => (
                    <div key={month.month} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{month.month} 2024</span>
                        <span className="text-sm text-gray-500">
                          {month.applications} candidatures
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-medium text-blue-600">
                            {month.applications}
                          </div>
                          <div className="text-gray-500">Candidatures</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-green-600">
                            {month.responses}
                          </div>
                          <div className="text-gray-500">Réponses</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-purple-600">
                            {month.matches}
                          </div>
                          <div className="text-gray-500">Matches</div>
                        </div>
                      </div>
                      <Progress
                        value={(month.responses / month.applications) * 100}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="companies">
            <Card>
              <CardHeader>
                <CardTitle>🏢 Top Entreprises</CardTitle>
                <CardDescription>
                  Entreprises avec le meilleur taux de réponse
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">Google France</div>
                      <div className="text-sm text-gray-600">
                        3 candidatures
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-600">100%</div>
                      <div className="text-xs text-gray-500">Taux réponse</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">Spotify</div>
                      <div className="text-sm text-gray-600">
                        2 candidatures
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-600">50%</div>
                      <div className="text-xs text-gray-500">Taux réponse</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">Airbnb</div>
                      <div className="text-sm text-gray-600">
                        4 candidatures
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-yellow-600">25%</div>
                      <div className="text-xs text-gray-500">Taux réponse</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Stats;
