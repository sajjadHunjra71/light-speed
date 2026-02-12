import { Box, Text } from '@ui-kit';
import React from 'react';
import { useWindowDimensions } from 'react-native';

interface CurvedHeaderProps {
  title: string;
  subtitle?: string;
}

export const CurvedHeader: React.FC<CurvedHeaderProps> = ({ title, subtitle }) => {
  const { height } = useWindowDimensions();
  
  return (
    <Box 
      className="bg-primary-500 items-center justify-center rounded-bl-[145px] rounded-br-[145px]"
      style={{ height: height / 3 }}
    >
      <Box className="w-[90%] items-center justify-center self-center mb-[5px]">
        <Text className="text-white font-bold text-5xl text-center">
          {title}
        </Text>
      </Box>
      {subtitle && (
        <Box className="w-[90%] items-center justify-center self-center">
          <Text className="text-white text-xl text-center">
            {subtitle}
          </Text>
        </Box>
      )}
    </Box>
  );
};
