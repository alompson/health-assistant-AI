import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowRight, BookOpen, Heart, SquareActivity as ActivitySquare } from 'lucide-react-native';
import { colors, typography, spacing } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome to</Text>
          <Text style={styles.appName}>Wellness Assessment</Text>
          <Text style={styles.subtitle}>
            Discover your personalized wellness recommendations with our AI-powered assessment
          </Text>
        </View>
        
        <Image
          source={{ uri: 'https://images.pexels.com/photos/2035066/pexels-photo-2035066.jpeg' }}
          style={styles.heroImage}
          resizeMode="cover"
        />
        
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          
          <View style={styles.stepCard}>
            <View style={styles.stepIconContainer}>
              <BookOpen size={20} color={colors.white} />
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Complete the Assessment</Text>
              <Text style={styles.stepDescription}>
                Answer questions about your lifestyle, goals, and health needs
              </Text>
            </View>
          </View>
          
          <View style={styles.stepCard}>
            <View style={[styles.stepIconContainer, { backgroundColor: colors.secondary[500] }]}>
              <ActivitySquare size={20} color={colors.white} />
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>AI Analysis</Text>
              <Text style={styles.stepDescription}>
                Our system will analyze your responses to generate recommendations
              </Text>
            </View>
          </View>
          
          <View style={styles.stepCard}>
            <View style={[styles.stepIconContainer, { backgroundColor: colors.accent[500] }]}>
              <Heart size={20} color={colors.white} />
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Get Your Plan</Text>
              <Text style={styles.stepDescription}>
                Receive a personalized wellness plan based on your unique needs
              </Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => router.push('/(tabs)/assessment')}
          activeOpacity={0.8}
        >
          <Text style={styles.startButtonText}>Start Assessment</Text>
          <ArrowRight size={18} color={colors.white} />
        </TouchableOpacity>
      </ScrollView>
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
    paddingBottom: spacing[8],
  },
  header: {
    paddingHorizontal: spacing[5],
    paddingTop: spacing[6],
    paddingBottom: spacing[5],
  },
  greeting: {
    ...typography.body,
    color: colors.gray[600],
    marginBottom: spacing[1],
  },
  appName: {
    ...typography.h1,
    color: colors.gray[900],
    marginBottom: spacing[2],
  },
  subtitle: {
    ...typography.body,
    color: colors.gray[600],
    lineHeight: 22,
  },
  heroImage: {
    width: '100%',
    height: 200,
    marginBottom: spacing[6],
  },
  infoSection: {
    paddingHorizontal: spacing[5],
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.gray[900],
    marginBottom: spacing[4],
  },
  stepCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing[4],
    marginBottom: spacing[3],
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  stepIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[3],
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    ...typography.subtitle,
    color: colors.gray[900],
    marginBottom: spacing[1],
  },
  stepDescription: {
    ...typography.body,
    color: colors.gray[600],
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary[500],
    borderRadius: 12,
    padding: spacing[4],
    marginHorizontal: spacing[5],
    marginTop: spacing[6],
  },
  startButtonText: {
    ...typography.button,
    color: colors.white,
    marginRight: spacing[2],
  },
});