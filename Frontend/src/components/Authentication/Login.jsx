import React, { useState } from 'react'
import {  VStack,FormControl,FormLabel,Input, Button } from '@chakra-ui/react'

const Login = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    //Creating the functions
 
    //function run on submit the form 
    const submitHandler = ()=>{
        
    }

  return (
    <VStack spacing={'5px'}>
    <FormControl id='email' isRequired display='flex' justifyContent={'center'} alignItems={'center'} m={'4'}>
        <FormLabel>Email:</FormLabel>
        <Input
        placeholder='Enter your email' 
        onChange={(e)=>{
            setEmail(e.target.value)
        }}
        />
    </FormControl>
    <FormControl id='password' isRequired display='flex' justifyContent={'center'} alignItems={'center'} m={'4'}>
        <FormLabel>Password:</FormLabel>
        <Input
        type='password'
        placeholder='Enter your password' 
        onChange={(e)=>{
            setPassword(e.target.value)
        }}
        />
    </FormControl>
    <Button
    colorScheme='blue'
    width={'100%'}
    onClick={submitHandler}
    >
        Login
    </Button>
    <Button
    colorScheme='red'
    width={'100%'}
    onClick={()=>{
        setEmail('guest@example.com')
        setPassword('123456')
    }}
    >
        Get Guest User Credentials To Use The App
    </Button>
</VStack>
  )
}

export default Login
