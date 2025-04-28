import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing } from '@/constants/theme';
import { Settings, LogOut, Calendar, ChartBar as BarChart2, Clipboard, Award } from 'lucide-react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Alex Johnson</Text>
            <Text style={styles.profileEmail}>alex.johnson@example.com</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color={colors.gray[600]} />
        </TouchableOpacity>
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>1</Text>
            <Text style={styles.statLabel}>Assessments</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>72</Text>
            <Text style={styles.statLabel}>Wellness Score</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>Sep 6</Text>
            <Text style={styles.statLabel}>Last Updated</Text>
          </View>
        </View>
        
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <View style={[styles.menuIconContainer, { backgroundColor: colors.primary[50] }]}>
                <Clipboard size={20} color={colors.primary[500]} />
              </View>
              <Text style={styles.menuItemText}>Assessment History</Text>
            </View>
            <Text style={styles.menuItemChevron}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <View style={[styles.menuIconContainer, { backgroundColor: colors.secondary[50] }]}>
                <BarChart2 size={20} color={colors.secondary[500]} />
              </View>
              <Text style={styles.menuItemText}>Progress Tracking</Text>
            </View>
            <Text style={styles.menuItemChevron}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <View style={[styles.menuIconContainer, { backgroundColor: colors.accent[50] }]}>
                <Calendar size={20} color={colors.accent[500]} />
              </View>
              <Text style={styles.menuItemText}>Schedule Assessment</Text>
            </View>
            <Text style={styles.menuItemChevron}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <View style={[styles.menuIconContainer, { backgroundColor: colors.success[50] }]}>
                <Award size={20} color={colors.success[500]} />
              </View>
              <Text style={styles.menuItemText}>Achievements</Text>
            </View>
            <Text style={styles.menuItemChevron}>›</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <View style={[styles.menuIconContainer, { backgroundColor: colors.warning[50] }]}>
                <Settings size={20} color={colors.warning[500]} />
              </View>
              <Text style={styles.menuItemText}>Settings</Text>
            </View>
            <Text style={styles.menuItemChevron}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <View style={[styles.menuIconContainer, { backgroundColor: colors.error[50] }]}>
                <LogOut size={20} color={colors.error[500]} />
              </View>
              <Text style={styles.menuItemText}>Log Out</Text>
            </View>
            <Text style={styles.menuItemChevron}>›</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Wellness Assessment v1.0.0</Text>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[5],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: spacing[3],
  },
  profileInfo: {
    justifyContent: 'center',
  },
  profileName: {
    ...typography.subtitle,
    color: colors.gray[900],
    marginBottom: spacing[1],
  },
  profileEmail: {
    ...typography.body,
    color: colors.gray[500],
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: spacing[8],
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingVertical: spacing[4],
    marginBottom: spacing[4],
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...typography.h2,
    color: colors.primary[600],
    marginBottom: spacing[1],
  },
  statLabel: {
    ...typography.caption,
    color: colors.gray[500],
  },
  divider: {
    width: 1,
    height: '80%',
    alignSelf: 'center',
    backgroundColor: colors.gray[200],
  },
  menuSection: {
    marginBottom: spacing[5],
    paddingHorizontal: spacing[5],
  },
  sectionTitle: {
    ...typography.subtitle,
    color: colors.gray[700],
    marginBottom: spacing[3],
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    borderRadius: 12,
    marginBottom: spacing[2],
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[3],
  },
  menuItemText: {
    ...typography.body,
    color: colors.gray[800],
  },
  menuItemChevron: {
    fontSize: 18,
    color: colors.gray[400],
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: spacing[4],
    paddingHorizontal: spacing[5],
  },
  versionText: {
    ...typography.caption,
    color: colors.gray[500],
  },
});