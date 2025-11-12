type UserEventPayload = Record<string, unknown>;

const API_URL = 'https://api.ipocompass.evernile.com';

export const logUserEvent = async (
  eventType: string,
  payload: UserEventPayload = {}
): Promise<void> => {
  try {
    await fetch(`${API_URL}/api/log-user-event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eventType,
        payload,
        timestamp: new Date().toISOString()
      }),
      keepalive: true
    });
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('Failed to log user event', eventType, error);
    }
  }
};

