// import React from "react";
// import ScrollableFeed from "react-scrollable-feed";
// import { isLastMessage, isSameSender } from "../config/ChatLogics";
// import { ChatState } from "../Context/ChatProvider";
// import { Avatar, Tooltip } from "@chakra-ui/react";

// const ScrollAbleChat = ({ messages }) => {
//   const { user } = ChatState();
//   console.log("user ", user);
  
//   // Handle case when user is undefined
//   if (!user || !user.user) {
//     console.log("User is undefined in ScrollableChat");
//     return <div>Loading messages...</div>;
//   }
  
//   console.log("user ", user.user._id);

//   return (
//     <ScrollableFeed>
//       {messages &&
//         messages.map((m, i) => {
//           return (
//             <div style={{ display: "flex" }} key={m._id}>
//               {(isSameSender(messages, m, i, user.user._id) ||
//                 isLastMessage(messages, i, user.user._id)) && (
//                 <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
//                   <Avatar
//                     mt="7px"
//                     mr={1}
//                     size="sm"
//                     cursor="pointer"
//                     name={m.sender.name}
//                     src={m.sender.pic}
//                   />
//                 </Tooltip>
//               )}
//               <span
//                 style={{
//                   backgroundColor: `${
//                     m.sender._id === user.user._id ? "#BEE3F8" : "#B9F5D0"
//                   }`,
//                   marginLeft: isSameSender(messages, m, i, user.user._id)
//                     ? 0
//                     : 33,
//                   marginTop: isSameSender(messages, m, i, user.user._id) ? 3 : 10,
//                   borderRadius: "20px",
//                   padding: "5px 15px",
//                   maxWidth: "75%",
//                 }}
//               >
//                 {m.content}
//               </span>
//             </div>
//           );
//         })}
//     </ScrollableFeed>
//   );
// };

// export default ScrollAbleChat;
import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender } from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import { Avatar, Tooltip } from "@chakra-ui/react";

const ScrollAbleChat = ({ messages }) => {
  const { user } = ChatState();
  console.log("user ", user);
  
  // Handle case when user is undefined
  if (!user || !user.user) {
    console.log("User is undefined in ScrollableChat");
    return <div>Loading messages...</div>;
  }
  
  console.log("user ", user.user._id);

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => {
          const isMyMessage = m.sender._id === user.user._id;
          
          return (
            <div 
              style={{ 
                display: "flex", 
                justifyContent: isMyMessage ? "flex-end" : "flex-start",
                marginBottom: "10px",
                width: "100%"
              }} 
              key={m._id}
            >
              {/* Show avatar only for other users' messages and only when needed */}
              {!isMyMessage && (isSameSender(messages, m, i, user.user._id) ||
                isLastMessage(messages, i, user.user._id)) && (
                <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name}
                    src={m.sender.pic}
                  />
                </Tooltip>
              )}
              
              {/* Add spacer for other users' messages when no avatar is shown */}
              {!isMyMessage && !(isSameSender(messages, m, i, user.user._id) ||
                isLastMessage(messages, i, user.user._id)) && (
                <div style={{ width: "40px" }} />
              )}
              
              <span
                style={{
                  backgroundColor: isMyMessage ? "#BEE3F8" : "#B9F5D0",
                  borderRadius: "20px",
                  padding: "8px 15px",
                  maxWidth: "70%",
                  wordWrap: "break-word",
                  marginTop: "3px",
                  display: "inline-block"
                }}
              >
                {m.content}
              </span>
            </div>
          );
        })}
    </ScrollableFeed>
  );
};

export default ScrollAbleChat;