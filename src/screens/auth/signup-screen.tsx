import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Box, Pressable, Text } from '@ui-kit';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
} from 'react-native';
import { AuthButton } from '../../components/ui/auth-button';
import { AuthInput } from '../../components/ui/auth-input';
import { CurvedHeader } from '../../components/ui/curved-header';
import { SignupFormData, signupSchema } from '../../schemas/auth-schemas';
import { signupApi } from '../../services/auth';

type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

type SignupScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Signup'>;

export default function SignupScreen() {
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      await signupApi(data.name, data.email, data.phone, data.password);
      // Navigate to login after successful signup
      navigation.navigate('Login');
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1"
    >
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white">
        <Box className="flex-1">
          <CurvedHeader title="Sign Up" subtitle="Work Without Limits" />

          <Box className="w-[90%] self-center mt-[5%]">
            <AuthInput
              label="Full Name"
              name="name"
              control={control}
              errors={errors}
              placeholder="John Doe"
              autoCapitalize="words"
            />

            <AuthInput
              label="Phone Number"
              name="phone"
              control={control}
              errors={errors}
              placeholder="1234567890"
              keyboardType="phone-pad"
            />

            <AuthInput
              label="Email"
              name="email"
              control={control}
              errors={errors}
              placeholder="john@gmail.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <AuthInput
              label="Password"
              name="password"
              control={control}
              errors={errors}
              placeholder="Enter Password"
              secureTextEntry
              isPassword
            />

            <AuthButton
              title="Continue"
              onPress={handleSubmit(onSubmit)}
              isLoading={isLoading}
              className="mt-[20px]"
            />
          </Box>

          <Pressable
            onPress={() => navigation.navigate('Login')}
            className="w-full mb-[30px] mt-auto justify-center items-center flex-row py-[20px]"
          >
            <Text className="text-sm text-gray-600">Already have an account?</Text>
            <Text className="text-sm text-primary-500 font-bold"> Login</Text>
          </Pressable>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
