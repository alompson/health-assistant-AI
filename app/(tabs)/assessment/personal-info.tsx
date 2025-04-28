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

export default function PersonalInfo() {
  const { updatePersonalInfo, personalInfo } = useAssessmentStore();
  
  const [formData, setFormData] = useState({
    age: personalInfo.age || '',
    biologicalSex: personalInfo.biologicalSex || '',
    primaryGoals: personalInfo.primaryGoals || [],
    topPriority: personalInfo.topPriority || '',
    motivation: personalInfo.motivation || '',
    obstacles: personalInfo.obstacles || ''
  });

  const biologicalSexOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' }
  ];

  const wellnessGoalsOptions = [
    { label: 'Improve fitness', value: 'improve_fitness' },
    { label: 'Better stress management', value: 'stress_management' },
    { label: 'Improve mental health/mood', value: 'mental_health' },
    { label: 'Enhance sleep quality', value: 'sleep_quality' },
    { label: 'Improve nutrition', value: 'nutrition' },
    { label: 'Other', value: 'other' }
  ];

  const goalPriorityOptions = wellnessGoalsOptions.map(goal => ({
    label: goal.label,
    value: goal.value
  }));

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    updatePersonalInfo(formData);
    router.push('/(tabs)/assessment/fitness');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.progressContainer}>
        <ProgressBar current={1} total={8} />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionDescription}>
          Let's start with some basic information about you and your wellness goals.
        </Text>
        
        <FormField label="Age" required>
          <TextInput
            style={styles.input}
            placeholder="Enter your age"
            keyboardType="number-pad"
            value={formData.age}
            onChangeText={(value) => handleChange('age', value)}
          />
        </FormField>
        
        <FormField label="Biological Sex" required>
          <RadioGroup
            options={biologicalSexOptions}
            selectedValue={formData.biologicalSex}
            onValueChange={(value) => handleChange('biologicalSex', value)}
          />
        </FormField>
        
        <FormField label="Primary Wellness Goals" required helperText="Select all that apply">
          <CheckboxGroup
            options={wellnessGoalsOptions}
            selectedValues={formData.primaryGoals}
            onValueChange={(values) => handleChange('primaryGoals', values)}
          />
        </FormField>
        
        {formData.primaryGoals.length > 1 && (
          <FormField label="Top Priority Goal" required>
            <RadioGroup
              options={goalPriorityOptions.filter(option => 
                formData.primaryGoals.includes(option.value)
              )}
              selectedValue={formData.topPriority}
              onValueChange={(value) => handleChange('topPriority', value)}
            />
          </FormField>
        )}
        
        <FormField label="Motivation" helperText="Why are these goals important to you?">
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="E.g., I want more energy and less anxiety to handle school"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={formData.motivation}
            onChangeText={(value) => handleChange('motivation', value)}
          />
        </FormField>
        
        <FormField label="Biggest Obstacles" helperText="What challenges do you face in achieving your wellness goals?">
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="E.g., lack of time, low motivation, injuries, academic pressure"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={formData.obstacles}
            onChangeText={(value) => handleChange('obstacles', value)}
          />
        </FormField>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button 
          title="Next: Fitness Profile"
          onPress={handleNext}
          disabled={!formData.age || !formData.biologicalSex || formData.primaryGoals.length === 0}
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
    minHeight: 100,
    paddingTop: spacing[3],
  },
  footer: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    padding: spacing[5],
  },
});