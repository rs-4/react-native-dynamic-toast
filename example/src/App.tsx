import { View, StyleSheet } from 'react-native';
import { NotificationProvider } from './lib/index';
import NotificationDemo from './NotificationDemo';

export default function App() {
  return (
    <NotificationProvider>
      <View style={styles.container}>
        <NotificationDemo />
      </View>
    </NotificationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
