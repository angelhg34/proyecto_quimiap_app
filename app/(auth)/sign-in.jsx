import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'

import { signIn } from '../../lib/appwrite'

const SignIn = () => {

  const [form, setForm] = useState({
    email:'',
    password:''
  }
  )

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () =>{
    if(!form.email || !form.password){
      Alert.alert('Error','Por favor complete todos los datos')
    }

    setIsSubmitting(true);

    try{  
      await signIn(form.email,form.password)

        
      router.replace('/home')
    }catch (error){
      Alert.alert('Error',error.message)
    }finally{
      setIsSubmitting(false)
    }
  }


  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Image 
          source={images.logo} 
          resizeMode="contain"
          className="w-[120px] h-[125px]"
          />

          <Text className="text-2xl text-black text-semibold  mt-1 font-semibold">Inicia Sesión</Text>
          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form,
              email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form,
              password: e})}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign in"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-black font-pregular" >
                No tienes cuenta?
              </Text>
              <Link href="/sign-up" className="text-lg font-pregular text-secondary-100">Sing up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
