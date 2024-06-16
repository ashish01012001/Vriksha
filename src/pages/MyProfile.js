import React, { useContext, useState } from "react";
import axios from "axios";
import UserInfo from "../store/user-info";
import { FileUpload } from "primereact/fileupload";
import { ProgressSpinner } from "primereact/progressspinner";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./ProfilePage.css";
import { json, redirect, useLoaderData, useNavigate } from "react-router-dom";


const MyProfile = () => {
  const userCtx = useContext(UserInfo);
  const userData = useLoaderData();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  console.log(userCtx.profileImg);

  const onUpload = async (event) => {
    setIsLoading(true);
    const file = event.files[0];
    const formData = new FormData();
    formData.append("my_file", file);
    const response = await fetch(
      "https://vriksha-server-n9vt.vercel.app/user/upload",
      {
        method: "post",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const result = await response.json();
    // console.log(result);
    // console.log(result.imageResource);
    if (result.status) {
      navigate("/");
      userCtx.changeImg(result.imageResource);
      localStorage.removeItem("imageUrl");
      localStorage.setItem("imageUrl", result.imageResource);
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <div className="card flex justify-content-center">
          <ProgressSpinner />
        </div>
      )}

      <div className="profile-container">
        <div className="profile-card">
          <img
            src={userCtx.profileImg}
            alt="Profile"
            className="profile-picture"
          />
          <h1 className="profile-name">{userData.userName}</h1>
          <div className="profile-details">
            <p>
              <strong>Email:</strong> {userData.userEmailId}
            </p>
          </div>
          <div className="card flex justify-content-center">
            <FileUpload
              mode="basic"
              accept="image/jpeg"
              maxFileSize={2000000}
              customUpload
              uploadHandler={onUpload}
              auto
              chooseLabel="Browse"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;

export async function profileLoader({ request, params }) {
  if (localStorage.getItem("isLoggedIn") === null) return redirect("/login");
  const response = await axios.get(
    `https://vriksha-server-n9vt.vercel.app/user/getData`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if (response.status === 200) return json(response.data, { status: 200 });
  else throw json(response.message, { status: response.status });
}
