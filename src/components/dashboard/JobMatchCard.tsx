import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Clock, Building2, MapPin, Briefcase } from "lucide-react";

interface JobMatchCardProps {
  company?: string;
  position?: string;
  salary?: string;
  location?: string;
  matchPercentage?: number;
  timePosted?: string;
  isTimeSensitive?: boolean;
  jobType?: string;
  logoUrl?: string;
}

const JobMatchCard = ({
  company = "Google France",
  position = "Senior React Developer",
  salary = "52K€",
  location = "Paris",
  matchPercentage = 98,
  timePosted = "47min",
  isTimeSensitive = true,
  jobType = "CDI",
  logoUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=google",
}: JobMatchCardProps) => {
  // Determine match quality color based on percentage
  const getMatchColor = () => {
    if (matchPercentage >= 90) return "bg-green-500";
    if (matchPercentage >= 75) return "bg-yellow-500";
    return "bg-blue-500";
  };

  return (
    <Card className="w-full max-w-[350px] h-[180px] overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white">
      <CardHeader className="p-3 pb-0 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-100">
            <img
              src={logoUrl}
              alt={company}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-sm">{company}</h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{timePosted} ago</span>
              {isTimeSensitive && (
                <Badge variant="destructive" className="text-[10px] h-4 px-1">
                  HOT
                </Badge>
              )}
            </div>
          </div>
        </div>
        <Badge className="bg-primary">{matchPercentage}% match</Badge>
      </CardHeader>

      <CardContent className="p-3 pt-2">
        <h4 className="font-bold text-base mb-1">{position}</h4>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Building2 className="h-3 w-3" />
            <span>{company}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Briefcase className="h-3 w-3" />
            <span>
              {jobType} • {salary}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-3 pt-0 flex justify-between items-center">
        <div className="w-full">
          <div className="flex justify-between text-xs mb-1">
            <span>Match quality</span>
            <span className="font-medium">{matchPercentage}%</span>
          </div>
          <div className="flex gap-2 items-center">
            <Progress value={matchPercentage} className="h-1.5" />
            <Button size="sm" className="h-7 text-xs">
              Apply
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default JobMatchCard;
