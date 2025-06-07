import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  Settings,
  BarChart2,
  PauseCircle,
  ChevronRight,
} from "lucide-react";
import JobMatchCard from "./JobMatchCard";

interface DashboardProps {
  userName?: string;
  quotaUsed?: number;
  quotaTotal?: number;
  quotaResetTime?: string;
  newJobsCount?: number;
  candidaturesSent?: number;
  matchingRate?: number;
  averageSalary?: string;
  nextSearchTime?: string;
  featuredJobs?: Array<{
    id: string;
    company: string;
    position: string;
    salary: string;
    matchPercentage: number;
    postedTime: string;
  }>;
}

const Dashboard = ({
  userName = "John",
  quotaUsed = 12,
  quotaTotal = 15,
  quotaResetTime = "demain à 9h",
  newJobsCount = 14,
  candidaturesSent = 12,
  matchingRate = 89,
  averageSalary = "48K€",
  nextSearchTime = "23 min",
  featuredJobs = [
    {
      id: "1",
      company: "GOOGLE France",
      position: "Senior React",
      salary: "52K€",
      matchPercentage: 98,
      postedTime: "47min",
    },
    {
      id: "2",
      company: "SPOTIFY",
      position: "Frontend Lead",
      salary: "55K€",
      matchPercentage: 96,
      postedTime: "1h23",
    },
    {
      id: "3",
      company: "AIRBNB",
      position: "Senior React",
      salary: "54K€",
      matchPercentage: 98,
      postedTime: "47min",
    },
    {
      id: "4",
      company: "BLABLACAR",
      position: "Frontend Lead",
      salary: "53K€",
      matchPercentage: 96,
      postedTime: "1h23",
    },
  ],
}: DashboardProps) => {
  const progressPercentage = (quotaUsed / quotaTotal) * 100;

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold mb-1">
            🌅 Salut {userName} ! Ça a bossé cette nuit !
          </h1>
          <p className="text-gray-500">
            Voici ton tableau de bord pour aujourd'hui
          </p>
        </div>

        {/* Quota Card */}
        <Card>
          <CardHeader>
            <CardTitle>🎯 TON SCORE DU JOUR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">
                  📨 CANDIDATURES: {quotaUsed}/{quotaTotal}
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <ul className="text-sm text-gray-600 space-y-1 mt-2">
                <li>
                  •{" "}
                  {quotaUsed === quotaTotal
                    ? "PERFECT ! Objectif éclaté 🎯"
                    : `Super début ! ${quotaTotal - quotaUsed} slots pour finir en beauté`}
                </li>
                <li>• Reset {quotaResetTime}</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle>🎉 PENDANT QUE TU DORMAIS (22h → 7h)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                • 🆕 {newJobsCount} nouveaux jobs Frontend repérés
              </li>
              <li className="flex items-center">
                • ✅ {candidaturesSent} candidatures envoyées (que du bon
                match!)
              </li>
              <li className="flex items-center">
                • 💰 Tous dans ta fourchette 42-55K€
              </li>
            </ul>
            <div className="flex items-center mt-4 text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>Prochaine recherche dans {nextSearchTime}</span>
            </div>
          </CardContent>
        </Card>

        {/* Featured Jobs */}
        <Card>
          <CardHeader>
            <CardTitle>🔥 PÉPITES DU JOUR</CardTitle>
            <CardDescription>
              <Badge variant="secondary" className="mr-2">
                ⭐ {featuredJobs.length} jobs "MATCH PARFAIT" repérés
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {featuredJobs.slice(0, 2).map((job) => (
                <JobMatchCard
                  key={job.id}
                  company={job.company}
                  position={job.position}
                  salary={job.salary}
                  matchPercentage={job.matchPercentage}
                  postedTime={job.postedTime}
                />
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4">
            <Button variant="outline" className="w-full md:w-auto">
              Voir toutes les pépites
            </Button>
          </CardFooter>
        </Card>

        {/* Daily Stats Summary */}
        <Card>
          <CardHeader>
            <CardTitle>📈 MATINÉE DE FEU !</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Candidatures</span>
                  <span className="font-medium">
                    +{candidaturesSent} au total
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taux de matching</span>
                  <span className="font-medium">
                    {matchingRate}% (tu es en feu!)
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Offres traitées</span>
                  <span className="font-medium">100%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Salaire moyen visé</span>
                  <span className="font-medium">
                    {averageSalary} (pile dans tes cordes)
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500 flex items-center">
              <span className="mr-1">💡</span>
              <span>Objectif complet estimé: vers 15h30</span>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            Mon activité
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => (window.location.href = "/stats")}
          >
            <BarChart2 className="h-4 w-4" />
            Mes stats
          </Button>
          <Button variant="secondary" className="flex items-center gap-2">
            <PauseCircle className="h-4 w-4" />
            Faire une pause
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Réglages
          </Button>
        </div>

        {/* Tabs for Additional Content */}
        <Tabs defaultValue="jobs" className="mt-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="jobs">Mes jobs</TabsTrigger>
            <TabsTrigger value="applications">Candidatures</TabsTrigger>
            <TabsTrigger value="settings">Préférences</TabsTrigger>
          </TabsList>
          <TabsContent value="jobs" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Tous mes jobs</CardTitle>
                <CardDescription>
                  Découvre tous les jobs qui correspondent à ton profil
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {featuredJobs.map((job) => (
                    <JobMatchCard
                      key={job.id}
                      company={job.company}
                      position={job.position}
                      salary={job.salary}
                      matchPercentage={job.matchPercentage}
                      postedTime={job.postedTime}
                    />
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button
                  variant="outline"
                  className="w-full md:w-auto flex items-center gap-1"
                >
                  Voir plus de jobs
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="applications" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Mes candidatures</CardTitle>
                <CardDescription>
                  Suivi de tes candidatures envoyées
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-gray-500">
                  Tu as envoyé {candidaturesSent} candidatures aujourd'hui
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Mes préférences</CardTitle>
                <CardDescription>Personnalise ton expérience</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-gray-500">
                  Ajuste tes critères de recherche et notifications
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
