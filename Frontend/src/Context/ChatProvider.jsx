import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]); //if seeing error in  fetching the chat remove the array from here
  const [notification, setNotification] = useState([]);
  //console.log("Context state:", { user, chats });
  // console.log("user", user)
  // console.log("setUser",setUser)
  // Debug user state changes
//   console.log("ChatProvider - Current user state:", user);
//   console.log(
//     "ChatProvider - User from localStorage:",
//     JSON.parse(localStorage.getItem("userInfo") || "null")
//   );

  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) history.push("/");
  }, [history]);

  return (
    <ChatContext.Provider
      value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats,notification, setNotification }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
