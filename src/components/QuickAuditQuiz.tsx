/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { QUESTIONS } from "../constants";
import { Answer, ScoreValue } from "../types";
import { Progress } from "./ui/progress";
import { Card, CardContent } from "./ui/card";
import { Check, HelpCircle, X, ArrowRight } from "lucide-react";

interface QuickAuditQuizProps {
  onComplete: (answers: Answer[]) => void;
}

const QuickAuditQuiz: React.FC<QuickAuditQuizProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const handleAnswer = (score: ScoreValue) => {
    const newAnswers = [
      ...answers,
      { questionId: QUESTIONS[currentIndex].id, score }
    ];
    setAnswers(newAnswers);

    if (currentIndex < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 400);
    } else {
      onComplete(newAnswers);
    }
  };

  const question = QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

  return (
    <div className="max-w-xl mx-auto px-6 py-8 md:py-12">
      <div className="mb-10 space-y-4">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary">កំពុងវាយតម្លៃ</h3>
            <p className="text-sm text-muted-foreground font-medium">
              សំណួរទី {currentIndex + 1} នៃ {QUESTIONS.length}
            </p>
          </div>
          <span className="text-2xl font-black text-primary/40">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-3 rounded-full" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.98, x: 10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.98, x: -10 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Card className="border-none shadow-2xl bg-card overflow-hidden">
            <div className="h-2 bg-primary w-full" />
            <CardContent className="pt-10 pb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-12 leading-tight min-h-[100px] flex items-center">
                {question.text}
              </h2>

              <div className="grid gap-4">
                {[
                  { id: 'yes', score: 2, text: 'បាទ / ចាស', icon: <Check className="w-5 h-5" />, color: 'hover:bg-green-50 hover:border-green-200' },
                  { id: 'notsure', score: 1, text: 'មិនច្បាស់ទេ', icon: <HelpCircle className="w-5 h-5" />, color: 'hover:bg-amber-50 hover:border-amber-200' },
                  { id: 'no', score: 0, text: 'ទេ', icon: <X className="w-5 h-5" />, color: 'hover:bg-red-50 hover:border-red-200' }
                ].map((option) => (
                  <button
                    key={option.id}
                    id={`q${question.id}-${option.id}`}
                    onClick={() => handleAnswer(option.score as ScoreValue)}
                    className={`w-full group relative flex items-center justify-between p-5 md:p-6 bg-secondary/30 border-2 border-transparent rounded-2xl transition-all active:scale-[0.98] ${option.color} hover:shadow-md hover:translate-y-[-2px]`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center border border-border group-hover:border-transparent transition-colors">
                        {option.icon}
                      </div>
                      <span className="text-lg font-bold">{option.text}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
      
      <p className="text-center mt-12 text-sm text-muted-foreground italic">
        * ចម្លើយរបស់អ្នកនឹងត្រូវបានប្រើប្រាស់ដើម្បីគណនាពិន្ទុដោយស្វ័យប្រវត្តិ
      </p>
    </div>
  );
};

export default QuickAuditQuiz;
