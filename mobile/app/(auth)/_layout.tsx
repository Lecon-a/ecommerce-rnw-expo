import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { View, Text } from "react-native";

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null; // for a better ux

  if (isSignedIn) {
    // return <Redirect href={"/"} />;
    return <View className="flex-1 justify-center items-center"><Text>Welcome to SPa ecommerce website</Text></View>;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}