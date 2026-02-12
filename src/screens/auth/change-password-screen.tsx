import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@ui-kit';
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
import { ChangePasswordFormData, changePasswordSchema } from '../../schemas/auth-schemas';
import { changePasswordApi } from '../../services/auth';

export default function ChangePasswordScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    setIsLoading(true);
    try {
      await changePasswordApi(data.oldPassword, data.newPassword);
      reset(); // Reset form on success
    } catch (error) {
      console.error('Change password failed:', error);
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
          <CurvedHeader title="Profile" subtitle="Change Your Password" />

          <Box className="w-[90%] self-center mt-[10%] pb-[30px]">
            <AuthInput
              label="Current Password"
              name="oldPassword"
              control={control}
              errors={errors}
              placeholder="*****************"
              secureTextEntry
              isPassword
            />

            <AuthInput
              label="New Password"
              name="newPassword"
              control={control}
              errors={errors}
              placeholder="*****************"
              secureTextEntry
              isPassword
            />

            <AuthInput
              label="Confirm Password"
              name="confirmPassword"
              control={control}
              errors={errors}
              placeholder="*****************"
              secureTextEntry
              isPassword
            />

            <AuthButton
              title="Continue"
              onPress={handleSubmit(onSubmit)}
              isLoading={isLoading}
              className="mt-[30px]"
            />
          </Box>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
