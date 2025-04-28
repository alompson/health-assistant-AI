import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing } from '@/constants/theme';
import { Brain } from 'lucide-react-native';
import { useAssessmentStore } from '@/store/assessmentStore';

export default function Analyzing() {
  const { setResults } = useAssessmentStore();
  const [progress, setProgress] = useState(0);
  const [analysisStep, setAnalysisStep] = useState('Analyzing wellness data...');
  const animatedValue = new Animated.Value(0);
  
  useEffect(() => {
    // Start the progress animation
    Animated.timing(animatedValue, {
      toValue: 100,
      duration: 5000, // 5 seconds
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
    
    // Update progress percentage for visual feedback
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, 100);
    
    // Update analysis step text for more dynamic feel
    setTimeout(() => setAnalysisStep('Processing lifestyle factors...'), 1500);
    setTimeout(() => setAnalysisStep('Creating wellness recommendations...'), 3000);
    setTimeout(() => setAnalysisStep('Finalizing your personalized plan...'), 4500);
    
    // After 5 seconds, generate results and navigate
    setTimeout(() => {
      // Mock results generation
      const mockResults = {
        fitnessRecommendations: "Based on your fitness profile, we recommend incorporating 3-4 days of moderate exercise including both cardio and strength training. Start with 20-30 minute sessions and gradually increase to 45-60 minutes as your fitness improves.",
        nutritionRecommendations: "Your diet could benefit from increasing whole foods and reducing processed items. Aim for balanced meals with lean proteins, complex carbohydrates, and healthy fats. Stay hydrated by drinking 8 glasses of water daily.",
        mentalHealthRecommendations: "To manage stress, try incorporating 10-15 minutes of mindfulness or meditation daily. Focus on small wins and practice positive self-talk. Consider limiting social media use if it contributes to stress or anxiety.",
        sleepRecommendations: "Establish a regular sleep schedule, aiming for 7-9 hours of quality sleep. Create a bedtime routine to signal your body it's time to wind down. Limit screen time and caffeine in the hours before bed.",
        overallWellnessScore: 72,
        priorityAreas: ["stress_management", "sleep_quality", "physical_activity"],
        timestamp: new Date().toISOString(),
      };
      
      setResults(mockResults);
      router.replace('/(tabs)/results');
    }, 5000);
    
    return () => clearInterval(progressInterval);
  }, []);
  
  const width = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Brain size={60} color={colors.primary[500]} />
        </View>
        
        <Text style={styles.title}>AI Analysis in Progress</Text>
        
        <Text style={styles.description}>
          We're analyzing your responses to create personalized wellness recommendations.
        </Text>
        
        <View style={styles.progressContainer}>
          <Text style={styles.progressStep}>{analysisStep}</Text>
          
          <View style={styles.progressBarContainer}>
            <Animated.View style={[styles.progressBar, { width }]} />
          </View>
          
          <Text style={styles.progressPercentage}>{progress}%</Text>
        </View>
        
        <Text style={styles.waitMessage}>
          This will take just a few moments...
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[5],
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[6],
  },
  title: {
    ...typography.h1,
    color: colors.gray[900],
    marginBottom: spacing[3],
    textAlign: 'center',
  },
  description: {
    ...typography.body,
    color: colors.gray[600],
    textAlign: 'center',
    marginBottom: spacing[8],
    maxWidth: 320,
  },
  progressContainer: {
    width: '100%',
    maxWidth: 320,
    marginBottom: spacing[6],
  },
  progressStep: {
    ...typography.subtitle,
    color: colors.primary[700],
    marginBottom: spacing[3],
    textAlign: 'center',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.gray[200],
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing[2],
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary[500],
  },
  progressPercentage: {
    ...typography.caption,
    color: colors.gray[600],
    textAlign: 'right',
  },
  waitMessage: {
    ...typography.body,
    color: colors.gray[500],
    fontStyle: 'italic',
  },
});