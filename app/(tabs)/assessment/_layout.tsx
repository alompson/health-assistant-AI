import { Stack } from 'expo-router';
import { colors } from '@/constants/theme';

export default function AssessmentLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.white,
        },
        headerShadowVisible: false,
        headerTintColor: colors.gray[900],
        headerTitleStyle: {
          fontFamily: 'Inter-SemiBold',
        },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Wellness Assessment',
        }}
      />
      <Stack.Screen
        name="personal-info"
        options={{
          title: 'Personal Information',
        }}
      />
      <Stack.Screen
        name="fitness"
        options={{
          title: 'Fitness Profile',
        }}
      />
      <Stack.Screen
        name="nutrition"
        options={{
          title: 'Nutrition & Diet',
        }}
      />
      <Stack.Screen
        name="mental-health"
        options={{
          title: 'Mental Health',
        }}
      />
      <Stack.Screen
        name="sleep"
        options={{
          title: 'Sleep Habits',
        }}
      />
      <Stack.Screen
        name="lifestyle"
        options={{
          title: 'Lifestyle & Schedule',
        }}
      />
      <Stack.Screen
        name="medical"
        options={{
          title: 'Medical History',
        }}
      />
      <Stack.Screen
        name="additional-info"
        options={{
          title: 'Additional Information',
        }}
      />
      <Stack.Screen
        name="analyzing"
        options={{
          title: 'Analyzing Results',
          headerBackVisible: false,
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
}