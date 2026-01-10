import useSocialAuth from "../../hooks/useSocialAuth"
import { View, Text, Image, TouchableOpacity, Alert, ActivityIndicator } from "react-native"

const AuthScreen = () => {

  const { loadingStrategy, handleSocialAuth } = useSocialAuth();

  return (
    <View className="flex-1 justify-center items-center bg-white gap-4 px-8">
      
      <Image
        source={require("../../assets/images/auth-image.png")}
        className="size-96"
        resizeMode="contain"
      />

      <View className="gap-2">
        {/* Google signin button */}
        <TouchableOpacity
          className="flex-row items-center justify-center border border-gray-300 rounded-full px-6 py-1"
          onPress={() => handleSocialAuth("oauth_google")}
          disabled={loadingStrategy !== null}
          // style={{ 
          //   shadowOffset: { width: 0, height: 1 },
          //   shadowOpacity: 0.1,
          //   elevation: 2, // this is for android shadow
          // }}
        >
          {
            loadingStrategy === "oauth_google" ? (
              <ActivityIndicator size={"small"} color={"#4285f4"} />
            ) : 
            (<View className="flex-row items-center justify-center gap-2">
              <Image
                source={require("../../assets/images/google.png")}
                className="size-10"
                resizeMode="contain"
              />
              <Text className="text-black font-medium text-base">Continue with Google</Text>
            </View>)
          }
        </TouchableOpacity>

        {/* Apple signin button */}
        <TouchableOpacity
          className="flex-row items-center justify-center border border-gray-300 rounded-full px-6 py-2"
          onPress={() => handleSocialAuth("oauth_apple")}
          disabled={loadingStrategy !== null}
          // style={{ 
          //   shadowOffset: { width: 0, height: 1 },
          //   shadowOpacity: 0.1,
          //   elevation: 2, // this is for android shadow
          // }}
        >
          {
            loadingStrategy === "oauth_apple" ? (
              <ActivityIndicator size={"small"} color={"#4285f4"} />
            ) : 
            (<View className="flex-row items-center justify-center gap-2">
              <Image
                source={require("../../assets/images/apple.png")}
                className="size-7"
                resizeMode="contain"
              />
              <Text className="text-black font-medium text-base">Continue with Apple</Text>
            </View>)
          }
        </TouchableOpacity>
      </View>
      
      <Text className="text-center text-gray-500 text-xs leading-4 px-4">
        By signing up, you agree to our <Text className="text-blue-500">Terms</Text>, <Text className="text-blue-500">Privacy Policy</Text>, and <Text className="text-blue-500">Cookie</Text> Use.
      </Text>

    </View>
  )
  
}

export default AuthScreen