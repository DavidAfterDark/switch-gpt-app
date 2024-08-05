import React, { useState } from 'react'
import { StyleSheet, KeyboardAvoidingView, Platform, useColorScheme, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { ThemedText, ThemedView } from '@/components/theme'
import { Colors } from '@/constants/Colors'
import { EMAIL_REGEX } from '@/constants/regex'
import { Controller, useForm } from 'react-hook-form'

//  components
import LoadingSpinner from '@/components/LoadingSpinner'

export interface LoginInterface {
  email: string
  password: string
}

export default function Login() {
  const { type } = useLocalSearchParams<{ type: string }>()

  const { control, handleSubmit } = useForm<LoginInterface>()

  const colorScheme = useColorScheme()

  const [loading, setLoading] = useState<boolean>(false)

  const [focus, setFocus] = useState({ email: false, password: false })

  const onFocus = (type: 'email' | 'password') => {
    if (type === 'email') {
      setFocus({ ...focus, email: true })
    }

    if (type === 'password') {
      setFocus({ ...focus, password: true })
    }
  }

  const onBlur = (type: 'email' | 'password') => {
    if (type === 'email') {
      setFocus({ ...focus, email: false })
    }

    if (type === 'password') {
      setFocus({ ...focus, password: false })
    }
  }

  const onSubmit = (data: LoginInterface) => {
    console.log(data)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={1}>
        <ThemedView style={styles.content}>
          <ThemedText type='title' style={styles.title}>{type === 'login' ? 'Welcome back' : 'Create your account'}</ThemedText>

          <ThemedView style={styles.inputsContainer}>
            <Controller
              control={control}
              name='email'
              rules={{
                required: {
                  value: true,
                  message: 'inputs_error_message_required'
                },
                pattern: {
                  value: EMAIL_REGEX,
                  message: 'inputs_email_error_message'
                }
              }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <TextInput
                    autoCapitalize='none'
                    placeholder='email@email.com'
                    value={value}
                    onChangeText={onChange}
                    placeholderTextColor={Colors.dark.textColor200}
                    style={[
                      styles.input,
                      {
                        color: colorScheme === 'dark' ? Colors.dark.textColor100 : Colors.light.textColor100,
                        borderColor: Colors.dark.textColor200
                      },
                      focus.email && { borderColor: colorScheme === 'dark' ? Colors.dark.textColor100 : Colors.black },
                      Boolean(error?.message) && { borderColor: Colors.dark.backgroundSuperAltColor100 }
                    ]}
                    onFocus={() => { onFocus('email') }}
                    onBlur={() => { onBlur('email') }}
                  />
                  {Boolean(error?.message) && <ThemedText style={styles.error}>*{error?.message}</ThemedText>}
                </>
              )}
            />

            <Controller
              control={control}
              name='password'
              rules={{
                required: {
                  value: true,
                  message: 'inputs_error_message_required'
                }
              }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <TextInput
                    placeholder='password'
                    secureTextEntry
                    value={value}
                    onChangeText={onChange}
                    placeholderTextColor={Colors.dark.textColor200}
                    style={[
                      styles.input,
                      {
                        color: colorScheme === 'dark' ? Colors.dark.textColor100 : Colors.light.textColor100,
                        borderColor: Colors.dark.textColor200
                      },
                      focus.password && { borderColor: colorScheme === 'dark' ? Colors.dark.textColor100 : Colors.black },
                      Boolean(error?.message) && { borderColor: Colors.dark.backgroundSuperAltColor100 }
                    ]}
                    onFocus={() => { onFocus('password') }}
                    onBlur={() => { onBlur('password') }}
                  />
                  {Boolean(error?.message) && <ThemedText style={styles.error}>*{error?.message}</ThemedText>}
                </>
              )}
            />
          </ThemedView>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colorScheme === 'dark' ? Colors.light.backgroundColor200 : Colors.dark.backgroundColor200 }]}
            onPress={handleSubmit(onSubmit)}
          >
            <ThemedText style={styles.buttonText} lightColor={Colors.dark.textColor100} darkColor={Colors.light.textColor200}>{type === 'login' ? 'Login' : 'Create account'}</ThemedText>
          </TouchableOpacity>

        </ThemedView>
        {loading && <LoadingSpinner />}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    textAlign: 'center',
    marginBottom: 30
  },
  inputsContainer: {
    marginBottom: 30
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    padding: 10
  },
  inputFocus: {
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2
  },
  error: {
    color: Colors.dark.backgroundSuperAltColor100,
    marginBottom: 10
  },
  button: {
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    gap: 10,
    width: '100%'
  },
  buttonText: {
    fontSize: 18
  }
})
