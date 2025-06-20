import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

interface OnboardingCardProps {
  title: string;
  subtitle?: string;
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
  subtitle,
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
    <Card className="w-full max-w-[500px] bg-white/98 backdrop-blur-md shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25)] rounded-[32px] border border-gray-200/30">
      <CardHeader className="pb-6 pt-10">
        <div className="text-center mb-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-2xl">{emoji}</span>
          </div>
        </div>
        <CardTitle className="text-2xl font-semibold text-center text-gray-900 leading-tight">
          {title}
        </CardTitle>
        {subtitle && (
          <p className="text-base text-gray-600 text-center mt-4 font-medium leading-relaxed">
            {subtitle}
          </p>
        )}
      </CardHeader>

      <CardContent className="px-8 py-6">{children}</CardContent>

      <CardFooter className="flex justify-between px-8 pb-10 pt-6">
        {showBackButton && currentStep > 1 ? (
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100/80 rounded-2xl px-6 py-3 font-medium transition-all duration-300 border border-gray-200/50 hover:border-gray-300/50"
          >
            {backButtonText}
          </Button>
        ) : (
          <div></div>
        )}

        <Button
          onClick={onNext}
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-2xl px-8 py-3 font-semibold shadow-[0_8px_32px_-4px_rgba(99,102,241,0.4)] hover:shadow-[0_12px_40px_-4px_rgba(99,102,241,0.5)] transition-all duration-300 border-0 transform hover:scale-[1.02]"
        >
          {nextButtonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OnboardingCard;
