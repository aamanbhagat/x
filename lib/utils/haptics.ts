import { Haptics, ImpactStyle } from '@capacitor/haptics';

/**
 * Haptic feedback utility functions
 * These work on mobile devices and gracefully fail on web
 */

export const hapticLight = async () => {
  try {
    await Haptics.impact({ style: ImpactStyle.Light });
  } catch (e) {
    // Haptics not available (web browser), silently ignore
  }
};

export const hapticMedium = async () => {
  try {
    await Haptics.impact({ style: ImpactStyle.Medium });
  } catch (e) {
    // Haptics not available (web browser), silently ignore
  }
};

export const hapticHeavy = async () => {
  try {
    await Haptics.impact({ style: ImpactStyle.Heavy });
  } catch (e) {
    // Haptics not available (web browser), silently ignore
  }
};

export const hapticSelection = async () => {
  try {
    await Haptics.selectionStart();
    setTimeout(async () => {
      await Haptics.selectionEnd();
    }, 100);
  } catch (e) {
    // Haptics not available (web browser), silently ignore
  }
};

export const hapticNotification = async (type: 'success' | 'warning' | 'error' = 'success') => {
  try {
    await Haptics.notification({ type: type === 'success' ? 'SUCCESS' : type === 'warning' ? 'WARNING' : 'ERROR' } as any);
  } catch (e) {
    // Haptics not available (web browser), silently ignore
  }
};
