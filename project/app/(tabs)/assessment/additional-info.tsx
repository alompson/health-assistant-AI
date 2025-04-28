import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing } from '@/constants/theme';
import { Button } from '@/components/Button';
import { FormField } from '@/components/FormField';
import { ProgressBar } from '@/components/ProgressBar';
import { useAssessmentStore } from '@/store/assessmentStore';

export default function AdditionalInfo() {
  const { updateAdditionalInfo, additionalInfo } = useAssessmentStore();
  
  const [formData, setFormData] = useState({
    otherConsiderations: additionalInfo.otherConsiderations || '',
    expectationsOrRequests: additionalInfo.expectationsOrRequests || '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    updateAdditionalInfo(formData);
    
    // Confirm submission with the user
    Alert.alert(
      "Submit Assessment",
      "You've completed all sections of the wellness assessment. Ready to see your results?",
      [
        {
          text: "Review Answers",
          style: "cancel"
        },
        {
          text: "Submit",
          onPress: () => router.push('/(tabs)/assessment/analyzing')
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.progressContainer}>
        <ProgressBar current={8} total={8} />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionDescription}>
          We've covered a lot, but everyone is unique. Let us know if there's anything else 
          that would help us create a better wellness plan for you.
        </Text>
        
        <FormField label="Other Considerations" helperText="Is there any other information about your health, lifestyle, or preferences we should know?">
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="E.g., religious practices, upcoming events, personal preferences"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={formData.otherConsiderations}
            onChangeText={(value) => handleChange('otherConsiderations', value)}
          />
        </FormField>
        
        <FormField label="Expectations or Requests" helperText="Do you have any specific expectations or requests for your plan?">
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="E.g., I want a plan that doesn't require a gym, stress management techniques I can do in 5 minutes"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={formData.expectationsOrRequests}
            onChangeText={(value) => handleChange('expectationsOrRequests', value)}
          />
        </FormField>
        
        <View style={styles.completionBox}>
          <Text style={styles.completionTitle}>Assessment Complete!</Text>
          <Text style={styles.completionDescription}>
            You've completed all sections of the wellness assessment. Submit your responses to 
            receive your personalized wellness recommendations.
          </Text>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button 
          title="Submit Assessment"
          onPress={handleSubmit}
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
  completionBox: {
    backgroundColor: colors.success[50],
    borderRadius: 12,
    padding: spacing[4],
    marginTop: spacing[6],
    borderWidth: 1,
    borderColor: colors.success[200],
  },
  completionTitle: {
    ...typography.subtitle,
    color: colors.success[700],
    marginBottom: spacing[2],
  },
  completionDescription: {
    ...typography.body,
    color: colors.success[800],
  },
  footer: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    padding: spacing[5],
  },
});