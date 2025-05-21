// Re-exporter tout le contenu de l'exemple
export * from './library/index';
export { default as DynamicIslandNotification } from './library/DynamicIslandNotifications';
export { default as NotchNotification } from './library/NotchNotification';
export { default as ToastNotification } from './library/ToastNotification';

// Import explicite des composants et fonctions pour l'export par défaut
import { NotificationProvider, notif } from './library/index';

// Définir explicitement l'interface pour l'export par défaut
interface DefaultExport {
  Provider: typeof NotificationProvider;
  useNotification: typeof notif;
}

// Export par défaut avec typage explicite
const defaultExport: DefaultExport = {
  Provider: NotificationProvider,
  useNotification: notif,
};

export default defaultExport;
