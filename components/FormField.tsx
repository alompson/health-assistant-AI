import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '@/constants/theme';

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  helperText?: string;
  error?: string;
}

export function FormField({ label, children, required = false, helperText, error }: FormFieldProps) {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        {required && <Text style={styles.required}>*</Text>}
      </View>
      
      {helperText && (
        <Text style={styles.helperText}>{helperText}</Text>
      )}
      
      <View style={styles.inputContainer}>
        {children}
      </View>
      
      {error && (
        <Text style={styles.error}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[5],
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  label: {
    ...typography.subtitle,
    color: colors.gray[800],
  },
  required: {
    ...typography.subtitle,
    color: colors.error[500],
    marginLeft: spacing[1],
  },
  helperText: {
    ...typography.caption,
    color: colors.gray[600],
    marginBottom: spacing[2],
  },
  inputContainer: {},
  error: {
    ...typography.caption,
    color: colors.error[500],
    marginTop: spacing[2],
  },
});