import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing } from '@/constants/theme';
import { Button } from '@/components/Button';
import { FormField } from '@/components/FormField';
import { ProgressBar } from '@/components/ProgressBar';
import { useAssessmentStore } from '@/store/assessmentStore';

export default function MedicalScreen() {
  const { updateMedicalInfo, medicalInfo } = useAssessmentStore();
  
  const [formData, setFormData] = useState({
    chronicConditions: medicalInfo.chronicConditions || '',
    medications: medicalInfo.medications || '',
    recentHealthEvents: medicalInfo.recentHealthEvents || '',
    allergies: medicalInfo.allergies || '',
    currentMedicalCare: medicalInfo.currentMedicalCare || '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    updateMedicalInfo(formData);
    router.push('/(tabs)/assessment/additional-info');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.progressContainer}>
        <ProgressBar current={7} total={8} />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionDescription}>
          Please provide information about your medical history and current health conditions.
          This helps us ensure our recommendations are safe and appropriate for you.
        </Text>
        
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            Note: This information is kept confidential and is only used to customize your wellness plan.
            If you have serious health concerns, please consult with a healthcare provider.
          </Text>
        </View>
        
        <FormField 
          label="Chronic Conditions" 
          helperText="List any diagnosed medical conditions or chronic illnesses"
        >
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="E.g., asthma, diabetes, anxiety disorder, ADHD"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={formData.chronicConditions}
            onChangeText={(value) => handleChange('chronicConditions', value)}
          />
        </FormField>
        
        <FormField 
          label="Medications & Supplements" 
          helperText="List current medications and supplements with their purpose"
        >
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="E.g., antidepressants, ADHD medication, birth control, vitamins"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={formData.medications}
            onChangeText={(value) => handleChange('medications', value)}
          />
        </FormField>
        
        <FormField 
          label="Recent Health Events" 
          helperText="Any major health events or surgeries in the past year?"
        >
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="E.g., knee surgery last summer, recent concussion"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            value={formData.recentHealthEvents}
            onChangeText={(value) => handleChange('recentHealthEvents', value)}
          />
        </FormField>
        
        <FormField 
          label="Allergies" 
          helperText="List any allergies that could affect activities"
        >
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="E.g., severe pollen allergy, latex allergy"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            value={formData.allergies}
            onChangeText={(value) => handleChange('allergies', value)}
          />
        </FormField>
        
        <FormField 
          label="Current Medical Care" 
          helperText="Are you under a doctor's or counselor's care?"
        >
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="E.g., Physical therapy for back pain, counseling for anxiety"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            value={formData.currentMedicalCare}
            onChangeText={(value) => handleChange('currentMedicalCare', value)}
          />
        </FormField>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button 
          title="Next: Additional Information"
          onPress={handleNext}
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
    marginBottom: spacing[4],
  },
  disclaimer: {
    backgroundColor: colors.info[50],
    borderRadius: 8,
    padding: spacing[4],
    marginBottom: spacing[5],
  },
  disclaimerText: {
    ...typography.caption,
    color: colors.info[700],
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