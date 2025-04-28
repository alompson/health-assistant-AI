import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing } from '@/constants/theme';
import { Activity, Brain, Utensils, Moon } from 'lucide-react-native';
import { Card } from '@/components/Card';
import { useState } from 'react';
import { useAssessmentStore } from '@/store/assessmentStore';

export default function ResultsScreen() {
  const { results } = useAssessmentStore();
  const [activeTab, setActiveTab] = useState('overview');

  // If no results available yet
  if (!results.timestamp) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.noResults}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/4098224/pexels-photo-4098224.jpeg' }}
            style={styles.noResultsImage}
            resizeMode="cover"
          />
          <Text style={styles.noResultsTitle}>No Assessment Results Yet</Text>
          <Text style={styles.noResultsDescription}>
            Complete the wellness assessment to receive your personalized recommendations.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Wellness Plan</Text>
        <Text style={styles.headerDate}>
          Generated on {new Date(results.timestamp).toLocaleDateString()}
        </Text>
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.scoreContainer}>
          <View style={styles.scoreCircle}>
            <Text style={styles.scoreValue}>{results.overallWellnessScore}</Text>
          </View>
          <Text style={styles.scoreLabel}>Wellness Score</Text>
          <Text style={styles.scoreDescription}>
            Your score indicates areas where you're doing well and opportunities for improvement.
          </Text>
        </View>
        
        <View style={styles.tabsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsScrollContent}
          >
            <Text
              style={[
                styles.tab,
                activeTab === 'overview' && styles.activeTab,
                activeTab === 'overview' && { color: colors.primary[700] }
              ]}
              onPress={() => setActiveTab('overview')}
            >
              Overview
            </Text>
            <Text
              style={[
                styles.tab,
                activeTab === 'fitness' && styles.activeTab,
                activeTab === 'fitness' && { color: colors.primary[700] }
              ]}
              onPress={() => setActiveTab('fitness')}
            >
              Fitness
            </Text>
            <Text
              style={[
                styles.tab,
                activeTab === 'nutrition' && styles.activeTab,
                activeTab === 'nutrition' && { color: colors.primary[700] }
              ]}
              onPress={() => setActiveTab('nutrition')}
            >
              Nutrition
            </Text>
            <Text
              style={[
                styles.tab,
                activeTab === 'mental' && styles.activeTab,
                activeTab === 'mental' && { color: colors.primary[700] }
              ]}
              onPress={() => setActiveTab('mental')}
            >
              Mental Health
            </Text>
            <Text
              style={[
                styles.tab,
                activeTab === 'sleep' && styles.activeTab,
                activeTab === 'sleep' && { color: colors.primary[700] }
              ]}
              onPress={() => setActiveTab('sleep')}
            >
              Sleep
            </Text>
          </ScrollView>
        </View>
        
        {activeTab === 'overview' && (
          <View style={styles.overviewContainer}>
            <Text style={styles.sectionTitle}>Key Recommendations</Text>
            
            <Card style={styles.recommendationCard}>
              <View style={styles.recommendationHeader}>
                <View style={[styles.iconContainer, { backgroundColor: colors.primary[50] }]}>
                  <Activity size={20} color={colors.primary[500]} />
                </View>
                <Text style={styles.recommendationTitle}>Fitness</Text>
              </View>
              <Text style={styles.recommendationText}>
                {results.fitnessRecommendations}
              </Text>
            </Card>
            
            <Card style={styles.recommendationCard}>
              <View style={styles.recommendationHeader}>
                <View style={[styles.iconContainer, { backgroundColor: colors.secondary[50] }]}>
                  <Utensils size={20} color={colors.secondary[500]} />
                </View>
                <Text style={styles.recommendationTitle}>Nutrition</Text>
              </View>
              <Text style={styles.recommendationText}>
                {results.nutritionRecommendations}
              </Text>
            </Card>
            
            <Card style={styles.recommendationCard}>
              <View style={styles.recommendationHeader}>
                <View style={[styles.iconContainer, { backgroundColor: colors.accent[50] }]}>
                  <Brain size={20} color={colors.accent[500]} />
                </View>
                <Text style={styles.recommendationTitle}>Mental Health</Text>
              </View>
              <Text style={styles.recommendationText}>
                {results.mentalHealthRecommendations}
              </Text>
            </Card>
            
            <Card style={styles.recommendationCard}>
              <View style={styles.recommendationHeader}>
                <View style={[styles.iconContainer, { backgroundColor: colors.info[50] }]}>
                  <Moon size={20} color={colors.info[500]} />
                </View>
                <Text style={styles.recommendationTitle}>Sleep</Text>
              </View>
              <Text style={styles.recommendationText}>
                {results.sleepRecommendations}
              </Text>
            </Card>
            
            <View style={styles.priorityAreas}>
              <Text style={styles.priorityTitle}>Priority Focus Areas</Text>
              <View style={styles.priorityTags}>
                {results.priorityAreas.map((area, index) => (
                  <View key={index} style={styles.priorityTag}>
                    <Text style={styles.priorityTagText}>
                      {area.replace(/_/g, ' ')}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
            
            <View style={styles.disclaimer}>
              <Text style={styles.disclaimerText}>
                Remember: This assessment provides general guidance only. For personalized medical advice, 
                please consult with healthcare professionals.
              </Text>
            </View>
          </View>
        )}
        
        {activeTab === 'fitness' && (
          <View style={styles.detailContainer}>
            <Text style={styles.detailTitle}>Fitness Recommendations</Text>
            <Text style={styles.detailText}>{results.fitnessRecommendations}</Text>
          </View>
        )}
        
        {activeTab === 'nutrition' && (
          <View style={styles.detailContainer}>
            <Text style={styles.detailTitle}>Nutrition Recommendations</Text>
            <Text style={styles.detailText}>{results.nutritionRecommendations}</Text>
          </View>
        )}
        
        {activeTab === 'mental' && (
          <View style={styles.detailContainer}>
            <Text style={styles.detailTitle}>Mental Health Recommendations</Text>
            <Text style={styles.detailText}>{results.mentalHealthRecommendations}</Text>
          </View>
        )}
        
        {activeTab === 'sleep' && (
          <View style={styles.detailContainer}>
            <Text style={styles.detailTitle}>Sleep Recommendations</Text>
            <Text style={styles.detailText}>{results.sleepRecommendations}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing[5],
    paddingTop: spacing[6],
    paddingBottom: spacing[4],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  headerTitle: {
    ...typography.h1,
    color: colors.gray[900],
  },
  headerDate: {
    ...typography.body,
    color: colors.gray[500],
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: spacing[8],
  },
  scoreContainer: {
    alignItems: 'center',
    paddingVertical: spacing[6],
    paddingHorizontal: spacing[5],
    backgroundColor: colors.white,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary[50],
    borderWidth: 4,
    borderColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  scoreValue: {
    ...typography.h1,
    fontSize: 40,
    color: colors.primary[700],
  },
  scoreLabel: {
    ...typography.subtitle,
    color: colors.gray[900],
    marginBottom: spacing[2],
  },
  scoreDescription: {
    ...typography.body,
    color: colors.gray[600],
    textAlign: 'center',
    maxWidth: 300,
  },
  tabsContainer: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  tabsScrollContent: {
    paddingHorizontal: spacing[4],
  },
  tab: {
    ...typography.subtitle,
    color: colors.gray[500],
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    marginRight: spacing[2],
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary[500],
  },
  overviewContainer: {
    padding: spacing[5],
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.gray[900],
    marginBottom: spacing[4],
  },
  recommendationCard: {
    marginBottom: spacing[4],
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[3],
  },
  recommendationTitle: {
    ...typography.subtitle,
    color: colors.gray[900],
  },
  recommendationText: {
    ...typography.body,
    color: colors.gray[700],
    lineHeight: 22,
  },
  priorityAreas: {
    marginTop: spacing[4],
  },
  priorityTitle: {
    ...typography.subtitle,
    color: colors.gray[900],
    marginBottom: spacing[3],
  },
  priorityTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  priorityTag: {
    backgroundColor: colors.primary[50],
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    borderRadius: 16,
    marginRight: spacing[2],
    marginBottom: spacing[2],
  },
  priorityTagText: {
    ...typography.caption,
    color: colors.primary[700],
    textTransform: 'capitalize',
  },
  disclaimer: {
    marginTop: spacing[6],
    padding: spacing[4],
    backgroundColor: colors.gray[100],
    borderRadius: 8,
  },
  disclaimerText: {
    ...typography.caption,
    color: colors.gray[600],
    lineHeight: 18,
  },
  detailContainer: {
    padding: spacing[5],
  },
  detailTitle: {
    ...typography.h2,
    color: colors.gray[900],
    marginBottom: spacing[4],
  },
  detailText: {
    ...typography.body,
    color: colors.gray[700],
    lineHeight: 24,
  },
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[5],
  },
  noResultsImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: spacing[5],
  },
  noResultsTitle: {
    ...typography.h2,
    color: colors.gray[900],
    marginBottom: spacing[3],
    textAlign: 'center',
  },
  noResultsDescription: {
    ...typography.body,
    color: colors.gray[600],
    textAlign: 'center',
    maxWidth: 300,
  },
});