import * as Notifications from 'expo-notifications';

// Configure notifications behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const requestNotificationPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
};

export const scheduleFollowUpNotification = async (contact, followUpData) => {
  const trigger = new Date(followUpData.date);
  
  // Schedule notification for 9 AM on follow-up day
  trigger.setHours(9, 0, 0, 0);

  try {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: `${followUpData.type} Follow-up Reminder`,
        body: `Time to follow up with ${contact.name}! Priority: ${followUpData.priority}`,
        data: { contactId: contact.id, followUpData },
      },
      trigger,
    });
    return id;
  } catch (error) {
    console.error('Error scheduling notification:', error);
    return null;
  }
};

export const cancelNotification = async (notificationId) => {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  } catch (error) {
    console.error('Error canceling notification:', error);
  }
};