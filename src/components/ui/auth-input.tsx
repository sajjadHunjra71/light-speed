import {
  EyeIcon,
  EyeOffIcon,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Text,
  VStack
} from '@ui-kit';
import React, { useState } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { TextInputProps } from 'react-native';

interface AuthInputProps extends TextInputProps {
  label: string;
  name: string;
  control: Control<any>;
  errors?: FieldErrors<any>;
  secureTextEntry?: boolean;
  isPassword?: boolean;
  className?: string;
}

export const AuthInput: React.FC<AuthInputProps> = ({
  label,
  name,
  control,
  errors,
  secureTextEntry = false,
  isPassword = false,
  className,
  ...props
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };

  const hasError = !!errors?.[name];

  return (
    <VStack className={`w-full mb-[15px] mt-[10px] space-y-1 ${className || ''}`}>
      <Text className="text-base text-black">{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <VStack space-xs>
            <Input
              variant="underlined"
              size="md"
              isDisabled={false}
              isInvalid={hasError}
              isReadOnly={false}
              className="h-[50px] border-black "
            >
              <InputField
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={isSecure}
                placeholderTextColor="#666"
                className="flex-1 text-black"
                {...props}
              />
              {isPassword && (
                <InputSlot className="pr-3" onPress={toggleSecureEntry}>
                  <InputIcon as={isSecure ? EyeOffIcon : EyeIcon} className="text-[#900]" />
                </InputSlot>
              )}
            </Input>
            {hasError && (
              <Text className="text-red-500 text-xs ml-[5px] mt-[5px]">
                {errors[name]?.message as string}
              </Text>
            )}
          </VStack>
        )}
      />
    </VStack>
  );
};
