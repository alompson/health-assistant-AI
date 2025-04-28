import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing } from '@/constants/theme';
import { Button } from '@/components/Button';
import { RadioGroup } from '@/components/RadioGroup';
import { FormField } from '@/components/FormField';
import { ProgressBar } from '@/components/ProgressBar';
import { useAssessmentStore } from '@/store/assessmentStore';

export default function LifestyleScreen() {
  const { updateLifestyleInfo, lifestyleInfo } = useAssessmentStore();
  
  const [formData, setFormData] = useState({
    academicWorkload: lifestyleInfo.academicWorkload || '',
    classSchedule: lifestyleInfo.classSchedule || '',
    employment: lifestyleInfo.employment || '',
    extracurriculars: lifestyleInfo.extracurriculars || '',
    freeTimeWindows: lifestyleInfo.freeTimeWindows || '',
    preferredActivityTime: lifestyleInfo.preferredActivityTime || '',
  });

  const workloadOptions = [
    { label: 'Less than 2 hours', value: 'less_2' },
    { label: '2-4 hours', value: '2_4' },
    { label: '4-6 hours', value: '4_6' },
    { label: '6-8 hours', value: '6_8' },
    { label: 'More than 8 hours', value: 'more_8' },
  ];

  const preferredTimeOptions = [
    { label: 'Morning', value: 'morning' },
    { label: 'Afternoon', value: 'afternoon' },
    { label: 'Evening', value: 'evening' },
    { label: 'Late night', value: 'late_night' },
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    updateLifestyleInfo(formData);
    router.push('/(tabs)/assessment/medical');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.progressContainer}>
        <ProgressBar current={6} total={8} />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionDescription}>
          Let's understand your daily schedule and routine.
        </Text>
        
        <FormField 
          label="Academic Workload" 
          required
          helperText="Hours spent in classes and studying per weekday"
        >
          <RadioGroup
            options={workloadOptions}
            selectedValue={formData.academicWorkload}
            onValueChange={(value) => handleChange('academicWorkload', value)}
          />
        </FormField>
        
        <FormField 
          label="Class Schedule" 
          required
          helperText="Describe your typical class schedule"
        >
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="E.g., Consistent 9am-3pm each day or M/W/F afternoon classes"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            value={formData.classSchedule}
            onChangeText={(value) => handleChange('classSchedule', value)}
          />
        </FormField>
        
        <FormField 
          label="Employment" 
          helperText="Do you have a part-time job or internship?"
        >
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="E.g., Part-time job, 15 hours/week, evenings"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            value={formData.employment}
            onChangeText={(value) => handleChange('employment', value)}
          />
        </FormField>
        
        <FormField 
          label="Extracurricular Activities" 
          helperText="Are you involved in any clubs or activities?"
        >
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="E.g., Soccer club (4hrs/week), volunteer work (2hrs/week)"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            value={formData.extracurriculars}
            onChangeText={(value) => handleChange('extracurriculars', value)}
          />
        </FormField>
        
        <FormField 
          label="Free Time Windows" 
          required
          helperText="When do you usually have free time?"
        >
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="E.g., Weekdays after 6pm and weekend mornings"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            value={formData.freeTimeWindows}
            onChangeText={(value) => handleChange('freeTimeWindows', value)}
          />
        </FormField>
        
        <FormField 
          label="Preferred Activity Time" 
          required
          helperText="When do you prefer to exercise or do self-care activities?"
        >
          <RadioGroup
            options={preferredTimeOptions}
            selectedValue={formData.preferredActivityTime}
            onValueChange={(value) => handleChange('preferredActivityTime', value)}
          />
        </FormField>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button 
          title="Next: Medical History"
          onPress={handleNext}
          disabled={
            !formData.academicWorkload ||
            !formData.classSchedule ||
            !formData.freeTimeWindows ||
            !formData.preferredActivityTime
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