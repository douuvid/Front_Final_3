import React, { useState, useEffect } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Clock,
  Settings,
  BarChart2,
  PauseCircle,
  ChevronRight,
  CheckCircle,
  Target,
  TrendingUp,
  Zap,
  Coffee,
  Star,
} from "lucide-react";
import JobMatchCard from "./JobMatchCard";

interface SentApplication {
  id: string;
  company: string;
  position: string;
  description: string;
  sentDate: string;
  platform: string;
  status: "sent" | "viewed" | "replied" | "rejected";
}

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
  sentApplications?: SentApplication[];
  featuredJobs?: Array<{
    id: string;
    company: string;
    position: string;
    salary: string;
    matchPercentage: number;
    postedTime: string;
  }>;
  userLevel?: "beginner" | "active" | "expert";
  timeOfDay?: "morning" | "afternoon" | "evening";
  isFirstLogin?: boolean;
}

type DashboardVariant = "welcome" | "active" | "completed" | "paused";

interface DashboardState {
  variant: DashboardVariant;
  primaryAction: string;
  mood: string;
  focusArea: "quota" | "matches" | "stats" | "settings";
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
  userLevel = "active",
  timeOfDay = "morning",
  isFirstLogin = false,
  sentApplications = [
    {
      id: "1",
      company: "Google France",
      position: "Senior React Developer",
      description:
        "Nous recherchons un développeur React senior pour rejoindre notre équipe parisienne. Vous travaillerez sur des projets innovants avec les dernières technologies.",
      sentDate: "2024-01-15",
      platform: "LinkedIn",
      status: "viewed",
    },
    {
      id: "2",
      company: "Spotify",
      position: "Frontend Lead",
      description:
        "Poste de lead frontend pour diriger une équipe de 5 développeurs. Expertise en React, TypeScript et architecture frontend requise.",
      sentDate: "2024-01-14",
      platform: "Indeed",
      status: "sent",
    },
    {
      id: "3",
      company: "Airbnb",
      position: "Senior React Developer",
      description:
        "Développeur senior pour travailler sur la plateforme de réservation. Stack moderne avec React, Next.js et GraphQL.",
      sentDate: "2024-01-13",
      platform: "Welcome to the Jungle",
      status: "replied",
    },
    {
      id: "4",
      company: "BlaBlaCar",
      position: "Frontend Engineer",
      description:
        "Ingénieur frontend pour développer les nouvelles fonctionnalités de covoiturage. Environnement agile et international.",
      sentDate: "2024-01-12",
      platform: "LinkedIn",
      status: "sent",
    },
  ],
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
  const [dashboardState, setDashboardState] = useState<DashboardState>({
    variant: "active",
    primaryAction: "Voir les matches",
    mood: "🌅",
    focusArea: "quota",
  });

  const progressPercentage = (quotaUsed / quotaTotal) * 100;
  const isQuotaComplete = quotaUsed >= quotaTotal;
  const isHighPerformer = matchingRate >= 85;
  const hasNewMatches = newJobsCount > 0;

  // Dynamic state calculation
  useEffect(() => {
    const calculateDashboardState = (): DashboardState => {
      // Determine variant based on user progress and context
      let variant: DashboardVariant = "active";
      let primaryAction = "Voir les matches";
      let mood = "🌅";
      let focusArea: "quota" | "matches" | "stats" | "settings" = "quota";

      if (isFirstLogin) {
        variant = "welcome";
        primaryAction = "Commencer ma recherche";
        mood = "👋";
        focusArea = "quota";
      } else if (isQuotaComplete) {
        variant = "completed";
        primaryAction = "Voir mes candidatures";
        mood = "🎯";
        focusArea = "stats";
      } else if (hasNewMatches && isHighPerformer) {
        variant = "active";
        primaryAction = "Voir les pépites";
        mood = "🔥";
        focusArea = "matches";
      } else if (quotaUsed === 0) {
        variant = "paused";
        primaryAction = "Reprendre la recherche";
        mood = "☕";
        focusArea = "settings";
      }

      // Adjust mood based on time of day
      if (timeOfDay === "morning") mood = variant === "completed" ? "🎯" : "🌅";
      else if (timeOfDay === "afternoon")
        mood = variant === "active" ? "⚡" : "☀️";
      else mood = variant === "completed" ? "🌟" : "🌙";

      return { variant, primaryAction, mood, focusArea };
    };

    setDashboardState(calculateDashboardState());
  }, [
    quotaUsed,
    quotaTotal,
    isFirstLogin,
    newJobsCount,
    matchingRate,
    timeOfDay,
  ]);

