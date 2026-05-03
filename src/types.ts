export enum Step {
  Landing = 'landing',
  BusinessInfo = 'business-info',
  Quiz = 'quiz',
  Results = 'results',
}

export type Goal = 'ចង់បានសារច្រើនជាងមុន' | 'ចង់បានការវាយទូរស័ព្ទច្រើនជាងមុន' | 'ចង់លក់បានច្រើនជាងមុន' | 'ចង់បានការកក់ច្រើនជាងមុន' | 'ចង់មានអ្នក Follow ច្រើនជាងមុន';

export interface BusinessInfo {
  name: string;
  type: string;
  url?: string;
  goal: Goal;
}

export type ScoreValue = 2 | 1 | 0; // Yes, Not sure, No

export interface Answer {
  questionId: number;
  score: ScoreValue;
}

export interface Recommendation {
  questionId: number;
  text: string;
}

export enum ReadinessLevel {
  Ready = 'រួចរាល់សម្រាប់ការរត់ Ads',
  AlmostReady = 'ស្ទើរតែរួចរាល់, ត្រូវកែសម្រួលចំណុចខ្លះ',
  Weak = 'ផេកនៅខ្សោយ, ការរត់ Ads អាចខាតលុយ',
  NotReady = 'ត្រូវកែលម្អផេកជាបន្ទាន់ មុននឹងរត់ Ads',
}
