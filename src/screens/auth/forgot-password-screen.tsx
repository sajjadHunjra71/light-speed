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
import { ForgotPasswordFormData, forgotPasswordSchema } from '../../schemas/auth-schemas';
import { forgotPasswordApi } from '../../services/auth';

type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export default function ForgotPasswordScreen() {
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      await forgotPasswordApi(data.email);
      // Navigate back to login
      navigation.navigate('Login');
    } catch (error) {
      console.error('Forgot password failed:', error);
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
          <CurvedHeader title="Forgot Password?" subtitle="Work Without Limits" />

          <Box className="w-[90%] self-center mt-[10%]">
            <AuthInput
              label="Email"
              name="email"
              control={control}
              errors={errors}
              placeholder="john@gmail.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <AuthButton
              title="Continue"
              onPress={handleSubmit(onSubmit)}
              isLoading={isLoading}
              className="mt-[30px]"
            />
          </Box>

          <Pressable
            onPress={() => navigation.navigate('Signup')}
            className="w-full mb-[30px] mt-auto justify-center items-center flex-row py-[20px]"
          >
            <Text className="text-sm text-gray-600">Don't have an account?</Text>
            <Text className="text-sm text-primary-500 font-bold"> Sign Up</Text>
          </Pressable>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
