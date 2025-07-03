import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModel from "./miscellaneous/ProfileModel";
import ProfileModelForChat from "./miscellaneous/ProfileModelForChat";
import UpdateGroupChat from "./miscellaneous/UpdateGroupChat";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  //console.log("selectedChat",selectedChat)
  //console.log("selectedChat.users",selectedChat?.users)
  //console.log("user in single chat ", user);
  // Debug: Check if selectedChat.users has the expected structure
//   if (selectedChat && !selectedChat.isGroupChat) {
//     console.log("=== DEBUGGING SINGLE CHAT ===");
//     console.log("Current user ID:", user?._id);
//     console.log("Users in chat:", selectedChat.users?.map(u => ({ id: u._id, name: u.name })));
//     const otherUser = getSenderFull(user, selectedChat?.users);
//     console.log("Other user from getSenderFull:", otherUser);
//     console.log("==============================");
//   }
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
