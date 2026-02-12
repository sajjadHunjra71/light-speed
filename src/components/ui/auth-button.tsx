import { Button, ButtonText, Spinner } from '@ui-kit';
import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';

interface AuthButtonProps {
  onPress: () => void;
  title: string;
  isLoading?: boolean;
  style?: ViewStyle | string;
  textStyle?: TextStyle;
  disabled?: boolean;
  className?: string;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  onPress,
  title,
  isLoading = false,
  style,
  textStyle,
  disabled = false,
  className,
}) => {
  return (
    <Button
      onPress={onPress}
      disabled={disabled || isLoading}
      className={`w-full h-[50px] rounded-[20px] mt-[10px] bg-primary-500 ${(disabled || isLoading) ? 'opacity-70' : ''} ${className || ''}`}
      style={typeof style !== 'string' ? style : undefined}
    >
      {isLoading ? (
        <Spinner color="white" />
      ) : (
        <ButtonText className="text-white font-bold text-lg" style={textStyle}>
          {title}
        </ButtonText>
      )}
    </Button>
  );
};
