import {
  Text,
  ScrollView, 
  View, 
  TouchableOpacity, 
  TextInput, 
  Image
} from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import SafeScreen from '@/components/SafeScreen'
import ProductsGrid from '@/components/ProductsGrid'
import useProducts from '@/hooks/useProducts'
import { useAuth } from '@clerk/clerk-expo'

const ShopScreen = () => {

    const { data: products, isLoading, isError } = useProducts();
    const { signOut } = useAuth();

    const handleSignOut = async () => {
      try {
        await signOut();
        // Optional: Redirect user or update UI state here
      } catch (err) {
        console.error('Error signing out:', err);
      }
    };
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [selectedCategory, setSelectedCategory] = useState<string>("All")

    const CATEGORIES = [
      { name: "All", icon: "grid-outline" as const },
      { name: "Electronics", image: require("@/assets/images/electronics.png") },
      { name: "Fashion", image: require("@/assets/images/fashion.png") },
      { name: "Sports", image: require("@/assets/images/sports.png") },
      { name: "Books", image: require("@/assets/images/books.png") },
    ];

    return (
      <SafeScreen>
        <ScrollView
          className='flex-1'
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER COMPONENT */}
          <View className='px-6 pb-4 pt-6'>

            <TouchableOpacity onPress={handleSignOut} >
              <Text className='text-text-primary'>Logout</Text>
            </TouchableOpacity>
            
            <View className='flex-row justify-between items-start mb-6'>
              <View>
                <Text className='text-text-primary text-3xl font-bold tracking-tight'>Shop</Text>
                <Text className='text-text-secondary text-sm mt-1'>Browse all products</Text>
              </View>

              <TouchableOpacity
                className='bg-surface/50 rounded-full p-3'
                onPress={() => { }}
                activeOpacity={0.7}
              >
                <Ionicons name="options-outline" size={22} color={"#fff"} />
              </TouchableOpacity>
            </View>

            {/* SEARCH BAR COMPONENT */}
            <View className='bg-surface flex-row items-center px-5 rounded-2xl'>
              <Ionicons name="search" size={22} color={"#666"} />
              <TextInput
                placeholder='Search products'
                placeholderTextColor={'#666'}
                className='flex-1 py-3 px-4 text-text-primary' 
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

          </View>

          {/* CATEGORIES COMPONENT */}
          <View className='mb-6'>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            {
                CATEGORIES?.map((category) => {
                  const isSelected = selectedCategory === category.name;
                  return <TouchableOpacity
                    key={category.name}
                    onPress={() => setSelectedCategory(category.name)}
                    className={`mr-3 size-20 rounded-2xl overflow-hidden items-center justify-center ${isSelected ? 'bg-primary' : 'bg-surface'}`}
                  >
                    {
                      category.icon ? <Ionicons name={category.icon} size={36} color={isSelected ? "#121212" : "#fff"} /> : <Image
                        source={category.image}
                        className='size-12' 
                        resizeMode='contain'
                      />
                    }
                  </TouchableOpacity>
                 })
            }
          </ScrollView>
          </View>

          <View className='px-6 mb-6 gap-2'>
            <View className='flex-row items-center justify-between'>
              <Text className='text-text-primary text-lg font-bold'>Products</Text>
              <Text className='text-text-secondary text-sm'>10 items</Text>
            </View>

            {/* PRODUCTS GRID */}
            <ProductsGrid />
          </View>

        </ScrollView>
      </SafeScreen>
    )
  }

export default ShopScreen