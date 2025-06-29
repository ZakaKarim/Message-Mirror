export const getSender = (loggedUser, users)=>{
    if (!loggedUser || !users || users.length < 2) return "";
    console.log("loggedUser:", loggedUser?._id);
    console.log("users:", users?.map(u => ({id: u._id, name: u.name})));
    return users[1]?._id === loggedUser._id ? users[0].name : users[1].name;
}

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};