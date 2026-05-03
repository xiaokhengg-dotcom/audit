/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Send, CheckCircle2, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";

export default function LeadCapture() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to a backend or Google Sheet
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="border-none shadow-xl bg-green-50/50">
        <CardContent className="pt-10 pb-10 text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-900">សំណើត្រូវបានបញ្ជូន!</CardTitle>
          <CardDescription className="text-green-700 max-w-xs mx-auto">
            យើងនឹងទាក់ទងទៅអ្នកក្នុងពេលឆាប់ៗ សម្រាប់ការប្រឹក្សាយោបល់ដោយផ្ទាល់ជាមួយអ្នកជំនាញ។
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-xl bg-secondary/30 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <MessageSquare className="w-24 h-24" />
      </div>
      <CardHeader className="text-center sm:text-left">
        <CardTitle className="text-2xl font-bold leading-tight">តើអ្នកចង់ឱ្យយើងពិនិត្យផេកដោយឥតគិតថ្លៃដែរឬទេ?</CardTitle>
        <CardDescription className="text-base">
          អ្នកជំនាញរបស់យើងនឹងចូលមើលផេករបស់អ្នក និងផ្ញើគន្លឹះពិសេសៗទៅអ្នកតាមរយៈសារ។
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              required
              type="text"
              placeholder="ឈ្មោះរបស់អ្នក"
              className="h-12 bg-background border-none rounded-xl focus-visible:ring-primary shadow-sm"
            />
            <Input
              required
              type="text"
              placeholder="តេឡេក្រាម / WhatsApp"
              className="h-12 bg-background border-none rounded-xl focus-visible:ring-primary shadow-sm"
            />
          </div>
          <Input
            type="url"
            placeholder="តំណភ្ជាប់ហ្វេសប៊ុកផេក (Optional)"
            className="h-12 bg-background border-none rounded-xl focus-visible:ring-primary shadow-sm"
          />
          <Button
            type="submit"
            size="lg"
            className="w-full h-14 text-lg font-bold rounded-xl gap-2 transition-all hover:translate-y-[-2px]"
          >
            ផ្ញើសំណើពិនិត្យផេក
            <Send className="w-4 h-4" />
          </Button>
          <p className="text-center text-[10px] text-muted-foreground uppercase tracking-widest font-bold opacity-60">
            គ្មានការតម្រូវឱ្យបង់ប្រាក់ • សេវាកម្មប្រឹក្សាឥតគិតថ្លៃ
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
