import { useState, useEffect } from 'react';

// Define the types for the assessment data
interface PersonalInfo {
  age: string;
  biologicalSex: string;
  primaryGoals: string[];
  topPriority: string;
  motivation: string;
  obstacles: string;
}

interface FitnessInfo {
  activityLevel: string;
  currentRoutine: string;
  hasCurrentRoutine: string;
  fitnessGoals: string[];
  preferredActivities: string;
  timeForExercise: string;
  resources: string[];
  injuries: string;
  selfRatedFitness: string;
}

interface NutritionInfo {
  dietaryPreferences: string[];
  currentDietPattern: string;
  mealRegularity: string;
  snacking: string;
  dietQuality: string;
  fruitVeggieIntake: string;
  beverages: string;
  caffeineIntake: string;
}

interface MentalHealthInfo {
  interestInActivities: string;
  feelingDepressed: string;
  nervousAnxious: string;
  uncontrollableWorry: string;
  stressTriggers: string[];
  currentMentalHealthSupport: string;
  overallMentalWellbeing: string;
}

interface SleepInfo {
  weekdayBedtime: string;
  weekdayWakeTime: string;
  weekendBedtime: string;
  weekendWakeTime: string;
  weekdaySleepHours: string;
  weekendSleepHours: string;
  sleepQuality: string;
  timeToFallAsleep: string;
  nightAwakenings: string;
  electronicsBeforeBed: string;
}

interface LifestyleInfo {
  academicWorkload: string;
  classSchedule: string;
  employment: string;
  extracurriculars: string;
  freeTimeWindows: string;
  preferredActivityTime: string;
}

interface MedicalInfo {
  chronicConditions: string;
  medications: string;
  recentHealthEvents: string;
  allergies: string;
  currentMedicalCare: string;
}

interface AdditionalInfo {
  otherConsiderations: string;
  expectationsOrRequests: string;
}

interface ResultsInfo {
  fitnessRecommendations: string;
  nutritionRecommendations: string;
  mentalHealthRecommendations: string;
  sleepRecommendations: string;
  overallWellnessScore: number;
  priorityAreas: string[];
  timestamp: string;
}

interface AssessmentStore {
  personalInfo: PersonalInfo;
  fitnessInfo: FitnessInfo;
  nutritionInfo: NutritionInfo;
  mentalHealthInfo: MentalHealthInfo;
  sleepInfo: SleepInfo;
  lifestyleInfo: LifestyleInfo;
  medicalInfo: MedicalInfo;
  additionalInfo: AdditionalInfo;
  results: ResultsInfo;
  
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
  updateFitnessInfo: (data: Partial<FitnessInfo>) => void;
  updateNutritionInfo: (data: Partial<NutritionInfo>) => void;
  updateMentalHealthInfo: (data: Partial<MentalHealthInfo>) => void;
  updateSleepInfo: (data: Partial<SleepInfo>) => void;
  updateLifestyleInfo: (data: Partial<LifestyleInfo>) => void;
  updateMedicalInfo: (data: Partial<MedicalInfo>) => void;
  updateAdditionalInfo: (data: Partial<AdditionalInfo>) => void;
  setResults: (data: ResultsInfo) => void;
  resetAssessment: () => void;
}

