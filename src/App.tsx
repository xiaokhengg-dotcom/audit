/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { AnimatePresence } from "motion/react";
import LandingPage from "./components/LandingPage";
import BusinessInfoStep from "./components/BusinessInfoStep";
import QuickAuditQuiz from "./components/QuickAuditQuiz";
import ResultsPage from "./components/ResultsPage";
import { Step, BusinessInfo, Answer } from "./types";
import { ShieldCheck } from "lucide-react";

import { Toaster } from "@/components/ui/sonner";
import { Badge } from "@/components/ui/badge";

export default function App() {
  const [currentStep, setCurrentStep] = useState<Step>(Step.Landing);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const handleStart = () => {
    setCurrentStep(Step.BusinessInfo);
  };

  const handleInfoSubmit = (info: BusinessInfo) => {
    setBusinessInfo(info);
    setCurrentStep(Step.Quiz);
  };

  const handleQuizComplete = (quizAnswers: Answer[]) => {
    setAnswers(quizAnswers);
    setCurrentStep(Step.Results);
  };

  const handleRestart = () => {
    setAnswers([]);
    setBusinessInfo(null);
    setCurrentStep(Step.Landing);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/10 selection:text-primary">
      <Toaster />
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 px-6 py-4 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={handleRestart} role="button">
            <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
              <ShieldCheck className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-black text-foreground text-xl tracking-tighter">AUDIT<span className="text-primary italic">TOOL</span></span>
          </div>
          <div className="hidden md:flex items-center gap-4">
             <Badge variant="secondary" className="font-bold tracking-wider rounded-full px-4">Beta</Badge>
             <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
               Facebook Ads Readiness
             </div>
          </div>
        </div>
      </header>

      <main className="relative">
        <AnimatePresence mode="wait">
          {currentStep === Step.Landing && (
            <LandingPage key="landing" onStart={handleStart} />
          )}

          {currentStep === Step.BusinessInfo && (
            <BusinessInfoStep key="info" onSubmit={handleInfoSubmit} />
          )}

          {currentStep === Step.Quiz && (
            <QuickAuditQuiz key="quiz" onComplete={handleQuizComplete} />
          )}

          {currentStep === Step.Results && businessInfo && (
            <ResultsPage 
              key="results" 
              businessInfo={businessInfo} 
              answers={answers} 
              onRestart={handleRestart}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer Branding */}
      <footer className="text-center py-12 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40 border-t border-border/20 mt-12">
        &copy; 2026 AuditTool • បង្កើតឡើងសម្រាប់ម្ចាស់អាជីវកម្មខ្នាតតូច
      </footer>
    </div>
  );
}
