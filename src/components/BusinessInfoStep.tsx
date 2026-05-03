/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { BusinessInfo, Goal } from "../types";
import { GOALS } from "../constants";
import { ArrowRight, Building2, Store, Link as LinkIcon, Target } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface BusinessInfoStepProps {
  onSubmit: (info: BusinessInfo) => void;
}

const BusinessInfoStep: React.FC<BusinessInfoStepProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Partial<BusinessInfo>>({
    goal: 'ចង់បានសារច្រើនជាងមុន' as Goal
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.type && formData.goal) {
      onSubmit(formData as BusinessInfo);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-xl mx-auto px-6 py-8"
    >
      <Card className="border-none shadow-xl bg-card">
        <CardHeader className="space-y-1 pb-6 text-center">
          <CardTitle className="text-3xl font-extrabold tracking-tight">ព័ត៌មានអាជីវកម្ម</CardTitle>
          <CardDescription className="text-base">
            ប្រាប់យើងបន្តិចអំពីអាជីវកម្មរបស់អ្នក ដើម្បីផ្តល់ការណែនាំបានច្បាស់លាស់
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="business-name" className="text-sm font-semibold flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-primary" />
                  ឈ្មោះអាជីវកម្ម
                </Label>
                <Input
                  id="business-name"
                  required
                  placeholder="ឧ. ហាងកាហ្វេ សាន់នី"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-12 text-base rounded-xl border-secondary-foreground/10 bg-secondary/30 focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="business-type" className="text-sm font-semibold flex items-center gap-2">
                  <Store className="w-4 h-4 text-primary" />
                  ប្រភេទអាជីវកម្ម
                </Label>
                <Input
                  id="business-type"
                  required
                  placeholder="ឧ. ហាងកាហ្វេ, លក់ទំនិញអនឡាញ"
                  value={formData.type || ''}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="h-12 text-base rounded-xl border-secondary-foreground/10 bg-secondary/30 focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebook-url" className="text-sm font-semibold flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-primary" />
                  តំណភ្ជាប់ហ្វេសប៊ុកផេក (ជម្រើស)
                </Label>
                <Input
                  id="facebook-url"
                  type="url"
                  placeholder="facebook.com/yourpage"
                  value={formData.url || ''}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="h-12 text-base rounded-xl border-secondary-foreground/10 bg-secondary/30 focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  គោលដៅចម្បងរបស់អ្នក
                </Label>
                <div className="grid grid-cols-1 gap-2.5">
                  {GOALS.map((goal) => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => setFormData({ ...formData, goal: goal as Goal })}
                      className={`text-left px-5 py-4 rounded-xl transition-all border-2 text-sm md:text-base font-medium flex items-center justify-between ${
                        formData.goal === goal 
                          ? 'bg-primary/5 border-primary text-primary shadow-sm' 
                          : 'bg-background border-border text-muted-foreground hover:border-primary/30 hover:bg-secondary/50'
                      }`}
                    >
                      {goal}
                      {formData.goal === goal && <div className="w-2 h-2 rounded-full bg-primary" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Button
              id="continue-to-quiz-btn"
              type="submit"
              size="lg"
              className="w-full h-16 text-lg font-bold rounded-2xl shadow-lg shadow-primary/20 gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              បន្តទៅការវាយតម្លៃ
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BusinessInfoStep;
