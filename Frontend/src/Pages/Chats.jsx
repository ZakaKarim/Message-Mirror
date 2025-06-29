import React, { useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box } from '@chakra-ui/react'
import SideDrawer from '../components/miscellaneous/SideDrawer'
import MyChats from '../components/MyChats'
import ChatBox from '../components/ChatBox'

const Chats = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false)
  //console.log("in chats user",user)
  return (
    <div style={{width: "100%"}}>
      {user && <SideDrawer/>}
      <Box display='flex' justifyContent='space-between' width={"100%"} height={"91.5vh"} p={'10px'}>
        {user && <MyChats fetchAgain={fetchAgain}/>}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>} 
      </Box>

    </div>
  )
}

export default Chats