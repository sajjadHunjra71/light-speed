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
import { useDispatch } from 'react-redux';

import { AuthButton } from '../../components/ui/auth-button';
import { AuthInput } from '../../components/ui/auth-input';
import { CurvedHeader } from '../../components/ui/curved-header';
import { LoginFormData, loginSchema } from '../../schemas/auth-schemas';
import { loginApi } from '../../services/auth';
import { loginSuccess } from '../../store/slices/auth-slice';

type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await loginApi(data.email, data.password);
      dispatch(loginSuccess({ user: response.user, token: response.access_token }));
    } catch (error) {
      console.error('Login failed:', error);
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
          <CurvedHeader title="Login" subtitle="Work Without Limits" />

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

            <AuthInput
              label="Password"
              name="password"
              control={control}
              errors={errors}
              placeholder="Enter Password"
              secureTextEntry
              isPassword
            />

            <Pressable
              onPress={() => navigation.navigate('ForgotPassword')}
              className="w-full mt-[5px] items-end"
            >
              <Text className="text-primary-500 text-sm">Forgot Password?</Text>
            </Pressable>

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
