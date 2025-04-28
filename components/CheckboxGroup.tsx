import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing } from '@/constants/theme';
import { Check } from 'lucide-react-native';

interface CheckboxOption {
  label: string;
  value: string;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  selectedValues: string[];
  onValueChange: (values: string[]) => void;
}

export function CheckboxGroup({ options, selectedValues, onValueChange }: CheckboxGroupProps) {
  const toggleOption = (value: string) => {
    if (selectedValues.includes(value)) {
      onValueChange(selectedValues.filter(v => v !== value));
    } else {
      onValueChange([...selectedValues, value]);
    }
  };

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={styles.optionContainer}
          onPress={() => toggleOption(option.value)}
          activeOpacity={0.7}
        >
          <View 
            style={[
              styles.checkbox,
              selectedValues.includes(option.value) && styles.checkboxSelected
            ]}
          >
            {selectedValues.includes(option.value) && (
              <Check size={14} color={colors.white} />
            )}
          </View>
          <Text style={styles.checkboxLabel}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing[1],
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[3],
  },
  checkboxSelected: {
    backgroundColor: colors.primary[500],
  },
  checkboxLabel: {
    ...typography.body,
    color: colors.gray[800],
  },
});