export function useAssessmentStore(): AssessmentStore {
  // Initial state
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    age: '',
    biologicalSex: '',
    primaryGoals: [],
    topPriority: '',
    motivation: '',
    obstacles: '',
  });
  
  const [fitnessInfo, setFitnessInfo] = useState<FitnessInfo>({
    activityLevel: '',
    currentRoutine: '',
    hasCurrentRoutine: '',
    fitnessGoals: [],
    preferredActivities: '',
    timeForExercise: '',
    resources: [],
    injuries: '',
    selfRatedFitness: '',
  });
  
  const [nutritionInfo, setNutritionInfo] = useState<NutritionInfo>({
    dietaryPreferences: [],
    currentDietPattern: '',
    mealRegularity: '',
    snacking: '',
    dietQuality: '',
    fruitVeggieIntake: '',
    beverages: '',
    caffeineIntake: '',
  });
  
  const [mentalHealthInfo, setMentalHealthInfo] = useState<MentalHealthInfo>({
    interestInActivities: '',
    feelingDepressed: '',
    nervousAnxious: '',
    uncontrollableWorry: '',
    stressTriggers: [],
    currentMentalHealthSupport: '',
    overallMentalWellbeing: '',
  });
  
  const [sleepInfo, setSleepInfo] = useState<SleepInfo>({
    weekdayBedtime: '',
    weekdayWakeTime: '',
    weekendBedtime: '',
    weekendWakeTime: '',
    weekdaySleepHours: '',
    weekendSleepHours: '',
    sleepQuality: '',
    timeToFallAsleep: '',
    nightAwakenings: '',
    electronicsBeforeBed: '',
  });
  
  const [lifestyleInfo, setLifestyleInfo] = useState<LifestyleInfo>({
    academicWorkload: '',
    classSchedule: '',
    employment: '',
    extracurriculars: '',
    freeTimeWindows: '',
    preferredActivityTime: '',
  });
  
  const [medicalInfo, setMedicalInfo] = useState<MedicalInfo>({
    chronicConditions: '',
    medications: '',
    recentHealthEvents: '',
    allergies: '',
    currentMedicalCare: '',
  });
  
  const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfo>({
    otherConsiderations: '',
    expectationsOrRequests: '',
  });
  
  const [results, setResultsState] = useState<ResultsInfo>({
    fitnessRecommendations: '',
    nutritionRecommendations: '',
    mentalHealthRecommendations: '',
    sleepRecommendations: '',
    overallWellnessScore: 0,
    priorityAreas: [],
    timestamp: '',
  });
  
  // Update functions
  const updatePersonalInfo = (data: Partial<PersonalInfo>) => {
    setPersonalInfo(prev => ({ ...prev, ...data }));
  };
  
  const updateFitnessInfo = (data: Partial<FitnessInfo>) => {
    setFitnessInfo(prev => ({ ...prev, ...data }));
  };
  
  const updateNutritionInfo = (data: Partial<NutritionInfo>) => {
    setNutritionInfo(prev => ({ ...prev, ...data }));
  };
  
  const updateMentalHealthInfo = (data: Partial<MentalHealthInfo>) => {
    setMentalHealthInfo(prev => ({ ...prev, ...data }));
  };
  
  const updateSleepInfo = (data: Partial<SleepInfo>) => {
    setSleepInfo(prev => ({ ...prev, ...data }));
  };
  
  const updateLifestyleInfo = (data: Partial<LifestyleInfo>) => {
    setLifestyleInfo(prev => ({ ...prev, ...data }));
  };
  
  const updateMedicalInfo = (data: Partial<MedicalInfo>) => {
    setMedicalInfo(prev => ({ ...prev, ...data }));
  };
  
  const updateAdditionalInfo = (data: Partial<AdditionalInfo>) => {
    setAdditionalInfo(prev => ({ ...prev, ...data }));
  };
  
  const setResults = (data: ResultsInfo) => {
    setResultsState(data);
  };
  
  const resetAssessment = () => {
    setPersonalInfo({
      age: '',
      biologicalSex: '',
      primaryGoals: [],
      topPriority: '',
      motivation: '',
      obstacles: '',
    });
    
    setFitnessInfo({
      activityLevel: '',
      currentRoutine: '',
      hasCurrentRoutine: '',
      fitnessGoals: [],
      preferredActivities: '',
      timeForExercise: '',
      resources: [],
      injuries: '',
      selfRatedFitness: '',
    });
    
    setNutritionInfo({
      dietaryPreferences: [],
      currentDietPattern: '',
      mealRegularity: '',
      snacking: '',
      dietQuality: '',
      fruitVeggieIntake: '',
      beverages: '',
      caffeineIntake: '',
    });
    
    setMentalHealthInfo({
      interestInActivities: '',
      feelingDepressed: '',
      nervousAnxious: '',
      uncontrollableWorry: '',
      stressTriggers: [],
      currentMentalHealthSupport: '',
      overallMentalWellbeing: '',
    });
    
    setSleepInfo({
      weekdayBedtime: '',
      weekdayWakeTime: '',
      weekendBedtime: '',
      weekendWakeTime: '',
      weekdaySleepHours: '',
      weekendSleepHours: '',
      sleepQuality: '',
      timeToFallAsleep: '',
      nightAwakenings: '',
      electronicsBeforeBed: '',
    });
    
    setLifestyleInfo({
      academicWorkload: '',
      classSchedule: '',
      employment: '',
      extracurriculars: '',
      freeTimeWindows: '',
      preferredActivityTime: '',
    });
    
    setMedicalInfo({
      chronicConditions: '',
      medications: '',
      recentHealthEvents: '',
      allergies: '',
      currentMedicalCare: '',
    });
    
    setAdditionalInfo({
      otherConsiderations: '',
      expectationsOrRequests: '',
    });
    
    setResultsState({
      fitnessRecommendations: '',
      nutritionRecommendations: '',
      mentalHealthRecommendations: '',
      sleepRecommendations: '',
      overallWellnessScore: 0,
      priorityAreas: [],
      timestamp: '',
    });
  };
  
  return {
    personalInfo,
    fitnessInfo,
    nutritionInfo,
    mentalHealthInfo,
    sleepInfo,
    lifestyleInfo,
    medicalInfo,
    additionalInfo,
    results,
    
    updatePersonalInfo,
    updateFitnessInfo,
    updateNutritionInfo,
    updateMentalHealthInfo,
    updateSleepInfo,
    updateLifestyleInfo,
    updateMedicalInfo,
    updateAdditionalInfo,
    setResults,
    resetAssessment,
  };
}