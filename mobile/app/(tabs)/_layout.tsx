import { Redirect, Tabs } from "expo-router"
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from "@clerk/clerk-expo";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";

const TabsLayout = () => {

    const { isSignedIn, isLoaded } = useAuth();
    const insets = useSafeAreaInsets();
    

    if (!isLoaded) return null; // for better user experience
    if (!isSignedIn) return <Redirect href={"/(auth)"} />; // redirect to auth stack


    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#1DB194',
            tabBarInactiveTintColor: '#B3B3B3',
            tabBarStyle: {
                position: 'absolute',
                backgroundColor: 'transparent',
                borderTopWidth: 0,
                height: 30 + insets.bottom,
                paddingTop: 4,
                marginHorizontal: 100,
                marginBottom: 8 + insets.bottom,
                borderRadius: 25,
                overflow: 'hidden',
                elevation: 0,
            },
            tabBarBackground: () => (<BlurView
                intensity={80}
                tint="dark"
                style={StyleSheet.absoluteFill}
            />),
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: 600,
            },
        }}>
            <Tabs.Screen 
                name="index" 
                options={{ 
                    title: "Shop",
                    tabBarIcon: ({ color, size }) => <Ionicons name="grid" size={size} color={color} />
                }}
            />

            <Tabs.Screen 
                name="cart" 
                options={{ 
                    title: "Cart",
                    tabBarIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} />
                }}
            />

            <Tabs.Screen 
                name="profile" 
                options={{ 
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} /> 
                }}
            />
        </Tabs>
    )
}

export default TabsLayout