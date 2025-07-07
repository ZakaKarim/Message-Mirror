import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModel from "./ProfileModel";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../userAvatar/UserListItem";
import { getSender } from "../../config/ChatLogics";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const history = useHistory();
  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  // Debugging: Log user data
  // useEffect(() => {
  //   console.log("Current user:", user);
  // }, []);
  // console.log("Current user:", user);

  // Function to logout the user
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };
  // Function handle search to find the user to chat with
  const handlSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter Something In Search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    try {
      setLoading(true);
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo?.token;
      //console.log("userInfo",userInfo)
      //console.log("token", token);

      if (!token) {
        console.log("No token found in localStorage");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type":"application/json",
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
      //console.log("setSearchResult",setSearchResult)
      //console.log("data", data);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  //function to access or create the chat
  const accessChat = async (userId) => {
    //console.log(userId);
    try {
      setLoadingChat(true);
      // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      // const token = userInfo?.token;
      // console.log("userInfo",userInfo)
      // console.log("token", token);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      // console.log("After Config")
      const { data } = await axios.post(`/api/chat`, { userId }, config);
      // console.log("Data:", data)
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error while Fetching the chats",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        display={"flex"}
        bg={"white"}
        justifyContent={"space-between"}
        alignItems={"center"}
        borderWidth={"8px"}
        w={"100%"}
        p={"10px 10px 5px 10px"} //top right bottom left
      >
        <Tooltip label="Search Users to Chat" hasArrow placement="bottom-end">
          <Button variant={"ghost"} onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px={"14px"} m={"14px"}>
              Serach User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize={"3xl"} fontFamily="Work sans">
          Message-Mirror
        </Text>
        <div>
          <Menu>
            <MenuButton p={"2px"}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize={"2xl"} m={2}></BellIcon>
            </MenuButton>
            <MenuList pl={5}>
              {!notification.length && "No New Message"}
              {notification.map((notify )=> (
                <MenuItem key={notify._id} onClick={()=>{
                  setSelectedChat(notify.chat)
                  setNotification(notification.filter((n)=> n !== notify ));
                }}>
                  {notify.chat.isGroupChat
                    ?`New Message in ${notify.chat.chatName}`
                    : `New Message from ${getSender(user.user,notify.chat.users)}`
                  }
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size={"sm"}
                cursor={"pointer"}
                name={user?.user.name}
                src={user?.user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModel user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModel>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={"2px"} fontFamily="Work sans">
            Search Users To Chat With
          </DrawerHeader>

          <DrawerBody>
            <Box display={"flex"} pb={"2"}>
              <Input
                placeholder="Search by email or name"
                mr={"2"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handlSearch}>Go</Button>
            </Box>
            {/* {loading ? <ChatLoading/> : 
           (
            searchResult?.map(user=>{
                <UserListItem
                key={user._id}
                user={user.user}
                handleFunction={()=>accessChat(user._id)}
                />
            })
           )
           } */}
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => {
                return (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                );
              })
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
