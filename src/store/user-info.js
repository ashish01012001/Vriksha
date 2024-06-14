import React from "react";

const UserInfo = React.createContext({
  isLoggedIn: false,
  profileImg: "",
  changeImg: () => {},
  changeLog: () => {},
});

export default UserInfo;
