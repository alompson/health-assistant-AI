import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing } from '@/constants/theme';
import { Button } from '@/components/Button';
import { RadioGroup } from '@/components/RadioGroup';
import { CheckboxGroup } from '@/components/CheckboxGroup';
import { FormField } from '@/components/FormField';
import { ProgressBar } from '@/components/ProgressBar';
import { useAssessmentStore } from '@/store/assessmentStore';

export default function FitnessProfile() {
  const { updateFitnessInfo, fitnessInfo } = useAssessmentStore();
  
  const [formData, setFormData] = useState({
    activityLevel: fitnessInfo.activityLevel || '',
    currentRoutine: fitnessInfo.currentRoutine || '',
    hasCurrentRoutine: fitnessInfo.hasCurrentRoutine || 'no',
    fitnessGoals: fitnessInfo.fitnessGoals || [],
    preferredActivities: fitnessInfo.preferredActivities || '',
    timeForExercise: fitnessInfo.timeForExercise || '',
    resources: fitnessInfo.resources || [],
    injuries: fitnessInfo.injuries || '',
    selfRatedFitness: fitnessInfo.selfRatedFitness || ''
  });

  const activityLevelOptions = [
    { label: 'Sedentary - little to no exercise', value: 'sedentary' },
    { label: 'Lightly active - light exercise 1-2x/week', value: 'lightly_active' },
    { label: 'Moderately active - moderate exercise ~3-4x/week', value: 'moderately_active' },
    { label: 'Very active - vigorous exercise or sports 5+ times/week', value: 'very_active' }
  ];

  const currentRoutineOptions = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' }
  ];

  const fitnessGoalsOptions = [
    { label: 'Build muscle/strength', value: 'build_muscle' },
    { label: 'Improve endurance/cardio', value: 'improve_endurance' },
    { label: 'Increase flexibility', value: 'increase_flexibility' },
    { label: 'Weight loss', value: 'weight_loss' },
    { label: 'Weight gain', value: 'weight_gain' },
    { label: 'Sports performance', value: 'sports_performance' },
    { label: 'General health/toning', value: 'general_health' },
    { label: 'Other', value: 'other' }
  ];

  const resourcesOptions = [
    { label: 'Gym access', value: 'gym' },
    { label: 'Home equipment (dumbbells, etc.)', value: 'home_equipment' },
    { label: 'Outdoor space', value: 'outdoor' },
    { label: 'No special equipment', value: 'no_equipment' }
  ];

  const fitnessRatingOptions = [
    { label: '1 - Very poor shape', value: '1' },
    { label: '2 - Below average', value: '2' },
    { label: '3 - Average', value: '3' },
    { label: '4 - Good shape', value: '4' },
    { label: '5 - Excellent shape', value: '5' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    updateFitnessInfo(formData);
    router.push('/(tabs)/assessment/nutrition');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.progressContainer}>
        <ProgressBar current={2} total={8} />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionDescription}>
          Let's understand your current fitness level and goals.
        </Text>
        
        <FormField label="Current Activity Level" required>
          <RadioGroup
            options={activityLevelOptions}
            selectedValue={formData.activityLevel}
            onValueChange={(value) => handleChange('activityLevel', value)}
          />
        </FormField>
        
        <FormField label="Do you participate in a regular exercise program?" required>
          <RadioGroup
            options={currentRoutineOptions}
            selectedValue={formData.hasCurrentRoutine}
            onValueChange={(value) => handleChange('hasCurrentRoutine', value)}
          />
        </FormField>
        
        {formData.hasCurrentRoutine === 'yes' && (
          <FormField label="Describe your typical workouts" required>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="E.g., Jog 2x week for 20 min, no strength training"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              value={formData.currentRoutine}
              onChangeText={(value) => handleChange('currentRoutine', value)}
            />
          </FormField>
        )}
        
        <FormField label="Specific Fitness Goals" required helperText="Select all that apply">
          <CheckboxGroup
            options={fitnessGoalsOptions}
            selectedValues={formData.fitnessGoals}
            onValueChange={(values) => handleChange('fitnessGoals', values)}
          />
        </FormField>
        
        <FormField label="Exercise Preferences" helperText="What types of physical activities do you enjoy?">
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="E.g., running, walking, cycling, yoga, weightlifting, team sports, dance"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            value={formData.preferredActivities}
            onChangeText={(value) => handleChange('preferredActivities', value)}
          />
        </FormField>
        
        <FormField label="Time for Exercise" helperText="How many days per week and for how long per session?">
          <TextInput
            style={styles.input}
            placeholder="E.g., 3 days, about 45 minutes each"
            value={formData.timeForExercise}
            onChangeText={(value) => handleChange('timeForExercise', value)}
          />
        </FormField>
        
        <FormField label="Resource Availability" helperText="Select all that apply">
          <CheckboxGroup
            options={resourcesOptions}
            selectedValues={formData.resources}
            onValueChange={(values) => handleChange('resources', values)}
          />
        </FormField>
        
        <FormField label="Injuries or Limitations" helperText="Do you have any injuries or conditions that limit exercise?">
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="E.g., knee pain, asthma, back injury"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            value={formData.injuries}
            onChangeText={(value) => handleChange('injuries', value)}
          />
        </FormField>
        
        <FormField label="Self-Rated Fitness" required>
          <RadioGroup
            options={fitnessRatingOptions}
            selectedValue={formData.selfRatedFitness}
            onValueChange={(value) => handleChange('selfRatedFitness', value)}
          />
        </FormField>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button 
          title="Next: Nutrition & Diet"
          onPress={handleNext}
          disabled={!formData.activityLevel || !formData.hasCurrentRoutine || formData.fitnessGoals.length === 0 || !formData.selfRatedFitness}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  progressContainer: {
    paddingHorizontal: spacing[5],
    paddingTop: spacing[3],
    paddingBottom: spacing[4],
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacing[5],
    paddingTop: spacing[4],
    paddingBottom: spacing[8],
  },
  sectionDescription: {
    ...typography.body,
    color: colors.gray[600],
    marginBottom: spacing[5],
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 8,
    padding: spacing[3],
    fontSize: 16,
    color: colors.gray[800],
    fontFamily: 'Inter-Regular',
  },
  textArea: {
    minHeight: 80,
    paddingTop: spacing[3],
  },
  footer: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    padding: spacing[5],
  },
});