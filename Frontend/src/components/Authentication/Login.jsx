import React, { useState } from 'react'
import { VStack, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import { useToast } from "@chakra-ui/react";
import axios from "axios"
import { useHistory } from "react-router";

const Login = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();

    //Creating the functions

    //function run on submit the form 
    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/user/login",
                { email, password },
                config
            );
            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            history.push("/chats");
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
              setLoading(false);
        }
    }

    return (
        <VStack spacing={'5px'}>
            <FormControl id='email' isRequired display='flex' justifyContent={'center'} alignItems={'center'} m={'4'}>
                <FormLabel>Email:</FormLabel>
                <Input
                    value={email}
                    placeholder='Enter your email'
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />
            </FormControl>
            <FormControl id='password' isRequired display='flex' justifyContent={'center'} alignItems={'center'} m={'4'}>
                <FormLabel>Password:</FormLabel>
                <Input
                    value={password}
                    type='password'
                    placeholder='Enter your password'
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
            </FormControl>
            <Button
                colorScheme='blue'
                width={'100%'}
                onClick={submitHandler}
                isLoading={loading}
            >
                Login
            </Button>
            <Button
                colorScheme='red'
                width={'100%'}
                onClick={() => {
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
