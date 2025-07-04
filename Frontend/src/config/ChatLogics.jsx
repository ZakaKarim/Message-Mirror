export const getSender = (loggedUser, users) => {
  if (!loggedUser || !users || users.length < 2) return "";
  // console.log("loggedUser:", loggedUser?._id);
  // console.log("users:", users?.map(u => ({id: u._id, name: u.name})));
  return users[1]?._id === loggedUser._id ? users[0].name : users[1].name;
};

export const getSenderFull = (loggedUser, users) => {
  // console.log("inside getSenderFull")
  // console.log("loggedUser ID:", loggedUser.user._id, "Type:", typeof loggedUser.user._id);
  // console.log("users:", users);

  if (!loggedUser || !users || users.length < 2) {
    console.log("Invalid parameters in getSenderFull");
    return null;
  }

  // Log each user ID for comparison
  users.forEach((user, index) => {
    //console.log(`User ${index} ID:`, user._id, "Type:", typeof user._id, "Match:", user._id === loggedUser.user._id);
  });

  // Find the user who is NOT the logged-in user
  // Convert both IDs to strings to ensure proper comparison
  const otherUser = users.find(
    (user) => String(user._id) !== String(loggedUser.user._id)
  );
  // console.log("otherUser found:", otherUser);

  return otherUser;
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameSenderMargin = (messages, m, i, userId) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
