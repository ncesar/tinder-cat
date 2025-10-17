import 'react-native-get-random-values';
import React from "react";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomeScreen from "./src/screens/HomeScreen";

// Criar uma instância do QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      retry: 1,
    },
  },
});

export default function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" backgroundColor="#F5F5F5" />
      <HomeScreen />
    </QueryClientProvider>
  );
}
