
export class TonConnectBackendAuth {

  constructor() {
  }

  // Authenticate user with backend
  async authenticateWithBackend(token: string): Promise<void> {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      console.log('User authenticated successfully with backend.');
    } catch (error) {
      console.error('Error authenticating with backend:', error);
    }
  }
}