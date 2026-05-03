/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "motion/react";
import { BusinessInfo, Answer, ReadinessLevel } from "../types";
import { QUESTIONS, RECOMMENDATIONS } from "../constants";
import { generateAuditSummary } from "../services/geminiService";
import { Copy, RefreshCcw, Sparkles, AlertTriangle, CheckCircle, ListTodo, Share2, Rocket, Info } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Skeleton } from "./ui/skeleton";
import LeadCapture from "./LeadCapture";

import { toast } from "sonner";

interface ResultsPageProps {
  businessInfo: BusinessInfo;
  answers: Answer[];
  onRestart: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ businessInfo, answers, onRestart }) => {
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(true);

  const totalScore = useMemo(() => answers.reduce((sum, a) => sum + a.score, 0), [answers]);
  const maxScore = QUESTIONS.length * 2;
  const scorePercentage = (totalScore / maxScore) * 100;

  const readiness = useMemo(() => {
    if (totalScore >= 13) return ReadinessLevel.Ready;
    if (totalScore >= 9) return ReadinessLevel.AlmostReady;
    if (totalScore >= 5) return ReadinessLevel.Weak;
    return ReadinessLevel.NotReady;
  }, [totalScore]);

  const topFixes = useMemo(() => {
    return [...answers]
      .sort((a, b) => a.score - b.score)
      .slice(0, 3)
      .map(a => {
        const recommendation = RECOMMENDATIONS.find(r => r.questionId === a.questionId);
        const question = QUESTIONS.find(q => q.id === a.questionId);
        return { text: recommendation?.text, question: question?.text };
      })
      .filter(f => f.text) as { text: string; question: string }[];
  }, [answers]);

  const weakQuestionTexts = useMemo(() => {
    return answers
      .filter(a => a.score < 2)
      .map(a => QUESTIONS.find(q => q.id === a.questionId)?.text)
      .filter(Boolean) as string[];
  }, [answers]);

  useEffect(() => {
    async function getSummary() {
      try {
        const summary = await generateAuditSummary(
          businessInfo,
          totalScore,
          readiness,
          weakQuestionTexts
        );
        setAiSummary(summary);
      } catch (error) {
        console.error("AI Summary Error:", error);
        setAiSummary("មិនអាចទាញយកការសង្ខេបបានទេនៅពេលនេះ។ សូមព្យាយាមម្តងទៀត។");
      } finally {
        setIsLoadingAi(false);
      }
    }
    getSummary();
  }, [businessInfo, totalScore, readiness, weakQuestionTexts]);

  const handleCopy = () => {
    const text = `
លទ្ធផលការពិនិត្យសម្រាប់៖ ${businessInfo.name}
ពិន្ទុ៖ ${totalScore}/${maxScore} (${Math.round(scorePercentage)}%)
ស្ថានភាព៖ ${readiness}

ចំណុចត្រូវកែទម្រង់បន្ទាន់ទាំង ៣៖
1. ${topFixes[0]?.text || 'គ្មាន'}
2. ${topFixes[1]?.text || 'គ្មាន'}
3. ${topFixes[2]?.text || 'គ្មាន'}
    `.trim();
    navigator.clipboard.writeText(text);
    toast.success("បានចម្លងលទ្ធផលទៅកាន់ Clipboard!");
  };

  const getReadinessColor = () => {
    switch (readiness) {
      case ReadinessLevel.Ready: return "bg-green-500 text-white";
      case ReadinessLevel.AlmostReady: return "bg-blue-500 text-white";
      case ReadinessLevel.Weak: return "bg-amber-500 text-white";
      case ReadinessLevel.NotReady: return "bg-red-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getScoreCircleColor = () => {
    if (scorePercentage >= 80) return "text-green-500 stroke-green-500";
    if (scorePercentage >= 60) return "text-blue-500 stroke-blue-500";
    if (scorePercentage >= 40) return "text-amber-500 stroke-amber-500";
    return "text-red-500 stroke-red-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto px-6 py-8 md:py-16 space-y-12"
    >
      <header className="text-center space-y-6">
        <div className="relative inline-flex items-center justify-center">
          <svg className="w-32 h-32 md:w-40 md:h-40 transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              className="stroke-secondary fill-none"
              strokeWidth="10"
            />
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              className={`fill-none transition-all duration-1000 ease-out ${getScoreCircleColor()}`}
              strokeWidth="10"
              strokeDasharray={`${scorePercentage * 2.827} 282.7`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl md:text-4xl font-black text-foreground">{totalScore}</span>
            <span className="text-xs font-bold text-muted-foreground uppercase">នៃ {maxScore} ពិន្ទុ</span>
          </div>
        </div>

        <div className="space-y-2">
          <Badge className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${getReadinessColor()}`}>
            {readiness}
          </Badge>
          <h1 className="text-3xl font-black tracking-tight">{businessInfo.name}</h1>
          <p className="text-muted-foreground font-medium uppercase text-xs tracking-widest">{businessInfo.type}</p>
        </div>
      </header>

      {/* AI Analysis Section */}
      <Card className="border-none shadow-2xl bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[60%] bg-white/10 rounded-full blur-3xl opacity-50" />
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
            <Sparkles className="w-6 h-6 fill-white" />
            ការវិភាគឆ្លាតវៃដោយ AI
          </CardTitle>
          <CardDescription className="text-primary-foreground/70">
            របាយការណ៍សង្ខេបផ្អែកលើចម្លើយរបស់អ្នក
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          {isLoadingAi ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-full bg-white/20" />
              <Skeleton className="h-4 w-[90%] bg-white/20" />
              <Skeleton className="h-4 w-[95%] bg-white/20" />
              <Skeleton className="h-4 w-[80%] bg-white/20" />
            </div>
          ) : (
            <div className="prose prose-invert max-w-none text-primary-foreground/90 leading-relaxed font-medium">
              {aiSummary}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Critical Fixes Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold">ចំណុចត្រូវជួសជុលបន្ទាន់</h3>
          </div>
          <div className="space-y-4">
            {topFixes.map((fix, i) => (
              <Card key={i} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-5 flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    {i + 1}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-muted-foreground uppercase opacity-50">{fix.question}</p>
                    <p className="text-sm font-semibold leading-relaxed">{fix.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Action Plan Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-100 rounded-lg text-green-600">
              <ListTodo className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold">ផែនការសកម្មភាព ៣ ថ្ងៃ</h3>
          </div>
          <div className="space-y-1">
            <Accordion type="single" collapsible className="w-full space-y-3">
              {[
                { day: "១", title: "រៀបចំហេដ្ឋារចនាសម្ព័ន្ធ", content: "កែលម្អភាពច្បាស់លាស់ផេក & រូបភាព Cover។ ធ្វើឲ្យគេឃើញច្បាស់ថាអ្នកលក់អ្វី និងមានព័ត៌មានទំនាក់ទំនងគ្រប់គ្រាន់។" },
                { day: "២", title: "បង្កើនការបំប្លែងអតិថិជន", content: "រៀបចំប៊ូតុង CTA (Call to Action) & ការតបសារស្វ័យប្រវត្តិ។ បង្វែរអ្នកមកមើលទៅជាអតិថិជនដែលមានសក្តានុពលភ្លាមៗ។" },
                { day: "៣", title: "កសាងទំនុកចិត្ត", content: "បង្ហោះការបញ្ជាក់ពីភាពជឿជាក់ (Testimonials) & ការផ្តល់ជូនពិសេសឱ្យបានច្បាស់លាស់។ ផ្តល់ហេតុផលគ្រប់គ្រាន់ឱ្យពួកគេទិញឥឡូវនេះ។" }
              ].map((item, i) => (
                <AccordionItem key={i} value={`day-${i}`} className="border-none bg-secondary/30 rounded-xl px-2">
                  <AccordionTrigger className="hover:no-underline font-bold py-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-background flex items-center justify-center text-xs">ថ្ងៃ {item.day}</span>
                      <span>{item.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-muted-foreground leading-relaxed px-1">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>

      <div className="pt-8">
        <LeadCapture />
      </div>

      <footer className="pt-12 border-t flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="lg" onClick={onRestart} className="rounded-xl font-bold gap-2">
            <RefreshCcw className="w-4 h-4" />
            ធ្វើការពិនិត្យឡើងវិញ
          </Button>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Button variant="outline" size="lg" onClick={handleCopy} className="flex-1 sm:flex-none rounded-xl font-bold gap-2">
            <Share2 className="w-4 h-4" />
            ចែករំលែកលទ្ធផល
          </Button>
          <Button size="lg" className="flex-1 sm:flex-none rounded-xl font-bold gap-2 bg-foreground text-background hover:bg-foreground/90">
            <Rocket className="w-4 h-4" />
            ទទួលសេវាកម្ម Ads
          </Button>
        </div>
      </footer>
    </motion.div>
  );
};

export default ResultsPage;
