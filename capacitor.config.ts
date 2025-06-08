import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sonny.cardwatch',
  appName: 'CardWatch',
  webDir: 'dist/CardWatch/browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;
