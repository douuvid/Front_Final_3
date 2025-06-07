import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

interface OnboardingCardProps {
  title: string;
  currentStep: number;
  totalSteps: number;
  onNext?: () => void;
  onBack?: () => void;
  showBackButton?: boolean;
  nextButtonText?: string;
  backButtonText?: string;
  emoji?: string;
  children: React.ReactNode;
}

const OnboardingCard = ({
  title,
  currentStep,
  totalSteps,
  onNext,
  onBack,
  showBackButton = true,
  nextButtonText = "Suivant →",
  backButtonText = "← Retour",
  emoji = "👋",
  children,
}: OnboardingCardProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <Card className="w-full max-w-[500px] bg-white shadow-lg rounded-xl border-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium text-center flex items-center justify-center gap-2">
          <span className="text-2xl">{emoji}</span> {title}
        </CardTitle>
        <div className="mt-2">
          <Progress value={progress} className="h-1" />
          <p className="text-xs text-muted-foreground text-right mt-1">
            Étape {currentStep} sur {totalSteps}
          </p>
        </div>
      </CardHeader>

      <CardContent className="py-4">{children}</CardContent>

      <CardFooter className="flex justify-between pt-2">
        {showBackButton && currentStep > 1 ? (
          <Button variant="ghost" onClick={onBack} className="text-sm">
            {backButtonText}
          </Button>
        ) : (
          <div></div>
        )}

        <Button
          onClick={onNext}
          className="text-sm bg-primary hover:bg-primary/90"
        >
          {nextButtonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OnboardingCard;
