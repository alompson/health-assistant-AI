import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Check, Clock, Clipboard } from 'lucide-react-native';
import { colors, typography, spacing } from '@/constants/theme';
import { Button } from '@/components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AssessmentIntro() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Wellness Assessment</Text>
          <Text style={styles.description}>
            Complete this assessment to receive personalized wellness recommendations. 
            Your responses will help us understand your needs and goals.
          </Text>
        </View>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <View style={styles.iconContainer}>
              <Clock size={20} color={colors.primary[500]} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>10-15 Minutes</Text>
              <Text style={styles.infoDescription}>to complete the assessment</Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <View style={styles.iconContainer}>
              <Clipboard size={20} color={colors.primary[500]} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>8 Sections</Text>
              <Text style={styles.infoDescription}>covering key wellness areas</Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <View style={styles.iconContainer}>
              <Check size={20} color={colors.primary[500]} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>Personalized Plan</Text>
              <Text style={styles.infoDescription}>based on your responses</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.sectionsContainer}>
          <Text style={styles.sectionsTitle}>Assessment Sections</Text>
          
          <View style={styles.sectionsList}>
            <View style={styles.sectionItem}>
              <View style={[styles.sectionBadge, { backgroundColor: colors.primary[100] }]}>
                <Text style={[styles.sectionNumber, { color: colors.primary[600] }]}>1</Text>
              </View>
              <Text style={styles.sectionName}>Personal Information</Text>
            </View>
            
            <View style={styles.sectionItem}>
              <View style={[styles.sectionBadge, { backgroundColor: colors.primary[100] }]}>
                <Text style={[styles.sectionNumber, { color: colors.primary[600] }]}>2</Text>
              </View>
              <Text style={styles.sectionName}>Fitness Profile</Text>
            </View>
            
            <View style={styles.sectionItem}>
              <View style={[styles.sectionBadge, { backgroundColor: colors.primary[100] }]}>
                <Text style={[styles.sectionNumber, { color: colors.primary[600] }]}>3</Text>
              </View>
              <Text style={styles.sectionName}>Nutrition & Dietary Habits</Text>
            </View>
            
            <View style={styles.sectionItem}>
              <View style={[styles.sectionBadge, { backgroundColor: colors.primary[100] }]}>
                <Text style={[styles.sectionNumber, { color: colors.primary[600] }]}>4</Text>
              </View>
              <Text style={styles.sectionName}>Mental Health & Stress</Text>
            </View>
            
            <View style={styles.sectionItem}>
              <View style={[styles.sectionBadge, { backgroundColor: colors.primary[100] }]}>
                <Text style={[styles.sectionNumber, { color: colors.primary[600] }]}>5</Text>
              </View>
              <Text style={styles.sectionName}>Sleep Habits</Text>
            </View>
            
            <View style={styles.sectionItem}>
              <View style={[styles.sectionBadge, { backgroundColor: colors.primary[100] }]}>
                <Text style={[styles.sectionNumber, { color: colors.primary[600] }]}>6</Text>
              </View>
              <Text style={styles.sectionName}>Lifestyle & Schedule</Text>
            </View>
            
            <View style={styles.sectionItem}>
              <View style={[styles.sectionBadge, { backgroundColor: colors.primary[100] }]}>
                <Text style={[styles.sectionNumber, { color: colors.primary[600] }]}>7</Text>
              </View>
              <Text style={styles.sectionName}>Medical History</Text>
            </View>
            
            <View style={styles.sectionItem}>
              <View style={[styles.sectionBadge, { backgroundColor: colors.primary[100] }]}>
                <Text style={[styles.sectionNumber, { color: colors.primary[600] }]}>8</Text>
              </View>
              <Text style={styles.sectionName}>Additional Information</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button 
          title="Begin Assessment"
          onPress={() => router.push('/(tabs)/assessment/personal-info')}
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacing[5],
    paddingTop: spacing[5],
    paddingBottom: spacing[10],
  },
  header: {
    marginBottom: spacing[6],
  },
  title: {
    ...typography.h1,
    color: colors.gray[900],
    marginBottom: spacing[2],
  },
  description: {
    ...typography.body,
    color: colors.gray[600],
    lineHeight: 24,
  },
  infoContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing[5],
    marginBottom: spacing[6],
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[3],
  },
  infoText: {
    flex: 1,
  },
  infoTitle: {
    ...typography.subtitle,
    color: colors.gray[900],
  },
  infoDescription: {
    ...typography.body,
    color: colors.gray[500],
  },
  sectionsContainer: {
    marginBottom: spacing[6],
  },
  sectionsTitle: {
    ...typography.h2,
    color: colors.gray[900],
    marginBottom: spacing[4],
  },
  sectionsList: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing[4],
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  sectionBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[3],
  },
  sectionNumber: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  sectionName: {
    ...typography.body,
    color: colors.gray[800],
  },
  footer: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    padding: spacing[5],
  },
});