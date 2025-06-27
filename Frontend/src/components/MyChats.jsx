import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import { getSender } from "../config/ChatLogics";
import GroupChatModal from "./miscellaneous/GroupChatModal";

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  // console.log("Logged User:", loggedUser);
  // console.log("Chats:", chats);
  // console.log("user",user)
  const toast = useToast();

  // const fetchChats = async () => {
  //   console.log("Fetching chats..."); 
  //   try {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     };
  //     console.log("Making API call...");
  //     const { data } = await axios.get(`/api/chat`, config);
  //     console.log("API Response:", data); // [3]
  //     console.log("Data:", data);
  //     setChats(data);
  //     console.log("setChats", setChats);
  //   } catch (error) {
  //     toast({
  //       title: "Error Occured",
  //       description: "Failed to Load the Chats...",
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "bottom-left",
  //     });
  //   }
  // };

  // useEffect(() => {
  //   setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
  //   fetchChats();
  // }, []);

  const fetchChats = async() => {
    console.log("1. Starting fetchChats");
    
    try {
      // Get token directly from localStorage
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo?.token; 
      console.log("userInfo",userInfo)
      console.log("token", token);
      
      
      if (!token) {
        console.log("No token found in localStorage");
        return;
      }
  
      console.log("2. Using token:", token);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      console.log("3. Making API call...");
      const { data } = await axios.get(`/api/chat`, config);
      console.log("4. API response:", data);
      
      setChats(data);
    } catch (error) {
      console.error("5. Fetch error:", error);
      toast({
        title: "Error Occurred",
        description: error.response?.data?.message || error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };


  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log("User from localStorage:", userInfo);
    
    setLoggedUser(userInfo?.user); // Set the user object, not the whole response
    
    // Use token from localStorage instead of context
    if (userInfo?.token) {
      console.log("Token exists, fetching chats...");
      fetchChats(userInfo.token); // Pass token directly
    } else {
      console.log("No token available");
    }
  }, []); // Remove user?.token dependency

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="4px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
        <Button
          display="flex"
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          rightIcon={<AddIcon />}
        >
          New Group Chat
        </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="91%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY={"scroll"}>
            {chats.map((chat) => {
              return (
                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                  color={selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                >
                  <Text>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                </Box>
              );
            })}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;

{
  /* {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )} */
}
