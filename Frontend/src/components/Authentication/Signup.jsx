import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import  axios  from "axios"

// import { FormControl } from '@chakra-ui/react'
import React, { useState } from "react";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  //Creating the functions
  // function for handling the profile picture
  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png" ||  pics.type === "image/jfif") {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "chat-app");
        data.append("cloud_name", "dendffnht");
        fetch("https://api.cloudinary.com/v1_1/dendffnht/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            setPic(data.url.toString());
            console.log(data.url.toString());
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      } else {
        toast({
          title: "Please Select an Image!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
      }
  };
  //function run on submit the form
  const submitHandler = async() => {};



  return (
    <VStack spacing={"5px"}>
      <FormControl
        id="first-name"
        isRequired
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        m={"4"}
      >
        <FormLabel>Name:</FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </FormControl>
      <FormControl
        id="email"
        isRequired
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        m={"4"}
      >
        <FormLabel>Email:</FormLabel>
        <Input
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>
      <FormControl
        id="password"
        isRequired
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        m={"4"}
      >
        <FormLabel>Password:</FormLabel>
        <Input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </FormControl>
      <FormControl
        id="password"
        isRequired
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        m={"4"}
      >
        <FormLabel>Confirm Password:</FormLabel>
        <Input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
      </FormControl>
      <FormControl
        id="pic"
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        m={"4"}
      >
        <FormLabel>Upload your Picture:</FormLabel>
        <Input
          type="file"
          accept="image/*"
          p="1.5"
          onChange={(e) => {
            postDetails(e.target.files[0]);
          }}
        />
      </FormControl>
      <Button colorScheme="blue" width={"100%"} onClick={submitHandler} isLoading={loading}>
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
