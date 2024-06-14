import React, { useContext, useEffect } from "react";
import { Menubar } from "primereact/menubar";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { NavLink } from "react-router-dom";
import UserInfo from "../store/user-info";
export default function TemplateDemo() {
  const userCtx = useContext(UserInfo);
  const itemRenderer = (item) => (
    <NavLink to={item.link} className="flex align-items-center p-menuitem-link">
      {item.visible && <span className={item.icon} />}
      {item.visible && <span className="mx-2">{item.label}</span>}
    </NavLink>
  );
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) userCtx.changeLog(true);
    userCtx.changeImg(localStorage.getItem("imageUrl"));
  }, [userCtx]);

  const isLoggedIn = userCtx.isLoggedIn;

  const handleChange = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("imageUrl");
    userCtx.changeLog(false);
  };

  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      link: "/",
      template: itemRenderer,
      visible: isLoggedIn,
    },
    {
      label: "My Plants",
      icon: "pi pi-folder",
      link: "/myplants",
      template: itemRenderer,
      visible: isLoggedIn,
    },

    {
      label: "newID",
      icon: "pi pi-plus",
      link: "/newID",
      template: itemRenderer,
      visible: isLoggedIn,
    },
    {
      label: "LogIn",
      icon: "pi pi-sign-in",
      link: "/login",
      template: itemRenderer,
      visible: !isLoggedIn,
    },
    {
      label: "SignUp",
      icon: "pi pi-user-plus",
      link: "/signup",
      template: itemRenderer,
      visible: !isLoggedIn,
    },
    {
      label: "My Profile",
      icon: "pi pi-user",
      link: "/myprofile",
      template: itemRenderer,
      visible: isLoggedIn,
    },
  ];

  const start = (
    <img
      alt="Vriksha"
      src="https://dynamic.design.com/preview/logodraft/e9be3a7b-9220-47a5-af6f-94ea76fd0968/image/large.png"
      height="60"
      className="mr-2"
      loading="lazy"
    />
  );
  const end = (
    <div className="flex align-items-center gap-2">
      {isLoggedIn && <Avatar image={userCtx.profileImg} shape="circle" />}
      {isLoggedIn && <Button label="LogOut" onClick={handleChange} />}
    </div>
  );

  return (
    <div className="card">
      <Menubar model={items} start={start} end={end} />
    </div>
  );
}
