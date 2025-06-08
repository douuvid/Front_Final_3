import React, { useState } from "react";
import { motion } from "framer-motion";
import OnboardingCard from "./OnboardingCard";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

interface OnboardingFlowProps {
  onComplete?: () => void;
}

const OnboardingFlow = ({ onComplete = () => {} }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [profession, setProfession] = useState("");
  const [salary, setSalary] = useState({ min: 0, desired: 0 });
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>([]);
  const [uploadedCV, setUploadedCV] = useState<File | null>(null);

  const steps = [
    {
      title: "Salut ! On commence ?",
      subtitle: "🏠 Tu cherches du boulot dans quelle zone ?",
      emoji: "👋",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-center mb-4">
            🏠 Tu cherches du boulot dans quelle zone ?
          </h3>
          <div className="space-y-3">
            {[
              { emoji: "🔥", city: "Paris", jobs: 1247 },
              { emoji: "🦁", city: "Lyon", jobs: 456 },
              { emoji: "☀️", city: "Marseille", jobs: 334 },
              { emoji: "🍺", city: "Lille", jobs: 189 },
              { emoji: "🌸", city: "Toulouse", jobs: 267 },
              { emoji: "🏰", city: "Nantes", jobs: 156 },
              { emoji: "🍷", city: "Bordeaux", jobs: 198 },
              { emoji: "📍", city: "Autre région", jobs: null },
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => setLocation(item.city)}
                className={`w-full text-left px-4 py-3 rounded-lg flex justify-between items-center transition-colors ${location === item.city ? "bg-primary/10 border border-primary/30" : "bg-background hover:bg-accent"}`}
              >
                <span>
                  <span className="mr-2">{item.emoji}</span>
                  <span className="font-medium">{item.city}</span>
                </span>
                {item.jobs && (
                  <span className="text-sm text-muted-foreground">
                    ({item.jobs} jobs dispo)
                  </span>
                )}
              </button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            💡 Plus c'est précis, plus on trouve des perles
          </p>
        </div>
      ),
    },
    {
      title: "Quel style de job tu veux ?",
      subtitle: "Choisis le type de contrat qui te convient",
      emoji: "💼",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-center mb-4">
            Choisis le type de contrat qui te convient
          </h3>
          <div className="space-y-4">
            {[
              {
                type: "CDI",
                description: "La sécurité avant tout",
                stats: "987 postes à Paris",
                badge: "🏆 Notre recommandation",
              },
              {
                type: "CDI + missions longues",
                description: "Plus de choix",
                stats: "+234 opportunités",
                badge: "Flexibilité garantie",
              },
              {
                type: "Tout prendre",
                description: "Mode opportuniste",
                stats: "+123 missions courtes",
                badge: "Maximum d'options",
              },
              {
                type: "Freelance",
                description: "Je gère ma vie",
                stats: "89 missions actives",
                badge: "Liberté totale",
              },
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => setJobType(item.type)}
                className={`w-full text-left p-4 rounded-lg transition-colors ${jobType === item.type ? "bg-primary/10 border border-primary/30" : "bg-background hover:bg-accent"}`}
              >
                <div className="flex justify-between">
                  <span className="font-medium">{item.type}</span>
                  {item.badge && (
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.stats}
                </p>
              </button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            💡 Plus c'est précis, plus on trouve des perles
          </p>
        </div>
      ),
    },
    {
      title: "Alors, c'est quoi ton métier ?",
      subtitle: "Dis-nous ce que tu recherches",
      emoji: "🎯",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-center mb-4">
            Dis-nous ce que tu recherches
          </h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Tape ton métier ici..."
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-input focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <span className="absolute right-3 top-3 text-lg">🔍</span>
          </div>

          <div className="space-y-4 mt-6">
            <h3 className="font-medium">
              🔥 TOP TECH (qui cartonnent à Paris)
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { role: "Dev Frontend", jobs: 89, salary: "48K€" },
                { role: "Dev Backend", jobs: 76, salary: "52K€" },
                { role: "Full Stack", jobs: 54, salary: "50K€" },
                { role: "DevOps", jobs: 43, salary: "55K€" },
                { role: "Data Scientist", jobs: 31, salary: "58K€" },
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => setProfession(item.role)}
                  className={`text-left p-3 rounded-lg text-sm transition-colors ${profession === item.role ? "bg-primary/10 border border-primary/30" : "bg-background hover:bg-accent"}`}
                >
                  <div className="font-medium">{item.role}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.jobs} jobs • {item.salary} moyenne
                  </div>
                </button>
              ))}
            </div>

            <h3 className="font-medium mt-4">
              🏢 BUSINESS (si tu préfères les costards)
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { role: "Commercial", jobs: 198 },
                { role: "Chef de projet", jobs: 76 },
                { role: "Marketing", jobs: 87 },
                { role: "RH", jobs: 45 },
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => setProfession(item.role)}
                  className={`text-left p-3 rounded-lg text-sm transition-colors ${profession === item.role ? "bg-primary/10 border border-primary/30" : "bg-background hover:bg-accent"}`}
                >
                  <div className="font-medium">{item.role}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.jobs} jobs
                  </div>
                </button>
              ))}
            </div>
          </div>

          {profession && (
            <p className="text-sm text-muted-foreground mt-4">
              💡 On a trouvé 89 jobs {profession} cette semaine !
            </p>
          )}
        </div>
      ),
    },
    {
      title: "Parlons salaire ! Tes attentes ?",
      subtitle: "Aide-nous à cibler les bonnes offres",
      emoji: "💰",
      content: (
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-center mb-4">
            Aide-nous à cibler les bonnes offres
          </h3>
          <div className="bg-accent/30 rounded-lg p-4 space-y-4">
            <h3 className="font-medium text-center">
              💼 Quelle est ta fourchette salariale ?
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Minimum acceptable
                </label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="42000"
                    value={salary.min || ""}
                    onChange={(e) =>
                      setSalary({
                        ...salary,
                        min: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 text-center rounded-lg border border-input focus:border-primary focus:ring-1 focus:ring-primary font-medium"
                  />
                  <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
                    €/an
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Objectif idéal
                </label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="55000"
                    value={salary.desired || ""}
                    onChange={(e) =>
                      setSalary({
                        ...salary,
                        desired: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 text-center rounded-lg border border-input focus:border-primary focus:ring-1 focus:ring-primary font-medium"
                  />
                  <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
                    €/an
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-accent/50 rounded-lg p-4 space-y-2">
            <h3 className="font-medium">
              📊 RÉALITÉ DU MARCHÉ - {profession || "Dev Frontend"}{" "}
              {location || "Paris"}
            </h3>
            <p className="text-sm">💹 Salaire moyen actuellement: 48 000€</p>
            <p className="text-sm">📈 80% des jobs sont entre: 40K€ et 58K€</p>
            <p className="text-sm">
              🎯 Ta demande:{" "}
              {salary.min && salary.desired
                ? "Très réaliste ! ✅"
                : "À définir"}
            </p>
            <p className="text-sm">
              💪{" "}
              {salary.min && salary.desired
                ? "89% des offres matchent avec tes critères"
                : "Définis tes attentes pour voir les matchs"}
            </p>
          </div>

          <div className="text-sm text-muted-foreground space-y-1">
            <p>🤐 Promis, on garde ça pour nous !</p>
            <p>⚙️ Tu pourras changer d'avis quand tu veux</p>
          </div>
        </div>
      ),
    },
    {
      title: "Ton CV, c'est ton super-pouvoir !",
      subtitle: "Dis-nous comment tu veux postuler",
      emoji: "📄",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-center mb-4">
            Dis-nous comment tu veux postuler
          </h3>
          <p className="text-sm">
            🎯 On va t'aider à postuler efficacement. Tu choisis comment !
          </p>

          <div className="space-y-3">
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
              <h3 className="font-medium flex items-center">
                📄 Upload ton CV
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                On l'utilisera pour postuler automatiquement
              </p>
              <div className="mt-3">
                <input
                  type="file"
                  id="cv-upload"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setUploadedCV(file);
                    }
                  }}
                  className="hidden"
                />
                <label
                  htmlFor="cv-upload"
                  className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium cursor-pointer hover:bg-primary/90 transition-colors"
                >
                  {uploadedCV ? `✅ ${uploadedCV.name}` : "Choisir un fichier"}
                </label>
                {uploadedCV && (
                  <div className="mt-2 flex items-center text-sm text-green-600">
                    <span className="mr-1">✅</span>
                    <span>CV uploadé avec succès !</span>
                    <button
                      onClick={() => setUploadedCV(null)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      ❌
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-accent/30 rounded-lg p-4">
            <h3 className="font-medium">🚀 COMMENT ÇA MARCHE</h3>
            <ul className="text-sm space-y-1 mt-2">
              <li>• On trouve les jobs qui te correspondent</li>
              <li>• Tu valides ceux qui t'intéressent</li>
              <li>• On postule avec ton CV automatiquement</li>
              <li>• Tu reçois les réponses directement</li>
            </ul>
          </div>

          <p className="text-sm text-muted-foreground">
            💡 Simple, efficace, et tu gardes le contrôle !
          </p>
        </div>
      ),
    },
    {
      title: "Notre IA prépare ton profil...",
      subtitle: "On analyse tes infos pour te trouver les meilleurs jobs !",
      emoji: "🤖",
      content: (
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-center mb-4">
            On analyse tes infos pour te trouver les meilleurs jobs !
          </h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="text-green-600 mr-2">✅</span>
              <span>Localisation: {location || "Paris"} - Parfait !</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-600 mr-2">✅</span>
              <span>Métier: {profession || "Dev Frontend"} - Nickel !</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-600 mr-2">✅</span>
              <span>
                Salaire: {salary.min}-{salary.desired}K€ - Top !
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-blue-600 mr-2">🔄</span>
              <span>Recherche des jobs parfaits en cours...</span>
            </div>
          </div>

          <div className="bg-accent/50 rounded-lg p-4 space-y-3">
            <h3 className="font-medium">📋 TON PROFIL</h3>
            <ul className="text-sm space-y-1">
              <li>• Métier: {profession || "Dev Frontend"} ✅</li>
              <li>• Zone: {location || "Paris"} ✅</li>
              <li>• Type: {jobType || "CDI"} ✅</li>
              <li>
                • Salaire: {salary.min || 40}-{salary.desired || 55}K€ ✅
              </li>
            </ul>
          </div>

          <div className="bg-accent/50 rounded-lg p-4 space-y-3">
            <h3 className="font-medium">🧠 NOTRE IA FAIT SON TRAVAIL</h3>
            <ul className="text-sm space-y-1">
              <li>• Analyse du marché pour ton profil</li>
              <li>• Recherche des entreprises qui recrutent</li>
              <li>• Vérification des salaires du marché</li>
              <li>• Préparation de tes candidatures</li>
            </ul>
          </div>

          <div className="text-center">
            <p className="text-sm">🎯 C'est bon, on y est presque !</p>
            <Progress value={85} className="mt-2" />
          </div>

          <p className="text-sm text-muted-foreground">
            💡 On optimise tout pour que tu cartonnes !
          </p>
        </div>
      ),
    },
    {
      title: "Dernière étape ! Ton profil est au top",
      subtitle: "Crée ton compte pour commencer",
      emoji: "🎉",
      content: (
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-center mb-4">
            Crée ton compte pour commencer
          </h3>
          <div className="bg-green-50 text-green-800 rounded-lg p-4">
            <p className="font-medium">
              ✅ 76 jobs parfaits pour toi identifiés !
            </p>
            <p className="text-sm">
              💰 Tous dans ta fourchette {salary.min}-{salary.desired}K€ • Bingo
              !
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">📧 Ton email</label>
              <input
                type="email"
                placeholder="john.doe@email.com"
                className="w-full px-4 py-3 rounded-lg border border-input focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">
                🔒 Un mot de passe costaud
              </label>
              <input
                type="password"
                placeholder="********"
                className="w-full px-4 py-3 rounded-lg border border-input focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">
                📱 Ton numéro (pour les alertes importantes)
              </label>
              <input
                type="tel"
                placeholder="06 12 34 56 78"
                className="w-full px-4 py-3 rounded-lg border border-input focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="terms" className="mr-2" />
              <label htmlFor="terms" className="text-sm">
                ✅ OK pour les conditions d'utilisation
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="alerts"
                className="mr-2"
                defaultChecked
              />
              <label htmlFor="alerts" className="text-sm">
                ✅ Alerte email pour les nouveaux jobs
              </label>
            </div>
          </div>

          <div className="bg-accent/50 rounded-lg p-4 space-y-2">
            <h3 className="font-medium">🎁 7 JOURS GRATUITS POUR TESTER</h3>
            <p className="text-sm">
              Plan PRO (15 candidatures/jour) puis 19€/mois
            </p>
            <p className="text-sm">🚪 Tu peux partir quand tu veux, 1 clic</p>
          </div>

          <div className="text-center">
            <Button
              onClick={onComplete}
              className="w-full py-6 text-base font-medium"
            >
              🚀 CRÉER MON COMPTE & C'EST PARTI !
            </Button>
            <p className="text-sm mt-4">
              Tu as déjà un compte ?{" "}
              <a href="#" className="text-primary hover:underline">
                Se connecter ici
              </a>
            </p>
          </div>
        </div>
      ),
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return location !== "";
      case 1:
        return jobType !== "";
      case 2:
        return profession !== "";
      case 3:
        return salary.min > 0 && salary.desired > 0;
      case 4:
        return uploadedCV !== null;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <OnboardingCard
          title={steps[currentStep].title}
          emoji={steps[currentStep].emoji}
          currentStep={currentStep + 1}
          totalSteps={steps.length}
          onNext={canProceed() ? nextStep : undefined}
          onBack={currentStep > 0 ? prevStep : undefined}
          showBackButton={currentStep > 0}
          nextButtonText={
            currentStep === steps.length - 1 ? "Terminer" : "Suivant →"
          }
        >
          {steps[currentStep].content}
        </OnboardingCard>
      </motion.div>
    </div>
  );
};

export default OnboardingFlow;
