import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModel from "./miscellaneous/ProfileModel";
import ProfileModelForChat from "./miscellaneous/ProfileModelForChat";
import UpdateGroupChat from "./miscellaneous/UpdateGroupChat";
import axios from "axios";
import "./style.css"
import ScrollAbleChat from "./ScrollAbleChat";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const toast = useToast();
  //console.log("selectedChat", selectedChat, selectedChat._id);
  //console.log("selectedChat.users",selectedChat?.users)
  //console.log("user in single chat ", user);


  //function fetchMessage  to fetch all the message 
  const fetchMessage =async ()=>{
    if(!selectedChat) return;
    try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo?.token;
        //   console.log("userInfo", userInfo);
        //   console.log("token", token);

        if (!token) {
          console.log("No token found in localStorage");
          return;
        }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        setLoading(true);

        const { data } = await axios.get(`/api/message/${selectedChat._id}`, config);
        console.log("messages",messages);
        
        setMessages(data)
        setLoading(false)
    } catch (error) {
        toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  }
  
  //UseEffect to call this function inside it 
  useEffect(() => {
    fetchMessage();
  }, [selectedChat]);
  

  // sendMessage function
  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo?.token;
        //   console.log("userInfo", userInfo);
        //   console.log("token", token);

        if (!token) {
          console.log("No token found in localStorage");
          return;
        }
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          `/api/message`,
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        console.log("data is ", data);
        setMessages([...messages,data])
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  //typingHandler function
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat?.users)}
                <ProfileModelForChat
                  user={getSenderFull(user, selectedChat?.users)}
                />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChat
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessage={fetchMessage}
                />
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollAbleChat messages={messages} />
              </div>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              ></Input>
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          h={"100%"}
        >
          <Text fontSize={"3xl"} fontFamily={"Work Sans"} pb={"3"}>
            Click on a User to start a chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
