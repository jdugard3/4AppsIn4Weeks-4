import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { AppProvider } from './src/contexts/AppContext';

export default function App() {
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const contactId = response.notification.request.content.data.contactId;
      if (contactId) {
        router.push({
          pathname: '/interactions',
          params: { contactId }
        });
      }
    });

    return () => subscription.remove();
  }, []);

  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <AppNavigator />
      </NavigationContainer>
    </AppProvider>
  );
}