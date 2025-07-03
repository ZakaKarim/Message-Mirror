export const getSender = (loggedUser, users)=>{
    if (!loggedUser || !users || users.length < 2) return "";
    console.log("loggedUser:", loggedUser?._id);
    console.log("users:", users?.map(u => ({id: u._id, name: u.name})));
    return users[1]?._id === loggedUser._id ? users[0].name : users[1].name;
}

export const getSenderFull = (loggedUser, users) => {
  console.log("inside getSenderFull")
  console.log("loggedUser ID:", loggedUser.user._id, "Type:", typeof loggedUser.user._id);
  console.log("users:", users);
  
  if (!loggedUser || !users || users.length < 2) {
    console.log("Invalid parameters in getSenderFull");
    return null;
  }
  
  // Log each user ID for comparison
  users.forEach((user, index) => {
    console.log(`User ${index} ID:`, user._id, "Type:", typeof user._id, "Match:", user._id === loggedUser.user._id);
  });
  
  // Find the user who is NOT the logged-in user
  // Convert both IDs to strings to ensure proper comparison
  const otherUser = users.find(user => String(user._id) !== String(loggedUser.user._id));
  console.log("otherUser found:", otherUser);
  
  return otherUser;
};
