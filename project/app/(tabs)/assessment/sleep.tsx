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

export default function SleepScreen() {
  const { updateSleepInfo, sleepInfo } = useAssessmentStore();
  
  const [formData, setFormData] = useState({
    weekdayBedtime: sleepInfo.weekdayBedtime || '',
    weekdayWakeTime: sleepInfo.weekdayWakeTime || '',
    weekendBedtime: sleepInfo.weekendBedtime || '',
    weekendWakeTime: sleepInfo.weekendWakeTime || '',
    weekdaySleepHours: sleepInfo.weekdaySleepHours || '',
    weekendSleepHours: sleepInfo.weekendSleepHours || '',
    sleepQuality: sleepInfo.sleepQuality || '',
    timeToFallAsleep: sleepInfo.timeToFallAsleep || '',
    nightAwakenings: sleepInfo.nightAwakenings || '',
    electronicsBeforeBed: sleepInfo.electronicsBeforeBed || '',
  });

  const sleepQualityOptions = [
    { label: 'Very good', value: 'very_good' },
    { label: 'Fairly good', value: 'fairly_good' },
    { label: 'Fairly bad', value: 'fairly_bad' },
    { label: 'Very bad', value: 'very_bad' },
  ];

  const timeToSleepOptions = [
    { label: 'Less than 15 minutes', value: 'less_15' },
    { label: '15-30 minutes', value: '15_30' },
    { label: '30-60 minutes', value: '30_60' },
    { label: 'Over 1 hour', value: 'over_60' },
  ];

  const awakeningsOptions = [
    { label: 'Rarely/Never', value: 'rarely' },
    { label: 'Occasionally', value: 'occasionally' },
    { label: 'Frequently (multiple times a week)', value: 'frequently' },
  ];

  const electronicsOptions = [
    { label: 'Never', value: 'never' },
    { label: 'Occasionally', value: 'occasionally' },
    { label: 'Most nights', value: 'most_nights' },
    { label: 'Every night', value: 'every_night' },
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    updateSleepInfo(formData);
    router.push('/(tabs)/assessment/lifestyle');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.progressContainer}>
        <ProgressBar current={5} total={8} />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionDescription}>
          Let's understand your sleep patterns and quality.
        </Text>
        
        <FormField 
          label="Weekday Bedtime" 
          required
        >
          <TextInput
            style={styles.input}
            placeholder="E.g., 11:00 PM"
            value={formData.weekdayBedtime}
            onChangeText={(value) => handleChange('weekdayBedtime', value)}
          />
        </FormField>
        
        <FormField 
          label="Weekday Wake Time" 
          required
        >
          <TextInput
            style={styles.input}
            placeholder="E.g., 7:00 AM"
            value={formData.weekdayWakeTime}
            onChangeText={(value) => handleChange('weekdayWakeTime', value)}
          />
        </FormField>
        
        <FormField 
          label="Weekend Bedtime" 
          required
        >
          <TextInput
            style={styles.input}
            placeholder="E.g., 12:00 AM"
            value={formData.weekendBedtime}
            onChangeText={(value) => handleChange('weekendBedtime', value)}
          />
        </FormField>
        
        <FormField 
          label="Weekend Wake Time" 
          required
        >
          <TextInput
            style={styles.input}
            placeholder="E.g., 9:00 AM"
            value={formData.weekendWakeTime}
            onChangeText={(value) => handleChange('weekendWakeTime', value)}
          />
        </FormField>
        
        <FormField 
          label="Sleep Quality" 
          required
        >
          <RadioGroup
            options={sleepQualityOptions}
            selectedValue={formData.sleepQuality}
            onValueChange={(value) => handleChange('sleepQuality', value)}
          />
        </FormField>
        
        <FormField 
          label="Time to Fall Asleep" 
          required
        >
          <RadioGroup
            options={timeToSleepOptions}
            selectedValue={formData.timeToFallAsleep}
            onValueChange={(value) => handleChange('timeToFallAsleep', value)}
          />
        </FormField>
        
        <FormField 
          label="Night Awakenings" 
          required
          helperText="Do you often wake up during the night or very early morning?"
        >
          <RadioGroup
            options={awakeningsOptions}
            selectedValue={formData.nightAwakenings}
            onValueChange={(value) => handleChange('nightAwakenings', value)}
          />
        </FormField>
        
        <FormField 
          label="Electronics Before Bed" 
          required
          helperText="Do you use electronics (phone, computer, TV) before bed?"
        >
          <RadioGroup
            options={electronicsOptions}
            selectedValue={formData.electronicsBeforeBed}
            onValueChange={(value) => handleChange('electronicsBeforeBed', value)}
          />
        </FormField>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button 
          title="Next: Lifestyle & Schedule"
          onPress={handleNext}
          disabled={
            !formData.weekdayBedtime ||
            !formData.weekdayWakeTime ||
            !formData.weekendBedtime ||
            !formData.weekendWakeTime ||
            !formData.sleepQuality ||
            !formData.timeToFallAsleep ||
            !formData.nightAwakenings ||
            !formData.electronicsBeforeBed
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
  footer: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    padding: spacing[5],
  },
});