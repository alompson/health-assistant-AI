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

export default function NutritionScreen() {
  const { updateNutritionInfo, nutritionInfo } = useAssessmentStore();
  
  const [formData, setFormData] = useState({
    dietaryPreferences: nutritionInfo.dietaryPreferences || [],
    currentDietPattern: nutritionInfo.currentDietPattern || '',
    mealRegularity: nutritionInfo.mealRegularity || '',
    snacking: nutritionInfo.snacking || '',
    dietQuality: nutritionInfo.dietQuality || '',
    fruitVeggieIntake: nutritionInfo.fruitVeggieIntake || '',
    beverages: nutritionInfo.beverages || '',
    caffeineIntake: nutritionInfo.caffeineIntake || '',
  });

  const dietaryPreferencesOptions = [
    { label: 'Vegetarian', value: 'vegetarian' },
    { label: 'Vegan', value: 'vegan' },
    { label: 'Gluten-free', value: 'gluten_free' },
    { label: 'Lactose-free', value: 'lactose_free' },
    { label: 'Halal/Kosher', value: 'halal_kosher' },
    { label: 'Food allergies', value: 'allergies' },
    { label: 'No particular restrictions', value: 'none' },
  ];

  const mealRegularityOptions = [
    { label: 'Never skip meals', value: 'never' },
    { label: 'Occasionally skip meals', value: 'occasionally' },
    { label: 'Frequently skip meals', value: 'frequently' },
  ];

  const snackingOptions = [
    { label: 'Rarely', value: 'rarely' },
    { label: 'Some days', value: 'some_days' },
    { label: 'Most days', value: 'most_days' },
    { label: 'Almost constantly grazing', value: 'constant' },
  ];

  const dietQualityOptions = [
    { label: '1 - Very poor (lots of junk food)', value: '1' },
    { label: '2 - Below average', value: '2' },
    { label: '3 - Average', value: '3' },
    { label: '4 - Above average', value: '4' },
    { label: '5 - Very healthy and balanced', value: '5' },
  ];

  const fruitVeggieOptions = [
    { label: '0 servings', value: '0' },
    { label: '1-2 servings', value: '1_2' },
    { label: '3-4 servings', value: '3_4' },
    { label: '5+ servings', value: '5_plus' },
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    updateNutritionInfo(formData);
    router.push('/(tabs)/assessment/mental-health');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.progressContainer}>
        <ProgressBar current={3} total={8} />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionDescription}>
          Let's understand your eating habits and nutritional preferences.
        </Text>
        
        <FormField 
          label="Dietary Preferences/Restrictions" 
          required 
          helperText="Select all that apply"
        >
          <CheckboxGroup
            options={dietaryPreferencesOptions}
            selectedValues={formData.dietaryPreferences}
            onValueChange={(values) => handleChange('dietaryPreferences', values)}
          />
        </FormField>
        
        <FormField 
          label="Current Diet Pattern" 
          helperText="Describe your typical daily eating pattern"
        >
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="E.g., 3 meals a day, rarely snack or Skip breakfast, eat a big dinner"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            value={formData.currentDietPattern}
            onChangeText={(value) => handleChange('currentDietPattern', value)}
          />
        </FormField>
        
        <FormField label="Meal Regularity" required>
          <RadioGroup
            options={mealRegularityOptions}
            selectedValue={formData.mealRegularity}
            onValueChange={(value) => handleChange('mealRegularity', value)}
          />
        </FormField>
        
        <FormField label="Snacking & Late Eating" required>
          <RadioGroup
            options={snackingOptions}
            selectedValue={formData.snacking}
            onValueChange={(value) => handleChange('snacking', value)}
          />
        </FormField>
        
        <FormField label="Quality of Diet" required>
          <RadioGroup
            options={dietQualityOptions}
            selectedValue={formData.dietQuality}
            onValueChange={(value) => handleChange('dietQuality', value)}
          />
        </FormField>
        
        <FormField label="Fruit & Vegetable Intake" required>
          <RadioGroup
            options={fruitVeggieOptions}
            selectedValue={formData.fruitVeggieIntake}
            onValueChange={(value) => handleChange('fruitVeggieIntake', value)}
          />
        </FormField>
        
        <FormField 
          label="Beverages" 
          helperText="What do you typically drink throughout the day?"
        >
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="E.g., Water (8 cups), coffee (2 cups), occasional soda"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            value={formData.beverages}
            onChangeText={(value) => handleChange('beverages', value)}
          />
        </FormField>
        
        <FormField 
          label="Caffeine Intake" 
          helperText="How many caffeinated drinks do you have per day, and at what times?"
        >
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="E.g., Coffee at 8am and 2pm, energy drink around 4pm"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            value={formData.caffeineIntake}
            onChangeText={(value) => handleChange('caffeineIntake', value)}
          />
        </FormField>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button 
          title="Next: Mental Health"
          onPress={handleNext}
          disabled={!formData.mealRegularity || !formData.snacking || !formData.dietQuality || !formData.fruitVeggieIntake}
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