  // Dynamic content based on state
  const getGreeting = () => {
    const greetings = {
      welcome: `${dashboardState.mood} Bienvenue ${userName} ! Prêt à décrocher ton job de rêve ?`,
      active: `${dashboardState.mood} Salut ${userName} ! ${timeOfDay === "morning" ? "Ça a bossé cette nuit !" : "On continue sur ta lancée !"}`,
      completed: `${dashboardState.mood} Bravo ${userName} ! Objectif du jour atteint !`,
      paused: `${dashboardState.mood} Re ${userName} ! Prêt à reprendre la chasse ?`,
    };
    return greetings[dashboardState.variant];
  };

  const getSubtitle = () => {
    const subtitles = {
      welcome: "Configurons ensemble ta stratégie de recherche",
      active: "Voici ton tableau de bord pour aujourd'hui",
      completed: "Tu peux te détendre, on s'occupe du reste",
      paused: "Reprends là où tu t'es arrêté",
    };
    return subtitles[dashboardState.variant];
  };

  const getPriorityCards = () => {
    switch (dashboardState.focusArea) {
      case "matches":
        return ["matches", "quota", "stats"];
      case "stats":
        return ["stats", "matches", "quota"];
      case "settings":
        return ["quota", "settings", "matches"];
      default:
        return ["quota", "matches", "stats"];
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">{getGreeting()}</h1>
          <p className="text-gray-600">{getSubtitle()}</p>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quota Card */}
          <Card className="bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5 text-blue-600" />
                Quota du jour
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Candidatures envoyées</span>
                  <span className="font-medium">
                    {quotaUsed}/{quotaTotal}
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
              <div className="text-xs text-gray-500">
                Renouvellement: {quotaResetTime}
              </div>
              {isQuotaComplete && (
                <Badge variant="secondary" className="w-full justify-center">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Objectif atteint !
                </Badge>
              )}
            </CardContent>
          </Card>

          {/* New Matches Card */}
          <Card className="bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="h-5 w-5 text-yellow-600" />
                Nouveaux matches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {newJobsCount}
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Offres qui correspondent à ton profil
              </p>
              <Button className="w-full" size="sm">
                {dashboardState.primaryAction}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>

          {/* Performance Card */}
          <Card className="bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Taux de match</span>
                <span className="font-bold text-green-600">
                  {matchingRate}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Salaire moyen</span>
                <span className="font-bold">{averageSalary}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Prochaine recherche
                </span>
                <span className="font-medium text-blue-600">
                  {nextSearchTime}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sent Applications Section */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-purple-600" />
              Candidatures envoyées ({sentApplications.length})
            </CardTitle>
            <CardDescription>
              Suivi de tes candidatures récentes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Poste</TableHead>
                  <TableHead>Entreprise</TableHead>
                  <TableHead>Date d'envoi</TableHead>
                  <TableHead>Plateforme</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sentApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">
                      {application.position}
                    </TableCell>
                    <TableCell>{application.company}</TableCell>
                    <TableCell>
                      {new Date(application.sentDate).toLocaleDateString(
                        "fr-FR",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        },
                      )}
                    </TableCell>
                    <TableCell>{application.platform}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          application.status === "replied"
                            ? "default"
                            : application.status === "viewed"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {application.status === "sent" && "Envoyée"}
                        {application.status === "viewed" && "Vue"}
                        {application.status === "replied" && "Réponse"}
                        {application.status === "rejected" && "Refusée"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Featured Jobs */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-600" />
              Offres recommandées
            </CardTitle>
            <CardDescription>
              Les meilleures opportunités pour toi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
