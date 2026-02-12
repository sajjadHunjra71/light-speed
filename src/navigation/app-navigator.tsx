import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../components/ui/loading';
import { RootState } from '../store';
import { setAuthStatus, setLoading } from '../store/slices/auth-slice';
import { storage } from '../utils/storage';
import AuthNavigator from './auth-navigator';
import MainNavigator from './main-navigator';

export default function AppNavigator() {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await storage.get('authToken');
      if (token) {
        dispatch(setAuthStatus({ isAuthenticated: true, token }));
      } else {
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      dispatch(setLoading(false));
    }
  };

  if (isLoading) {
    return <Loading isLoading={true} />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
