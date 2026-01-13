import "../global.css"
import { Stack } from "expo-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/clerk-expo";
// make authentication secure
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://ec4f5d0e2237a7ca11b0d3f69588ba77@o4510568352907264.ingest.de.sentry.io/4510696735899728',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

const queryClient = new QueryClient();

export default Sentry.wrap(function RootLayout() {
  return (
      <ClerkProvider tokenCache={tokenCache}>
          <QueryClientProvider client={queryClient}>
              <Stack screenOptions={{ headerShown: false }} />
          </QueryClientProvider>
      </ClerkProvider>
  )
});