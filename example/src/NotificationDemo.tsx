import { useRef } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { notif } from './lib/index';

export default function NotificationDemo() {
  // Call the hook at the top level of the component
  const notification = notif();
  // Reference to store the manual close function
  const closeNotificationRef = useRef<() => void | null>(null);

  // Custom component for the custom notification with lots of content
  const CustomContent = () => (
    <View style={styles.customContent}>
      <Text style={styles.customTitle}>🚀 Custom Notification</Text>
      <Text style={styles.customText}>This is a fully custom component!</Text>
      <Text style={styles.customText}>With lots of content to demonstrate</Text>
      <Text style={styles.customText}>
        That the height is completely flexible
      </Text>
      <Text style={styles.customText}>
        And will adapt to any amount of content
      </Text>
      <Text style={styles.customText}>No matter how many lines there are</Text>
      <Text style={styles.customText}>It will expand as needed</Text>
      <Text style={styles.customText}>To fit all the content</Text>
      <Text style={styles.customText}>Without any maximum height limit</Text>
    </View>
  );

  // Show a notification with custom close control
  const showPersistentNotification = () => {
    notification.success('This notification will stay until manually closed', {
      disableAutoHide: true,
      textColor: '#4CAF50',
    });

    // Store the close function for later use
    setTimeout(() => {
      closeNotificationRef.current = notification.getCloseRef();
    }, 500); // Small delay to ensure the notification is fully mounted
  };

  // Manually close the notification
  const closeManually = () => {
    if (closeNotificationRef.current) {
      closeNotificationRef.current();
      closeNotificationRef.current = null;
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Show Success"
        onPress={() =>
          notification.success('Success', {
            textColor: 'green',
            shadowColor: 'green',
            borderColor: 'red',
            showShadow: true,
            autoHideDelay: 5000, // 5 seconds
          })
        }
      />

      <Button
        title="Show Error"
        onPress={() =>
          notification.failed('echec', {
            textColor: '#F44336',
            shadowColor: '#F44336',
            showShadow: true,
            autoHideDelay: 5000, // 5 seconds
          })
        }
      />

      <Button
        title="Show Toaster"
        onPress={() =>
          notification.toaster('ℹ️ Juste un message', {
            showShadow: false,
            autoHideDelay: 2000,
          })
        }
      />

      <Button
        title="Show Long Text"
        onPress={() =>
          notification.toaster(
            'This is a longer notification message that will test how the dynamic island handles content with flexible height. The height will adapt to the content.',
            {
              autoHideDelay: 4000, // 4 seconds
            }
          )
        }
      />

      <Button
        title="Show Very Long Text"
        onPress={() =>
          notification.toaster(
            'This is a very long notification message with multiple lines.\nIt demonstrates that the Dynamic Island can expand to fit any amount of content.\nNo matter how many lines of text are included.\nThe height will adapt automatically.\nWithout any maximum limit.\nSo you can display as much information as needed.',
            {
              autoHideDelay: 6000, // 6 seconds
              enableHaptics: true,
            }
          )
        }
      />

      <Button
        title="Show Custom Component"
        onPress={() =>
          notification.showCustom(<CustomContent />, {
            autoHideDelay: 8000, // 8 seconds
            enableHaptics: false,
          })
        }
      />

      <Button
        title="Show Persistent Notification"
        color="#9C27B0"
        onPress={showPersistentNotification}
      />

      <Button
        title="Close Persistent Notification"
        color="#673AB7"
        onPress={closeManually}
      />

      <Button
        title="Notch Persistent Notification"
        color="#FF9800"
        onPress={() =>
          notification.showCustom(
            <View style={{ padding: 10 }}>
              <Text
                style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}
              >
                Notch Notification
              </Text>
              <Text style={{ color: 'white' }}>
                This notification will stay until manually closed
              </Text>
            </View>,
            {
              disableAutoHide: true,
              forceStyle: 'notch',
            }
          )
        }
      />

      <Button
        title="Hide Any Notification"
        color="#FF5722"
        onPress={() => notification.hide()}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Force Notification Style</Text>
        <Button
          title="Force Dynamic Island"
          color="#3F51B5"
          onPress={() =>
            notification.success('Forced Dynamic Island Style', {
              forceStyle: 'dynamicIsland',
              showShadow: true,
              autoHideDelay: 3000,
            })
          }
        />

        <Button
          title="Force Notch"
          color="#009688"
          onPress={() =>
            notification.failed('Forced Notch Style', {
              forceStyle: 'notch',
              showShadow: true,
              autoHideDelay: 3000,
            })
          }
        />

        <Button
          title="Force Toast"
          color="#795548"
          onPress={() =>
            notification.toaster('Forced Toast Style', {
              forceStyle: 'toast',
              showShadow: true,
              autoHideDelay: 3000,
            })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  customContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 5,
  },
  customTitle: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  customText: {
    color: 'white',
    fontSize: 14,
    marginVertical: 2,
  },
  failedText: {},
  section: {
    marginTop: 20,
    width: '100%',
    gap: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
});
