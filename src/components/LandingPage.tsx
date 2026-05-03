/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { CheckCircle2, ShieldCheck, Zap, BarChart3, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-4xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Badge variant="secondary" className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider gap-1.5 rounded-full">
            <Zap className="w-3.5 h-3.5 fill-primary text-primary" />
            ការធ្វើសវនកម្មរហ័ស ក្រោម ២ នាទី
          </Badge>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold text-center text-foreground mb-6 leading-[1.1] tracking-tight"
        >
          តើហ្វេសប៊ុកផេករបស់អ្នករួចរាល់សម្រាប់ <span className="text-primary italic">Ads</span> ឬនៅ?
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xl text-muted-foreground text-center mb-12 max-w-2xl leading-relaxed"
        >
          ឆ្លើយសំណួរងាយៗ និងទទួលបានរបាយការណ៍លម្អិតអំពីភាពត្រៀមខ្លួននៃអាជីវកម្មរបស់អ្នក ក្នុងរយៈពេលតិចជាង ២ នាទី។
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-full max-w-sm mb-16"
        >
          <Button
            id="start-audit-btn"
            size="lg"
            onClick={onStart}
            className="w-full py-8 text-xl font-bold shadow-2xl shadow-primary/20 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            ចាប់ផ្តើមការពិនិត្យឥឡូវនេះ
          </Button>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="w-4 h-4" />
            <span>មិនតម្រូវឲ្យចូលគណនី (No Login Required)</span>
          </div>
        </motion.div>

        {/* Features / Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {[
            { 
              icon: <BarChart3 className="w-6 h-6 text-primary" />, 
              title: "ការវិភាគទិន្នន័យ", 
              desc: "ពិនិត្យមើលរចនាសម្ព័ន្ធ Page របស់អ្នកតាមស្តង់ដារផ្សាយពាណិជ្ជកម្ម" 
            },
            { 
              icon: <Users className="w-6 h-6 text-primary" />, 
              title: "ការយល់ដឹងពីអតិថិជន", 
              desc: "វាស់វែងលទ្ធភាពនៃការទាក់ទាញអតិថិជនគោលដៅ" 
            },
            { 
              icon: <CheckCircle2 className="w-6 h-6 text-primary" />, 
              title: "លទ្ធផលភ្លាមៗ", 
              desc: "ទទួលបានពិន្ទុ និងការណែនាំដើម្បីកែលម្អ Page របស់អ្នកឱ្យកាន់តែប្រសើរ" 
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
            >
              <Card className="border-none shadow-sm bg-secondary/50 hover:bg-secondary transition-colors h-full">
                <CardContent className="pt-6 pb-6 text-center md:text-left flex flex-col items-center md:items-start h-full">
                  <div className="bg-background p-3 rounded-xl shadow-sm mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
