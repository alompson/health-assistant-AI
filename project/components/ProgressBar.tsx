import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '@/constants/theme';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = (current / total) * 100;
  
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.progressText}>
          Step {current} of {total}
        </Text>
        <Text style={styles.percentageText}>{Math.round(progress)}%</Text>
      </View>
      
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing[2],
  },
  progressText: {
    ...typography.caption,
    color: colors.gray[700],
  },
  percentageText: {
    ...typography.caption,
    color: colors.primary[600],
    fontFamily: 'Inter-Medium',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: colors.gray[200],
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary[500],
  },
});