import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';
import { COLORS } from '../../constants/theme';

interface LoadingProps {
  isLoading: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <Modal transparent animationType="fade" visible={isLoading}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
