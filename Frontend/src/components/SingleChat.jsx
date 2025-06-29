import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, IconButton, Text } from '@chakra-ui/react';
import  { ArrowBackIcon } from '@chakra-ui/icons'
import { getSender, getSenderFull } from '../config/ChatLogics';
import ProfileModel from './miscellaneous/ProfileModel';

const SingleChat = ({fetchAgain, setFetchAgain}) => {
    const { user, selectedChat, setSelectedChat, } = ChatState();
    console.log("selectedChat",selectedChat)
    console.log("selectedChat.users",selectedChat?.users)
    //console.log("user in single chat ", user)
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
            {!selectedChat.isGroupChat ?(
                <>{getSender(user,selectedChat?.users)}
                {/* <ProfileModel user={getSenderFull(user,selectedChat?.users)}/> */}
                </>
            ):(
                <>
                {selectedChat.chatName.toUpperCase()}
                </>
            )}
        </Text>
        </>
    ) : (
        <Box display={'flex'}  alignItems={'center'} justifyContent={'center'} h={'100%'} >
            <Text fontSize={'3xl'} fontFamily={"Work Sans"} pb={'3'}>Click on a User to start a chatting</Text>
        </Box>
    )}
    </>
  )
}

export default SingleChat