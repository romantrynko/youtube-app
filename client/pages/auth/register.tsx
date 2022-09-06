import React from 'react'
import { useForm } from '@mantine/form'
import { useMutation } from 'react-query'
import { registerUser } from '../../api'
import { AxiosError } from 'axios'
import Head from 'next/head'
import { Button, Container, Paper, PasswordInput, Stack, TextInput, Title } from '@mantine/core'
import { showNotification, updateNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'

const RegisterPage = () => {

  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    }
  })

  const mutation = useMutation<
    string,
    AxiosError,
    Parameters<typeof registerUser>['0']
  >(registerUser, {
    onMutate: () => {
      showNotification({
        id: 'register',
        title: 'Creating account',
        message: "Please wait",
        loading: true
      })
    },
    onSuccess: () => {
      updateNotification({
        id: 'register',
        title: 'Success',
        message: "Succesfully created account",
      });

      router.push("/auth/login")
    },
    onError: () => {
      showNotification({
        id: 'register',
        title: 'Error',
        message: "Could't create account",
      })
    }
  })

  return (
    <>
      <Head>
        <title>Register User</title>
      </Head>
      <Container>
        <Title>
          Register
        </Title>

        <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
          <form
            onSubmit={form.onSubmit(
              (values) =>
                mutation.mutate(values)
            )}
          >
            <Stack>
              <TextInput
                label="Email"
                placeholder='roman@gmail.com'
                required
                {...form.getInputProps("email")}
              />
              <TextInput
                label="Username"
                placeholder='Roman Trynko'
                required
                {...form.getInputProps("username")}
              />
              <PasswordInput
                label="Password"
                placeholder='Your password'
                required
                {...form.getInputProps("password")}
              />
              <PasswordInput
                label="confirm password"
                placeholder='Repeat your password'
                required
                {...form.getInputProps("confirmPassword")}
              />
              <Button type='submit'>Register</Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  )
}

export default RegisterPage