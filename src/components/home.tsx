import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OnboardingFlow from "./onboarding/OnboardingFlow";
import Dashboard from "./dashboard/Dashboard";

interface HomeProps {
  isAuthenticated?: boolean;
}

const Home: React.FC<HomeProps> = ({ isAuthenticated = false }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userAuthenticated, setUserAuthenticated] = useState(isAuthenticated);
  const navigate = useNavigate();

  // Simulate checking authentication status
  useEffect(() => {
    const checkAuthStatus = async () => {
      // In a real app, this would check with your auth provider
      // For now, we'll just use the prop or localStorage
      const storedAuthStatus =
        localStorage.getItem("isAuthenticated") === "true";
      setUserAuthenticated(isAuthenticated || storedAuthStatus);
      setIsLoading(false);
    };

    // Simulate network delay
    const timer = setTimeout(() => {
      checkAuthStatus();
    }, 1000);

    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Card className="w-[300px] shadow-lg">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Chargement de votre expérience...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // For demo purposes, add a way to toggle between onboarding and dashboard
  const toggleAuthStatus = () => {
    const newStatus = !userAuthenticated;
    setUserAuthenticated(newStatus);
    localStorage.setItem("isAuthenticated", newStatus.toString());
  };

  return (
    <div className="min-h-screen w-full bg-background">
      {userAuthenticated ? (
        <>
          <Dashboard />
          {/* Demo toggle button - would be removed in production */}
          <div className="fixed bottom-4 right-4">
            <Button variant="outline" size="sm" onClick={toggleAuthStatus}>
              Déconnexion (Demo)
            </Button>
          </div>
        </>
      ) : (
        <>
          <OnboardingFlow onComplete={() => setUserAuthenticated(true)} />
          {/* Demo toggle button - would be removed in production */}
          <div className="fixed bottom-4 right-4">
            <Button variant="outline" size="sm" onClick={toggleAuthStatus}>
              Passer l'onboarding (Demo)
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
