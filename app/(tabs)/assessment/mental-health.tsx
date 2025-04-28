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

export default function MentalHealthScreen() {
  const { updateMentalHealthInfo, mentalHealthInfo } = useAssessmentStore();
  
  const [formData, setFormData] = useState({
    interestInActivities: mentalHealthInfo.interestInActivities || '',
    feelingDepressed: mentalHealthInfo.feelingDepressed || '',
    nervousAnxious: mentalHealthInfo.nervousAnxious || '',
    uncontrollableWorry: mentalHealthInfo.uncontrollableWorry || '',
    stressTriggers: mentalHealthInfo.stressTriggers || [],
    currentMentalHealthSupport: mentalHealthInfo.currentMentalHealthSupport || '',
    overallMentalWellbeing: mentalHealthInfo.overallMentalWellbeing || '',
  });

  const frequencyOptions = [
    { label: 'Not at all', value: 'not_at_all' },
    { label: 'Several days', value: 'several_days' },
    { label: 'More than half the days', value: 'more_than_half' },
    { label: 'Nearly every day', value: 'nearly_every_day' },
  ];

  const stressTriggersOptions = [
    { label: 'Academics', value: 'academics' },
    { label: 'Exams/Test anxiety', value: 'exams' },
    { label: 'Financial concerns', value: 'financial' },
    { label: 'Social relationships', value: 'social' },
    { label: 'Family issues', value: 'family' },
    { label: 'Health concerns', value: 'health' },
    { label: 'Uncertainty about future', value: 'future' },
    { label: 'Other', value: 'other' },
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    updateMentalHealthInfo(formData);
    router.push('/(tabs)/assessment/sleep');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.progressContainer}>
        <ProgressBar current={4} total={8} />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionDescription}>
          Over the last 2 weeks, how often have you been bothered by the following?
        </Text>
        
        <FormField 
          label="Little interest or pleasure in doing things" 
          required
        >
          <RadioGroup
            options={frequencyOptions}
            selectedValue={formData.interestInActivities}
            onValueChange={(value) => handleChange('interestInActivities', value)}
          />
        </FormField>
        
        <FormField 
          label="Feeling down, depressed, or hopeless" 
          required
        >
          <RadioGroup
            options={frequencyOptions}
            selectedValue={formData.feelingDepressed}
            onValueChange={(value) => handleChange('feelingDepressed', value)}
          />
        </FormField>
        
        <FormField 
          label="Feeling nervous, anxious, or on edge" 
          required
        >
          <RadioGroup
            options={frequencyOptions}
            selectedValue={formData.nervousAnxious}
            onValueChange={(value) => handleChange('nervousAnxious', value)}
          />
        </FormField>
        
        <FormField 
          label="Not being able to stop or control worrying" 
          required
        >
          <RadioGroup
            options={frequencyOptions}
            selectedValue={formData.uncontrollableWorry}
            onValueChange={(value) => handleChange('uncontrollableWorry', value)}
          />
        </FormField>
        
        <FormField 
          label="Sources of Mental Stress" 
          required
          helperText="Select all that apply"
        >
          <CheckboxGroup
            options={stressTriggersOptions}
            selectedValues={formData.stressTriggers}
            onValueChange={(values) => handleChange('stressTriggers', values)}
          />
        </FormField>
        
        <FormField 
          label="Current Mental Health Support" 
          helperText="Are you currently receiving any support for mental health?"
        >
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="E.g., Counseling, therapy, support group, medication"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            value={formData.currentMentalHealthSupport}
            onChangeText={(value) => handleChange('currentMentalHealthSupport', value)}
          />
        </FormField>
        
        <FormField 
          label="Overall Mental/Emotional Well-being" 
          helperText="How would you describe your overall mental/emotional well-being right now?"
        >
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="E.g., Generally okay but some anxiety around exams"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            value={formData.overallMentalWellbeing}
            onChangeText={(value) => handleChange('overallMentalWellbeing', value)}
          />
        </FormField>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button 
          title="Next: Sleep Habits"
          onPress={handleNext}
          disabled={
            !formData.interestInActivities || 
            !formData.feelingDepressed || 
            !formData.nervousAnxious || 
            !formData.uncontrollableWorry || 
            formData.stressTriggers.length === 0
          }
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